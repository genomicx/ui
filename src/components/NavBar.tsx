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
    <nav className="gx-nav">
      <div className="gx-nav-inner">
        <div className="gx-nav-row">
          <Link to="/" className="gx-nav-logo">
            <svg className="gx-nav-logo-icon" viewBox="0 0 24 24" fill="none" stroke="var(--gx-accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <div>
              <h1 className="gx-nav-logo-name">
                {appName}
                {version && <span className="gx-nav-logo-version">v{version}</span>}
              </h1>
              {appSubtitle && <p className="gx-nav-logo-sub">{appSubtitle}</p>}
            </div>
          </Link>

          <div className="gx-nav-desktop">
            {actions}
            <Link to="/about" className="gx-nav-link">About</Link>
            <a href="https://github.com/happykhan" target="_blank" rel="noopener noreferrer" className="gx-nav-link">
              GitHub
              <svg className="gx-nav-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <ThemeToggle />
          </div>

          <div className="gx-nav-mobile-toggle">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="gx-nav-hamburger" aria-label="Toggle menu">
              {menuOpen ? (
                <svg className="gx-nav-hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="gx-nav-hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="gx-nav-dropdown">
          {mobileActions}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="gx-nav-dropdown-link">About</Link>
          <a href="https://github.com/happykhan" target="_blank" rel="noopener noreferrer" className="gx-nav-dropdown-link">GitHub ↗</a>
        </div>
      )}
    </nav>
  );
}
