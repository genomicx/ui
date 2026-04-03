import { useCallback } from 'react';

export interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  label?: string;
  hint?: string;
  filterFn?: (file: File) => boolean;
}

export function FileUpload({
  files,
  onFilesChange,
  disabled = false,
  multiple = true,
  accept = '.fasta,.fa,.fna,.fsa,.fasta.gz,.fa.gz,.fna.gz',
  label = 'Drop files here or click to browse',
  hint,
  filterFn,
}: FileUploadProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      let picked = Array.from(e.target.files);
      if (filterFn) picked = picked.filter(filterFn);
      if (picked.length > 0) onFilesChange(picked);
    },
    [onFilesChange, filterFn],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!e.dataTransfer.files) return;
      let dropped = Array.from(e.dataTransfer.files);
      if (filterFn) dropped = dropped.filter(filterFn);
      if (dropped.length > 0) onFilesChange(dropped);
    },
    [onFilesChange, filterFn],
  );

  return (
    <div className="gx-file-upload" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <label className="gx-file-upload-area">
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
        />
        <svg
          className="gx-file-upload-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        {files.length === 0 ? (
          <>
            <div className="gx-file-upload-label">{label}</div>
            {hint && <div className="gx-file-upload-hint">{hint}</div>}
          </>
        ) : (
          <>
            <div className="gx-file-upload-label">{files.length} file{files.length !== 1 ? 's' : ''} selected</div>
            <ul className="gx-file-list">
              {files.map((f) => <li key={f.name}>{f.name}</li>)}
            </ul>
          </>
        )}
      </label>
    </div>
  );
}
