'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '../hooks/useImageCrop';

interface ImageCropModalProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export default function ImageCropModal({
  imageUrl,
  onCropComplete,
  onCancel,
}: ImageCropModalProps) {
  const t = useTranslations('crop');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
      onCropComplete(croppedImageUrl);
    } catch (error) {
      console.error('Failed to crop image:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold gradient-text mb-4 text-center flex-shrink-0">
          {t('title')}
        </h2>

        <div className="crop-container">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
          />
        </div>

        <div className="mt-4 flex-shrink-0">
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            {t('zoom')}
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="slider w-full"
          />
        </div>

        <div className="flex gap-4 justify-center mt-4 flex-shrink-0">
          <button className="btn-secondary" onClick={onCancel}>
            {t('cancel')}
          </button>
          <button className="btn-gradient" onClick={handleConfirm}>
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
