/** Parse a multi-record GenBank string into name/sequence pairs. */
export function parseGenbankString(text: string): { name: string; sequence: string }[] {
  const blocks = text.split(/(?=^LOCUS\s)/m).filter(block => block.trim().startsWith('LOCUS'));
  const records: { name: string; sequence: string }[] = [];
  for (const block of blocks) {
    const locus = block.match(/^LOCUS\s+(\S+)/m);
    if (!locus) continue;
    const name = locus[1];
    const origin = block.match(/ORIGIN([\s\S]*?)(\/\/|$)/);
    if (!origin) continue;
    const sequence = origin[1].replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (sequence) records.push({ name, sequence });
  }
  return records;
}

function parseFastaString(text: string): { name: string; sequence: string }[] {
  const records: { name: string; sequence: string }[] = [];
  let name = '';
  let lines: string[] = [];
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('>')) {
      if (name) records.push({ name, sequence: lines.join('') });
      name = trimmed.slice(1).split(/\s+/)[0];
      lines = [];
    } else if (trimmed && name) {
      lines.push(trimmed.toUpperCase());
    }
  }
  if (name) records.push({ name, sequence: lines.join('') });
  return records;
}

async function decompressGzip(buffer: ArrayBuffer): Promise<string> {
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  writer.write(buffer);
  writer.close();
  const chunks: Uint8Array[] = [];
  let done = false;
  while (!done) {
    const result = await reader.read();
    done = result.done;
    if (result.value) chunks.push(result.value);
  }
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(bytes);
}

const GENBANK_EXTENSIONS = new Set(['.gb', '.gbk', '.genbank']);

function isGenbankFile(name: string): boolean {
  const uncompressed = name.endsWith('.gz') ? name.slice(0, -3) : name;
  const extension = uncompressed.slice(uncompressed.lastIndexOf('.')).toLowerCase();
  return GENBANK_EXTENSIONS.has(extension);
}

/**
 * Parse a sequence File (FASTA or GenBank, optionally gzip-compressed)
 * into an array of { name, sequence } records.
 */
export async function parseSequenceFile(file: File): Promise<{ name: string; sequence: string }[]> {
  const compressed = file.name.endsWith('.gz');
  let text: string;
  if (compressed) {
    const buffer = await file.arrayBuffer();
    text = await decompressGzip(buffer);
  } else {
    text = await file.text();
  }
  return isGenbankFile(file.name) ? parseGenbankString(text) : parseFastaString(text);
}
