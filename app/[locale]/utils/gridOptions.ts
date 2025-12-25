export interface GridOptions {
  gap: number;
  cornerMode: 'square' | 'rounded';
  borderRadius: number;
  backgroundColor: string;
}

export const defaultGridOptions: GridOptions = {
  gap: 4,
  cornerMode: 'square',
  borderRadius: 0,
  backgroundColor: 'transparent',
};

export const gapOptions = [
  { value: 0, key: 'none' },
  { value: 4, key: 'small' },
  { value: 8, key: 'medium' },
  { value: 16, key: 'large' },
];

export const basicColorOptions = [
  { value: 'transparent', key: 'transparent' },
  { value: '#ffffff', key: 'white' },
  { value: '#000000', key: 'black' },
];

export const paletteColorOptions = [
  { value: '#FF6B6B', label: 'Coral' },
  { value: '#4ECDC4', label: 'Teal' },
  { value: '#45B7D1', label: 'Sky' },
  { value: '#96CEB4', label: 'Sage' },
  { value: '#FFEAA7', label: 'Cream' },
  { value: '#DDA0DD', label: 'Plum' },
  { value: '#98D8C8', label: 'Mint' },
  { value: '#F7DC6F', label: 'Gold' },
  { value: '#BB8FCE', label: 'Lavender' },
  { value: '#85C1E9', label: 'Azure' },
  { value: '#F8B500', label: 'Amber' },
  { value: '#E74C3C', label: 'Red' },
  { value: '#9B59B6', label: 'Purple' },
  { value: '#3498DB', label: 'Blue' },
  { value: '#1ABC9C', label: 'Turquoise' },
  { value: '#2ECC71', label: 'Green' },
];
