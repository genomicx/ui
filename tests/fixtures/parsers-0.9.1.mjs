// Exact compiled parser functions from published @genomicx/ui 0.9.1 (GPL-3.0).
function $(n) {
  const a = n.split(/(?=^LOCUS\s)/m).filter((r) => r.trim().startsWith("LOCUS")), o = [];
  for (const r of a) {
    const l = r.match(/^LOCUS\s+(\S+)/m);
    if (!l) continue;
    const s = l[1], c = r.match(/ORIGIN([\s\S]*?)(\/\/|$)/);
    if (!c) continue;
    const i = c[1].replace(/[^a-zA-Z]/g, "").toUpperCase();
    i && o.push({ name: s, sequence: i });
  }
  return o;
}
function W(n) {
  const a = [];
  let o = "", r = [];
  for (const l of n.split(`
`)) {
    const s = l.trim();
    s.startsWith(">") ? (o && a.push({ name: o, sequence: r.join("") }), o = s.slice(1).split(/\s+/)[0], r = []) : s && o && r.push(s.toUpperCase());
  }
  return o && a.push({ name: o, sequence: r.join("") }), a;
}
async function T(n) {
  const a = new DecompressionStream("gzip"), o = a.writable.getWriter(), r = a.readable.getReader();
  o.write(n), o.close();
  const l = [];
  let s = !1;
  for (; !s; ) {
    const m = await r.read();
    s = m.done, m.value && l.push(m.value);
  }
  const c = l.reduce((m, d) => m + d.length, 0), i = new Uint8Array(c);
  let h = 0;
  for (const m of l)
    i.set(m, h), h += m.length;
  return new TextDecoder().decode(i);
}
const j = /* @__PURE__ */ new Set([".gb", ".gbk", ".genbank"]);
function D(n) {
  const a = n.endsWith(".gz") ? n.slice(0, -3) : n, o = a.slice(a.lastIndexOf(".")).toLowerCase();
  return j.has(o);
}
async function Y(n) {
  const a = n.name.endsWith(".gz");
  let o;
  if (a) {
    const r = await n.arrayBuffer();
    o = await T(r);
  } else
    o = await n.text();
  return D(n.name) ? $(o) : W(o);
}
export { $ as parseGenbankString, Y as parseSequenceFile };
