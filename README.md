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

Import the CSS in your app's global stylesheet, **before** Tailwind:

```css
@import '@genomicx/ui/styles/tokens.css';
@import '@genomicx/ui/styles/components.css';
@import "tailwindcss";
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

Readable console for displaying WASM stderr/stdout.

```tsx
import { LogConsole } from '@genomicx/ui'

<LogConsole logs={logLines} />
<LogConsole
  logs={logLines}
  progress={{ step: 'Running analysis', percent: 50, message: 'Processing files' }}
  title="Debug Console"
/>
```

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `logs` | `string[]` | Log lines to display |
| `progress` | `ProgressUpdate` | Optional `{ step, percent, message? }` shown above the log |
| `title` | `string` | Console title (default: `"Console"`) |

---

### `ThemeToggle`

Dark/light theme switcher. Already included in `NavBar` — use standalone only if building a custom nav.

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
| `--gx-accent` | `#245db4` | `#90b7f0` | Actions and selections |
| `--gx-bg` | `#f5f6f7` | `#191c21` | Page background |
| `--gx-bg-alt` | `#ffffff` | `#23272e` | Panels |
| `--gx-text` | `#25282e` | `#e9ecf1` | Body text |
| `--gx-text-muted` | `#5d636d` | `#b0b7c2` | Secondary text |
| `--gx-border` | `#cbd0d7` | `#424953` | Borders |
| `--gx-nav-bg` | `#1c2027` | `#14171b` | Opaque navigation |
| `--gx-disabled-bg` | `#e4e7eb` | `#343b46` | Inactive buttons |
| `--gx-disabled-text` | `#505965` | `#e4e9f0` | Readable inactive labels |
| `--gx-gradient` | Accent colour | Accent colour | Existing token now resolves to a solid fill |
| `--gx-font-sans` | IBM Plex Sans | IBM Plex Sans | Interface text |
| `--gx-font-mono` | IBM Plex Mono | IBM Plex Mono | Console and technical values |

### Typography

Importing `tokens.css` loads the bundled IBM Plex fonts from this package. No Google Fonts link or external font service is required. The Latin WOFF2 files are licensed under the SIL Open Font License; their notices and source versions are included in `src/styles/fonts/`. Other scripts use the configured system fallbacks.

Console output uses IBM Plex Mono at 14px with a 1.65 line height, neutral text, preserved whitespace and wrapping for long lines. The console displays the supplied strings unchanged; timestamps and log levels remain the responsibility of the application.

### Updating from 0.9.x

```bash
npm install @genomicx/ui@^0.10.0
```

Remove old Inter and JetBrains Mono font imports from consuming applications. The existing component APIs, CSS import paths and theme attributes are unchanged. The new defaults use neutral surfaces, blue actions, a charcoal header, smaller corners and readable inactive button labels. Local application CSS can override shared rules, so check each app after updating; layouts and analysis logic remain owned by the application.

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

Requires publish access to `@genomicx/ui` and an authenticated npm session. Use `npm login` before publishing; npm may also require two-factor authentication.
