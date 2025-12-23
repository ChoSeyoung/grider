export interface Layout {
  id: string;
  name: string;
  rows: number;
  cols: number;
  totalSlots: number;
}

// Get available column options for a given photo count
// Returns divisors of the count (valid column numbers)
export function getColumnOptions(photoCount: number): number[] {
  const options: number[] = [];
  for (let i = 1; i <= photoCount; i++) {
    if (photoCount % i === 0) {
      options.push(i);
    }
  }
  return options;
}

// Create a layout from photo count and column selection
export function createLayout(photoCount: number, cols: number): Layout {
  const rows = photoCount / cols;
  return {
    id: `${cols}x${rows}`,
    name: `${cols} x ${rows}`,
    rows,
    cols,
    totalSlots: photoCount,
  };
}

// Get default column count for a photo count (prefer square-ish layouts)
export function getDefaultColumns(photoCount: number): number {
  const options = getColumnOptions(photoCount);
  // Find the option closest to square root (most square-like)
  const sqrt = Math.sqrt(photoCount);
  return options.reduce((prev, curr) =>
    Math.abs(curr - sqrt) < Math.abs(prev - sqrt) ? curr : prev
  );
}

// Available photo counts
export const photoCounts = [2, 4, 6, 8] as const;
export type PhotoCount = typeof photoCounts[number];

// Image data type
export interface ImageData {
  id: string;
  originalFile: File;
  croppedUrl: string;
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
