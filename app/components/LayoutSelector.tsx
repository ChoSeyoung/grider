'use client';

import { useState, useEffect } from 'react';
import {
  Layout,
  PhotoCount,
  getColumnOptions,
  createLayout,
  getDefaultColumns,
} from '../utils/layouts';

interface LayoutSelectorProps {
  photoCount: PhotoCount;
  onConfirm: (layout: Layout) => void;
  onBack: () => void;
}

function LayoutPreview({ layout }: { layout: Layout }) {
  return (
    <div
      className="layout-preview"
      style={{
        gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
        gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
      }}
    >
      {Array.from({ length: layout.totalSlots }).map((_, i) => (
        <div key={i} className="layout-preview-cell" />
      ))}
    </div>
  );
}

export default function LayoutSelector({
  photoCount,
  onConfirm,
  onBack,
}: LayoutSelectorProps) {
  const columnOptions = getColumnOptions(photoCount);
  const [selectedCols, setSelectedCols] = useState(() => getDefaultColumns(photoCount));

  const currentLayout = createLayout(photoCount, selectedCols);

  useEffect(() => {
    setSelectedCols(getDefaultColumns(photoCount));
  }, [photoCount]);

  const handleConfirm = () => {
    onConfirm(currentLayout);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Choose Layout</h1>
        <p className="text-[var(--text-secondary)]">
          How many photos per row?
        </p>
      </div>

      {/* Column selector */}
      <div className="flex gap-3 flex-wrap justify-center">
        {columnOptions.map((cols) => {
          const rows = photoCount / cols;
          return (
            <button
              key={cols}
              className={`column-select-btn ${selectedCols === cols ? 'selected' : ''}`}
              onClick={() => setSelectedCols(cols)}
            >
              <span className="text-2xl font-bold">{cols}</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {cols} × {rows}
              </span>
            </button>
          );
        })}
      </div>

      {/* Layout preview */}
      <div className="layout-preview-large">
        <LayoutPreview layout={currentLayout} />
      </div>

      <p className="text-[var(--text-secondary)] text-sm">
        {currentLayout.cols} columns × {currentLayout.rows} rows
      </p>

      <div className="flex gap-4">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn-gradient" onClick={handleConfirm}>
          Continue
        </button>
      </div>
    </div>
  );
}
