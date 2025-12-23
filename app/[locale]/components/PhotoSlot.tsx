'use client';

import { useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { ImageData } from '../utils/layouts';

interface PhotoSlotProps {
  index: number;
  image: ImageData | null;
  borderRadius: number;
  onImageUpload: (file: File, index: number) => void;
  onImageRemove: (index: number) => void;
}

export default function PhotoSlot({
  index,
  image,
  borderRadius,
  onImageUpload,
  onImageRemove,
}: PhotoSlotProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file, index);
    }
    // Reset input for re-upload
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove(index);
  };

  return (
    <Draggable
      draggableId={`slot-${index}`}
      index={index}
      isDragDisabled={!image}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`photo-slot ${image ? 'filled' : ''} ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
          onClick={handleClick}
          style={{
            ...provided.draggableProps.style,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {image ? (
            <>
              <img
                src={image.croppedUrl}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ borderRadius: `${borderRadius}px` }}
              />
              <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={handleRemove}
              >
                ×
              </button>
            </>
          ) : (
            <div className="plus-icon">+</div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </Draggable>
  );
}
