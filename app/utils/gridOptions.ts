export interface GridOptions {
  gap: number; // 0, 4, 8, 12, 16
  borderRadius: number; // 0, 8, 16, 24
  backgroundColor: string;
}

export const defaultGridOptions: GridOptions = {
  gap: 4,
  borderRadius: 0,
  backgroundColor: 'transparent',
};

export const gapOptions = [
  { value: 0, label: 'None' },
  { value: 4, label: 'Small' },
  { value: 8, label: 'Medium' },
  { value: 16, label: 'Large' },
];

export const borderRadiusOptions = [
  { value: 0, label: 'Square' },
  { value: 8, label: 'Slight' },
  { value: 16, label: 'Rounded' },
  { value: 9999, label: 'Circle' },
];

export const backgroundColorOptions = [
  { value: '#ffffff', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#1a1a2e', label: 'Dark' },
  { value: '#f5f5f5', label: 'Light Gray' },
  { value: '#9945FF', label: 'Purple' },
  { value: '#FF00E6', label: 'Pink' },
  { value: 'transparent', label: 'Transparent' },
];
