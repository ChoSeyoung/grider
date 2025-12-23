'use client';

import { useRef } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Layout, ImageData } from '../utils/layouts';
import { GridOptions } from '../utils/gridOptions';
import PhotoSlot from './PhotoSlot';

interface PhotoGridProps {
  layout: Layout;
  images: (ImageData | null)[];
  options: GridOptions;
  onImagesChange: (images: (ImageData | null)[]) => void;
  onImageUpload: (file: File, index: number) => void;
  onImageRemove: (index: number) => void;
}

export default function PhotoGrid({
  layout,
  images,
  options,
  onImagesChange,
  onImageUpload,
  onImageRemove,
}: PhotoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    const newImages = [...images];
    // Swap images
    const temp = newImages[sourceIndex];
    newImages[sourceIndex] = newImages[destIndex];
    newImages[destIndex] = temp;

    onImagesChange(newImages);
  };

  const slotSize = 150;
  const gridWidth = layout.cols * slotSize + (layout.cols - 1) * options.gap + 32;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="photo-grid" direction="horizontal">
        {(provided) => (
          <div
            ref={(el) => {
              provided.innerRef(el);
              (gridRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            {...provided.droppableProps}
            id="photo-grid"
            className="grid p-4 rounded-2xl"
            style={{
              gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
              gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
              gap: `${options.gap}px`,
              backgroundColor: options.backgroundColor,
              width: `min(90vw, ${gridWidth}px)`,
            }}
          >
            {images.map((image, index) => (
              <PhotoSlot
                key={index}
                index={index}
                image={image}
                borderRadius={options.borderRadius}
                onImageUpload={onImageUpload}
                onImageRemove={onImageRemove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
