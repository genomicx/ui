import { jsxs as o, jsx as e } from "react/jsx-runtime";
import { useState as h, useRef as f } from "react";
import { Link as m } from "react-router-dom";
import u from "react-hot-toast";
function p({ disabled: t = !1 }) {
  const [r, a] = h(
    () => document.documentElement.getAttribute("data-theme") || "light"
  ), l = (n) => {
    a(n), document.documentElement.setAttribute("data-theme", n), localStorage.setItem("gx-theme", n);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: `flex items-center rounded-full border overflow-hidden text-xs font-medium ${t ? "opacity-40 pointer-events-none" : ""}`,
      style: { borderColor: "var(--gx-border)" },
      title: t ? "Theme switching disabled" : void 0,
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => !t && l("dark"),
            className: "px-3 py-1.5 transition-colors",
            style: r === "dark" ? { background: "var(--gx-accent)", color: "var(--gx-text-inverted)" } : { color: "var(--gx-text-muted)" },
            "aria-label": "Dark theme",
            disabled: t,
            children: /* @__PURE__ */ e("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("path", { d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" }) })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => !t && l("light"),
            className: "px-3 py-1.5 transition-colors",
            style: r === "light" ? { background: "var(--gx-accent)", color: "var(--gx-text-inverted)" } : { color: "var(--gx-text-muted)" },
            "aria-label": "Light theme",
            disabled: t,
            children: /* @__PURE__ */ e("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("path", { fillRule: "evenodd", d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z", clipRule: "evenodd" }) })
          }
        )
      ]
    }
  );
}
function b({ appName: t, appSubtitle: r, version: a, actions: l, mobileActions: n }) {
  const [s, c] = h(!1);
  return /* @__PURE__ */ o("nav", { className: "sticky top-0 z-40", style: { background: "var(--gx-nav-bg)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--gx-border)" }, children: [
    /* @__PURE__ */ e("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ o("div", { className: "flex items-center justify-between h-[60px]", children: [
      /* @__PURE__ */ o(m, { to: "/", className: "flex items-center gap-3 hover:opacity-90 transition-opacity", children: [
        /* @__PURE__ */ o("svg", { className: "w-7 h-7", viewBox: "0 0 24 24", fill: "none", stroke: "var(--gx-accent)", strokeWidth: "2", children: [
          /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "6" }),
          /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "2" })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ o("h1", { className: "text-lg font-bold", style: { color: "var(--gx-text)" }, children: [
            t,
            a && /* @__PURE__ */ o("span", { className: "text-xs font-normal ml-1", style: { color: "var(--gx-text-muted)" }, children: [
              "v",
              a
            ] })
          ] }),
          r && /* @__PURE__ */ e("p", { className: "text-xs", style: { color: "var(--gx-text-muted)" }, children: r })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "hidden md:flex items-center gap-6", children: [
        l,
        /* @__PURE__ */ e(m, { to: "/about", className: "text-sm font-medium transition-colors", style: { color: "var(--gx-text-muted)" }, children: "About" }),
        /* @__PURE__ */ o(
          "a",
          {
            href: "https://github.com/happykhan",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm font-medium transition-colors inline-flex items-center gap-1",
            style: { color: "var(--gx-text-muted)" },
            children: [
              "GitHub",
              /* @__PURE__ */ e("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
            ]
          }
        ),
        /* @__PURE__ */ e(p, {})
      ] }),
      /* @__PURE__ */ o("div", { className: "flex md:hidden items-center gap-3", children: [
        /* @__PURE__ */ e(p, {}),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => c(!s),
            className: "p-2 rounded",
            style: { color: "var(--gx-text-muted)" },
            "aria-label": "Toggle menu",
            children: s ? /* @__PURE__ */ e("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ e("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        )
      ] })
    ] }) }),
    s && /* @__PURE__ */ o("div", { className: "md:hidden px-4 pb-4 space-y-2", style: { borderTop: "1px solid var(--gx-border)", background: "var(--gx-nav-bg)" }, children: [
      n,
      /* @__PURE__ */ e(m, { to: "/about", onClick: () => c(!1), className: "block text-sm py-2 transition-colors", style: { color: "var(--gx-text-muted)" }, children: "About" }),
      /* @__PURE__ */ o(
        "a",
        {
          href: "https://github.com/happykhan",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 text-sm py-2 transition-colors",
          style: { color: "var(--gx-text-muted)" },
          children: [
            "GitHub",
            /* @__PURE__ */ e("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
          ]
        }
      )
    ] })
  ] });
}
function y({ appName: t = "GenomicX", onReportBug: r }) {
  return /* @__PURE__ */ e("footer", { className: "mt-auto py-6", style: { borderTop: "1px solid var(--gx-border)", background: "var(--gx-bg-alt)" }, children: /* @__PURE__ */ e("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ o("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
    /* @__PURE__ */ o("div", { className: "text-sm mb-4 md:mb-0", style: { color: "var(--gx-text-muted)" }, children: [
      /* @__PURE__ */ o("p", { className: "font-semibold", style: { color: "var(--gx-text)" }, children: [
        t,
        " — Powered by BLAST & WebAssembly"
      ] }),
      /* @__PURE__ */ e("p", { className: "mt-1", children: "All processing runs locally in your browser — no data leaves your computer" })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-6 text-sm", children: [
      /* @__PURE__ */ e("a", { href: "https://genomicx.org", target: "_blank", rel: "noopener noreferrer", className: "transition-colors hover:text-[var(--gx-accent)]", style: { color: "var(--gx-text-muted)" }, children: "genomicx.org" }),
      r && /* @__PURE__ */ e("button", { onClick: r, className: "transition-colors hover:text-[var(--gx-accent)]", style: { color: "var(--gx-text-muted)" }, children: "Report Bug" })
    ] })
  ] }) }) });
}
function C({ children: t, onReportBug: r, ...a }) {
  return /* @__PURE__ */ o("div", { className: "min-h-screen flex flex-col", style: { background: "var(--gx-bg)" }, children: [
    /* @__PURE__ */ e(b, { ...a }),
    /* @__PURE__ */ e("main", { className: "flex-1", children: t }),
    /* @__PURE__ */ e(y, { appName: a.appName, onReportBug: r })
  ] });
}
function j({ logs: t, progress: r, title: a = "Console" }) {
  const [l, n] = h(!0), s = f(null), c = () => {
    navigator.clipboard.writeText(t.join(`
`)).then(() => {
      u.success("Logs copied to clipboard!");
    }).catch(() => {
      u.error("Failed to copy logs");
    });
  }, i = r && r.step !== "idle" && r.step !== "Complete!";
  return /* @__PURE__ */ o("div", { className: "card mt-6", children: [
    i && /* @__PURE__ */ o("div", { className: "mb-4 pb-4", style: { borderBottom: "1px solid var(--gx-border)" }, children: [
      /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-medium", style: { color: "var(--gx-text)" }, children: r.step }),
        /* @__PURE__ */ o("span", { className: "text-sm", style: { color: "var(--gx-text-muted)" }, children: [
          r.percent,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "progress-bg", children: /* @__PURE__ */ e("div", { className: "progress-bar", style: { width: `${r.percent}%` } }) }),
      r.message && /* @__PURE__ */ e("div", { className: "mt-2 text-xs", style: { color: "var(--gx-text-muted)" }, children: r.message })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("button", { onClick: () => n(!l), style: { color: "var(--gx-text-muted)" }, children: l ? "▼" : "▶" }),
        /* @__PURE__ */ e("h3", { className: "font-semibold", style: { color: "var(--gx-text)" }, children: a }),
        /* @__PURE__ */ o("span", { className: "text-xs", style: { color: "var(--gx-text-muted)" }, children: [
          "(",
          t.length,
          " messages)"
        ] })
      ] }),
      /* @__PURE__ */ o("button", { onClick: c, className: "btn-secondary text-xs px-3 py-1", disabled: t.length === 0, children: [
        /* @__PURE__ */ e("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
        "Copy"
      ] })
    ] }),
    l && /* @__PURE__ */ e(
      "div",
      {
        ref: s,
        className: "font-mono text-xs p-4 rounded max-h-96 overflow-y-auto",
        style: { background: "var(--gx-code-bg)", color: "var(--gx-accent)", border: "1px solid var(--gx-border)" },
        children: t.length === 0 ? /* @__PURE__ */ e("div", { style: { color: "var(--gx-text-muted)" }, children: "No logs yet..." }) : t.map((d, g) => /* @__PURE__ */ e("div", { className: "mb-1 whitespace-pre-wrap break-all", children: d }, g))
      }
    )
  ] });
}
const k = "https://static.genomicx.org/wasm", x = /* @__PURE__ */ new Map();
async function N(t, r = k) {
  const a = `${r}/${t}`;
  if (x.has(a)) return x.get(a);
  const [l, n] = await Promise.all([
    fetch(`${r}/${t}.js`),
    fetch(`${r}/${t}.wasm`)
  ]);
  if (!l.ok) throw new Error(`Failed to fetch ${t}.js: ${l.status}`);
  if (!n.ok) throw new Error(`Failed to fetch ${t}.wasm: ${n.status}`);
  const [s, c] = await Promise.all([
    l.text(),
    n.arrayBuffer()
  ]), d = { factory: new Function("Module", s + "; return Module;")({}), wasmBinary: c };
  return x.set(a, d), d;
}
async function A(t, r) {
  const { factory: a, wasmBinary: l } = await N(t, r), n = [], s = [], c = await a({
    wasmBinary: l.slice(0),
    print: (i) => n.push(i),
    printErr: (i) => s.push(i),
    noInitialRun: !0
  });
  return c._stdout = n, c._stderr = s, c;
}
function v(t, r) {
  const a = URL.createObjectURL(t), l = document.createElement("a");
  l.href = a, l.download = r, l.click(), URL.revokeObjectURL(a);
}
function T(t, r, a = "text/plain") {
  v(new Blob([t], { type: a }), r);
}
function z(t, r) {
  v(new Blob([t]), r);
}
export {
  y as AppFooter,
  C as AppShell,
  j as LogConsole,
  b as NavBar,
  p as ThemeToggle,
  A as createModuleInstance,
  v as downloadBlob,
  z as downloadBuffer,
  T as downloadText,
  N as loadWasmModule
};
