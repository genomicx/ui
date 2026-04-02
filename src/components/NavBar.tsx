import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export interface NavBarProps {
  appName: string;
  appSubtitle?: string;
  version?: string;
  /** Extra items in the desktop nav (right side, before theme toggle) */
  actions?: ReactNode;
  /** Extra items in the mobile dropdown */
  mobileActions?: ReactNode;
}

export function NavBar({ appName, appSubtitle, version, actions, mobileActions }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40" style={{ background: 'var(--gx-nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--gx-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--gx-accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--gx-text)' }}>
                {appName}{version && <span className="text-xs font-normal ml-1" style={{ color: 'var(--gx-text-muted)' }}>v{version}</span>}
              </h1>
              {appSubtitle && <p className="text-xs" style={{ color: 'var(--gx-text-muted)' }}>{appSubtitle}</p>}
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {actions}
            <Link to="/about" className="text-sm font-medium transition-colors" style={{ color: 'var(--gx-text-muted)' }}>
              About
            </Link>
            <a
              href="https://github.com/happykhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors inline-flex items-center gap-1"
              style={{ color: 'var(--gx-text-muted)' }}
            >
              GitHub
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded"
              style={{ color: 'var(--gx-text-muted)' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2" style={{ borderTop: '1px solid var(--gx-border)', background: 'var(--gx-nav-bg)' }}>
          {mobileActions}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-sm py-2 transition-colors" style={{ color: 'var(--gx-text-muted)' }}>
            About
          </Link>
          <a
            href="https://github.com/happykhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm py-2 transition-colors"
            style={{ color: 'var(--gx-text-muted)' }}
          >
            GitHub
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </nav>
  );
}
