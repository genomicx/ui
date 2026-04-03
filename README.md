# @genomicx/ui

Shared UI components, design tokens, WASM loader, and utilities for [GenomicX](https://genomicx.org) browser-based bioinformatics tools.

## Install

```bash
npm install @genomicx/ui
```

Peer dependencies (install separately):

```bash
npm install react react-dom react-router-dom react-hot-toast
```

## Setup

Import the CSS in your app's global stylesheet, **after** your Tailwind directives:

```css
@import "tailwindcss";
@import '@genomicx/ui/styles/tokens.css';
@import '@genomicx/ui/styles/components.css';
```

Init the theme on load (prevents flash of wrong theme):

```tsx
useEffect(() => {
  const saved = (localStorage.getItem('gx-theme') as 'light' | 'dark') || 'dark'
  document.documentElement.setAttribute('data-theme', saved)
}, [])
```

## Components

### `NavBar`

Sticky top navigation with the GenomicX rings logo, theme toggle, and an About link.

```tsx
import { NavBar } from '@genomicx/ui'

<NavBar
  appName="MYAPP"
  appSubtitle="What it does"
  version="1.2.0"
/>
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appName` | `string` | — | App name shown in header (uppercase recommended) |
| `appSubtitle` | `string` | — | Subtitle shown below app name |
| `version` | `string` | — | Version shown as `v1.0.0` badge |
| `actions` | `ReactNode` | — | Extra items in the desktop nav (right side) |
| `mobileActions` | `ReactNode` | — | Extra items in the mobile dropdown |

Tool-specific nav buttons (e.g. Save/Load Session) go in `actions`:

```tsx
<NavBar
  appName="BRIGX"
  appSubtitle="Browser-based Ring Image Generator"
  version={APP_VERSION}
  actions={
    <>
      <button onClick={handleSave}>Save Session</button>
      <label>Load Session<input type="file" onChange={handleLoad} /></label>
    </>
  }
/>
```

---

### `AppFooter`

Standard footer with GenomicX branding and an optional bug report link.

```tsx
import { AppFooter } from '@genomicx/ui'

<AppFooter appName="MYAPP" />
<AppFooter appName="MYAPP" onReportBug={() => setShowBugReport(true)} />
```

---

### `LogConsole`

Collapsible debug console for displaying WASM stderr/stdout.

```tsx
import { LogConsole } from '@genomicx/ui'

<LogConsole logs={logLines} />
<LogConsole logs={logLines} progress="Running BLAST..." title="Debug Console" />
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `logs` | `string[]` | Log lines to display |
| `progress` | `string` | Optional current progress message shown at top |
| `title` | `string` | Console title (default: `"Console"`) |

---

### `ThemeToggle`

Pill-style dark/light theme switcher. Already included in `NavBar` — use standalone only if building a custom nav.

```tsx
import { ThemeToggle } from '@genomicx/ui'

<ThemeToggle />
```

---

### `AppShell`

Full-page layout wrapper (nav + main + footer).

```tsx
import { AppShell } from '@genomicx/ui'

<AppShell appName="MYAPP" appSubtitle="What it does" version="0.1.0">
  <YourContent />
</AppShell>
```

---

## WASM Loader

Canonical Emscripten loader for GenomicX WASM binaries hosted on `static.genomicx.org`.

```ts
import { createModuleInstance } from '@genomicx/ui'

// Loads mash.js + mash.wasm from static.genomicx.org/wasm/
const mod = await createModuleInstance('mash')

mod.FS.writeFile('/query.fa', fastaBytes)
mod.callMain(['dist', '/db.msh', '/query.fa'])
const output = mod._stdout.join('\n')
```

Available binaries: `mash`, `blastall`, `formatdb`

**Low-level API** (custom base URL or caching control):

```ts
import { loadWasmModule } from '@genomicx/ui'

const { factory, wasmBinary } = await loadWasmModule('blastall', 'https://my-cdn.example.com/wasm')
```

---

## Utilities

```ts
import { downloadBlob, downloadText, downloadBuffer } from '@genomicx/ui'

downloadText('results.tsv', tsvString)
downloadBuffer('output.fa', uint8Array, 'text/plain')
downloadBlob('report.json', new Blob([json], { type: 'application/json' }))
```

---

## Design Tokens

All tokens are CSS custom properties on `:root` / `[data-theme]`. Key tokens:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--gx-accent` | `#0d9488` | `#2dd4bf` | Primary accent (teal) |
| `--gx-bg` | `#f8fafc` | `#0d1117` | Page background |
| `--gx-bg-alt` | `#fff` | `#161b22` | Card/panel background |
| `--gx-text` | `#0f172a` | `#e6edf3` | Body text |
| `--gx-text-muted` | `#64748b` | `#8b949e` | Secondary text |
| `--gx-border` | `#e2e8f0` | `#30363d` | Borders |
| `--gx-gradient` | — | — | Accent gradient (button backgrounds) |
| `--gx-font-sans` | — | — | `Inter, system-ui, sans-serif` |
| `--gx-font-mono` | — | — | `JetBrains Mono, monospace` |

---

## Typical app scaffold

```
src/
  main.tsx          ← BrowserRouter + Toaster
  App.tsx           ← NavBar + Routes + AppFooter
  index.css         ← Tailwind + @genomicx/ui tokens + components
  lib/version.ts    ← export const APP_VERSION = '0.1.0'
  pages/About.tsx
  components/
  [tool]/
    pipeline.ts
    types.ts
    databases.ts
```

`index.css`:
```css
@import '@genomicx/ui/styles/tokens.css';
@import '@genomicx/ui/styles/components.css';
@import "tailwindcss";
```

`App.tsx`:
```tsx
import { NavBar, AppFooter, LogConsole } from '@genomicx/ui'
import { APP_VERSION } from './lib/version'

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('gx-theme') as 'light' | 'dark' || 'dark'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <div className="app">
      <NavBar appName="MYAPP" appSubtitle="What it does" version={APP_VERSION} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<AnalysisPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <AppFooter appName="MYAPP" />
    </div>
  )
}
```

---

## Tools using this package

| Tool | Repo |
|------|------|
| BRIGx | [happykhan/brigx](https://github.com/happykhan/brigx) |
| MashX | [genomicx/mashx](https://github.com/genomicx/mashx) |
| Genetrax | [genomicx/genetrax](https://github.com/genomicx/genetrax) |

---

## Development

```bash
git clone https://github.com/genomicx/ui
cd ui
npm install
npm run build        # compile to dist/
npm run dev          # watch mode
```

To test changes locally in a consuming app before publishing:

```bash
# In this repo
npm link

# In the consuming app
npm link @genomicx/ui
```

## Publishing

```bash
npm run build
npm publish --access public
```

Requires membership in the `@genomicx` npm org and an Automation token in `~/.npmrc`.
