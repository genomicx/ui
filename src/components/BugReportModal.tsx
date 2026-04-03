interface BugReportModalProps {
  onClose: () => void;
  bugReportEmail: string;
  bugReportUrl?: string;
  bugReportItems?: string[];
}

const DEFAULT_ITEMS = [
  'A description of what happened and what you expected',
  'Your input files (if applicable)',
  'Browser name and version',
  'Steps to reproduce the issue',
];

export function BugReportModal({ onClose, bugReportEmail, bugReportUrl, bugReportItems }: BugReportModalProps) {
  const items = bugReportItems ?? DEFAULT_ITEMS;

  return (
    <div className="gx-modal-overlay" onClick={onClose}>
      <div className="gx-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gx-modal-header">
          <h3 className="gx-modal-title">Report a Bug</h3>
          <button className="gx-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="gx-modal-body">
          <p>To report a bug, please email the following to:</p>
          <p className="gx-modal-email">
            <a href={`mailto:${bugReportEmail}`}>{bugReportEmail}</a>
          </p>
          <div className="gx-modal-checklist">
            <p className="gx-modal-checklist-title">Please include:</p>
            <ol className="gx-modal-checklist-items">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
          {bugReportUrl && (
            <p className="gx-modal-github-hint">
              You can also open an issue on{' '}
              <a href={bugReportUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
