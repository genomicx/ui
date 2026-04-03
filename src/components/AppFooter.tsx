import { useState } from 'react';
import { BugReportModal } from './BugReportModal';

interface AppFooterProps {
  appName?: string;
  bugReportEmail?: string;
  bugReportUrl?: string;
  /** @deprecated Use bugReportEmail instead */
  onReportBug?: () => void;
  bugReportItems?: string[];
}

export function AppFooter({ appName = 'GenomicX', bugReportEmail, bugReportUrl, onReportBug, bugReportItems }: AppFooterProps) {
  const [showModal, setShowModal] = useState(false);

  function handleReportBug() {
    if (bugReportEmail) {
      setShowModal(true);
    } else if (onReportBug) {
      onReportBug();
    }
  }

  return (
    <>
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
              {(bugReportEmail || bugReportUrl || onReportBug) && (
                <button onClick={handleReportBug} className="gx-footer-link">
                  Report Bug
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
      {showModal && bugReportEmail && (
        <BugReportModal
          onClose={() => setShowModal(false)}
          bugReportEmail={bugReportEmail}
          bugReportUrl={bugReportUrl}
          bugReportItems={bugReportItems}
        />
      )}
    </>
  );
}
