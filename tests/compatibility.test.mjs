import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { gzipSync } from 'node:zlib';
import * as current from '../dist/index.js';
import * as previous from './fixtures/parsers-0.9.1.mjs';
const genbank = 'LOCUS       first 12 bp\nORIGIN\n 1 acgt nn-- 123\n//\nLOCUS second\nORIGIN\n 1 tt aa\n//';
const fasta = 'ignored preamble\r\n>first description\r\n acgt \r\nnN-.\r\n>second\nTT aa\n>empty\n';
test('all published 0.9.1 runtime exports and parser declarations remain available', () => {
  assert.deepEqual(Object.keys(current).sort(), ['Alert', 'AppFooter', 'AppShell', 'BugReportModal', 'FileUpload', 'LogConsole', 'NavBar', 'ProgressBar', 'StatusBadge', 'ThemeToggle', 'createModuleInstance', 'downloadBlob', 'downloadBuffer', 'downloadText', 'loadWasmModule', 'parseGenbankString', 'parseSequenceFile'].sort());
  const declarations = readFileSync(new URL('../dist/index.d.ts', import.meta.url), 'utf8');
  assert.match(declarations, /export \{ parseGenbankString, parseSequenceFile \} from '.\/utils\/parseSequence'/);
  const parserTypes = readFileSync(new URL('../dist/utils/parseSequence.d.ts', import.meta.url), 'utf8');
  assert.match(parserTypes, /parseGenbankString\(text: string\)/);
  assert.match(parserTypes, /parseSequenceFile\(file: File\)/);
});
test('GenBank records and historical malformed-input handling match 0.9.1', () => {
  for (const text of [genbank, '', 'unrecognised', 'LOCUS noorigin\n//', 'LOCUS empty\nORIGIN\n123-\n//', 'LOCUS last\nORIGIN\n 1 acgt', '  LOCUS indented\nORIGIN\natgc\n//', 'preamble\n' + genbank, 'LOCUS x\nORIGIN\n1 aA zZ\n//\ntrailing']) {
    assert.deepEqual(current.parseGenbankString(text), previous.parseGenbankString(text));
  }
  assert.deepEqual(current.parseGenbankString(genbank), [{ name: 'first', sequence: 'ACGTNN' }, { name: 'second', sequence: 'TTAA' }]);
});
for (const [name, text] of [
  ['sample.fasta', fasta], ['sample.fa', '>\nACGT\n> id\nTT\n>real\nacgt'],
  ['sample.fna', '>x\n' + 'acgtn'.repeat(40000)], ['empty.fa', ''], ['plain.txt', genbank],
  ['sample.gb', genbank], ['sample.GBK', genbank], ['sample.genbank', genbank],
  ['sample.GENBANK.gz', genbank], ['sample.fa.gz', fasta], ['sample.gb.gz', genbank],
  ['sample.fa.GZ', fasta], ['sample.fa', '>é\nacgt'],
]) {
  test(`file parsing matches 0.9.1: ${name} (${text.length} characters)`, async () => {
    const file = new File([name.endsWith('.gz') ? gzipSync(text) : text], name);
    assert.deepEqual(await current.parseSequenceFile(file), await previous.parseSequenceFile(file));
  });
}
test('file-read failures preserve rejection messages', async () => {
  for (const name of ['error.fa', 'error.fa.gz']) {
    const file = { name, text: async () => { throw new Error('read failed'); }, arrayBuffer: async () => { throw new Error('read failed'); } };
    for (const parser of [current, previous]) await assert.rejects(parser.parseSequenceFile(file), { message: 'read failed' });
  }
});
test('invalid gzip preserves both rejection and historical writer errors', () => {
  // Isolate the legacy writer rejection so Node's test runner does not consume it.
  const outcomes = ['../dist/index.js', './fixtures/parsers-0.9.1.mjs'].map(path => {
    const url = new URL(path, import.meta.url).href;
    const script = `import { parseSequenceFile } from ${JSON.stringify(url)};
      const errors = [];
      process.on('unhandledRejection', error => errors.push(error.message));
      try { await parseSequenceFile(new File(['invalid gzip'], 'bad.fa.gz')); }
      catch (error) { errors.push(error.message); }
      setTimeout(() => console.log(JSON.stringify(errors.sort())), 20);`;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  });
  assert.ok(outcomes[0].length > 0);
  assert.deepEqual(outcomes[0], outcomes[1]);
});
