interface AppFooterProps {
  appName?: string;
  onReportBug?: () => void;
  bugReportUrl?: string;
}

export function AppFooter({ appName = 'GenomicX', onReportBug, bugReportUrl }: AppFooterProps) {
  return (
    <footer className="gx-footer">
      <div className="gx-footer-inner">
        <div className="gx-footer-content">
          <div className="gx-footer-text">
            <p className="gx-footer-text-title">{appName} — Powered by WebAssembly</p>
            <p className="gx-footer-text-sub">All processing runs locally in your browser — no data leaves your computer</p>
          </div>
          <div className="gx-footer-links">
            <a href="https://genomicx.org" target="_blank" rel="noopener noreferrer" className="gx-footer-link">
              genomicx.org
            </a>
            {bugReportUrl && (
              <a href={bugReportUrl} target="_blank" rel="noopener noreferrer" className="gx-footer-link">
                Report Bug
              </a>
            )}
            {onReportBug && !bugReportUrl && (
              <button onClick={onReportBug} className="gx-footer-link">
                Report Bug
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
