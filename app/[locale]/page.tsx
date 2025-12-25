'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import PhotoCountSelector from './components/PhotoCountSelector';
import LayoutSelector from './components/LayoutSelector';
import PhotoGrid from './components/PhotoGrid';
import ImageCropModal from './components/ImageCropModal';
import DownloadButton from './components/DownloadButton';
import GridOptionsPanel from './components/GridOptionsPanel';
import AdPlaceholder from './components/AdPlaceholder';
import {
  Layout,
  ImageData,
  PhotoCount,
  generateId,
} from './utils/layouts';
import { GridOptions, defaultGridOptions } from './utils/gridOptions';

type Step = 'count' | 'layout' | 'editor';

interface CropState {
  file: File;
  url: string;
  targetIndex: number;
}

export default function Home() {
  const t = useTranslations('editor');
  const [step, setStep] = useState<Step>('count');
  const [photoCount, setPhotoCount] = useState<PhotoCount | null>(4);
  const [selectedLayout, setSelectedLayout] = useState<Layout | null>(null);
  const [images, setImages] = useState<(ImageData | null)[]>([]);
  const [cropState, setCropState] = useState<CropState | null>(null);
  const [gridOptions, setGridOptions] = useState<GridOptions>(defaultGridOptions);

  const handleCountSelect = useCallback((count: PhotoCount) => {
    setPhotoCount(count);
  }, []);

  const handleCountStart = useCallback(() => {
    if (photoCount) {
      setStep('layout');
    }
  }, [photoCount]);

  const handleLayoutConfirm = useCallback((layout: Layout) => {
    setSelectedLayout(layout);
    setImages(Array(layout.totalSlots).fill(null));
    setStep('editor');
  }, []);

  const handleLayoutBack = useCallback(() => {
    setStep('count');
    setSelectedLayout(null);
  }, []);

  const handleImageUpload = useCallback((file: File, index: number) => {
    const url = URL.createObjectURL(file);
    setCropState({ file, url, targetIndex: index });
  }, []);

  const handleCropComplete = useCallback(
    (croppedUrl: string) => {
      if (!cropState) return;

      const newImage: ImageData = {
        id: generateId(),
        originalFile: cropState.file,
        croppedUrl,
      };

      setImages((prev) => {
        const newImages = [...prev];
        newImages[cropState.targetIndex] = newImage;
        return newImages;
      });

      // Clean up
      URL.revokeObjectURL(cropState.url);
      setCropState(null);
    },
    [cropState]
  );

  const handleCropCancel = useCallback(() => {
    if (cropState) {
      URL.revokeObjectURL(cropState.url);
      setCropState(null);
    }
  }, [cropState]);

  const handleImageRemove = useCallback((index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      if (newImages[index]) {
        URL.revokeObjectURL(newImages[index]!.croppedUrl);
        newImages[index] = null;
      }
      return newImages;
    });
  }, []);

  const handleImagesChange = useCallback((newImages: (ImageData | null)[]) => {
    setImages(newImages);
  }, []);

  const handleReset = useCallback(() => {
    // Clean up all image URLs
    images.forEach((img) => {
      if (img) {
        URL.revokeObjectURL(img.croppedUrl);
      }
    });

    setStep('count');
    setPhotoCount(null);
    setSelectedLayout(null);
    setImages([]);
    setGridOptions(defaultGridOptions);
  }, [images]);

  const allSlotsFilled = images.every((img) => img !== null);

  const steps: Step[] = ['count', 'layout', 'editor'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="page-layout">
      {/* Top Ad */}
      <div className="ad-top">
        <AdPlaceholder type="banner" slot="topBanner" />
      </div>

      {/* Main Content with Sidebars */}
      <div className="main-with-sidebar flex-1">
        {/* Left Sidebar Ad (PC only) */}
        <div className="ad-sidebar-container left">
          <AdPlaceholder type="sidebar" slot="sidebarLeft" />
        </div>

        {/* Main Content */}
        <main className="main-content">
          {/* Step Indicator */}
          <div className="step-indicator mb-8">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`step-dot ${
                  i === currentStepIndex
                    ? 'active'
                    : i < currentStepIndex
                    ? 'completed'
                    : ''
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          {step === 'count' && (
            <PhotoCountSelector
              selectedCount={photoCount}
              onSelect={handleCountSelect}
              onStart={handleCountStart}
            />
          )}

          {step === 'layout' && photoCount && (
            <LayoutSelector
              photoCount={photoCount}
              onConfirm={handleLayoutConfirm}
              onBack={handleLayoutBack}
            />
          )}

          {step === 'editor' && selectedLayout && (
            <div className="editor-layout">
              <div className="editor-main">
                <div className="text-center">
                  <h1 className="text-3xl font-bold gradient-text mb-2">
                    {t('title')}
                  </h1>
                  <p className="text-[var(--text-secondary)]">
                    {t('subtitle')}
                  </p>
                </div>

                <PhotoGrid
                  layout={selectedLayout}
                  images={images}
                  options={gridOptions}
                  onImagesChange={handleImagesChange}
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                />

                <div className="flex gap-2 sm:gap-4">
                  <button className="btn-secondary whitespace-nowrap text-sm sm:text-base px-4 sm:px-8" onClick={handleReset}>
                    {t('reset')}
                  </button>
                  <DownloadButton
                    targetId="photo-grid"
                    disabled={!allSlotsFilled}
                  />
                </div>

                {!allSlotsFilled && (
                  <p className="text-[var(--text-secondary)] text-sm">
                    {t('fillAllSlots')}
                  </p>
                )}

                {/* Mobile inline ad */}
                <div className="lg:hidden w-full">
                  <AdPlaceholder type="inline" slot="mobileInline" />
                </div>
              </div>

              <div className="editor-sidebar">
                <GridOptionsPanel
                  options={gridOptions}
                  onChange={setGridOptions}
                />
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar Ad (PC only) */}
        <div className="ad-sidebar-container">
          <AdPlaceholder type="sidebar" slot="sidebarRight" />
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="ad-bottom">
        <AdPlaceholder type="banner" slot="bottomBanner" />
      </div>

      {/* Crop Modal */}
      {cropState && (
        <ImageCropModal
          imageUrl={cropState.url}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
