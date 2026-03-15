'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import type { Product } from '@/data/products';

// ─── Constants ────────────────────────────────────────────────────────────────
const SCROLL_HEIGHT_MULTIPLIER = 6; // 600vh total

interface Props {
  product: Product;
  onScrollProgress?: (progress: number) => void;
}

export default function ProductCanvasScroll({ product, onScrollProgress }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const dprRef = useRef<number>(1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [glowOpacity, setGlowOpacity] = useState(0);

  // Detect low-end device for frame skipping
  const isLowEnd =
    typeof navigator !== 'undefined' &&
    (navigator.hardwareConcurrency <= 4 ||
      /Android/.test(navigator.userAgent));

  // ─── Canvas Setup (DPR-aware) ──────────────────────────────────────────────
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // ─── Frame Drawing ─────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    ctx.clearRect(0, 0, cw, ch);

    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const x = (cw - img.naturalWidth * scale) / 2;
    const y = (ch - img.naturalHeight * scale) / 2;

    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // ─── Image Preloading ──────────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    setImagesLoaded(false);
    setLoadProgress(0);
    imagesRef.current = [];
    frameIndexRef.current = 0;

    const loadImages = async () => {
      const isMobileDevice = window.innerWidth < 640;
      const deviceFolder = isMobileDevice ? 'mobile' : 'desktop';
      
      // If mobile, load half the frames to save even more memory 
      // i.e., skip odd frames so we only load 48 frames instead of 96
      const frameStep = isMobileDevice ? 2 : 1;
      const totalFramesToLoad = Math.floor(product.frameCount / frameStep);
      
      const images: HTMLImageElement[] = new Array(product.frameCount);
      let loaded = 0;

      const promises = Array.from({ length: totalFramesToLoad }, (_, i) =>
        new Promise<void>((resolve) => {
          // original frame index
          const frameIdx = (i * frameStep) + 1;
          const img = new Image();
          img.onload = () => {
            if (isMounted) {
              loaded++;
              setLoadProgress(Math.round((loaded / totalFramesToLoad) * 100));
            }
            images[frameIdx - 1] = img;
            // If we skipped a frame (mobile), just copy the previous frame as a placeholder 
            // so the scroll math still works seamlessly
            if (frameStep === 2 && frameIdx > 1) {
              images[frameIdx - 2] = img; 
            }
            resolve();
          };
          img.onerror = () => {
            images[frameIdx - 1] = new Image(); // empty placeholder
            if (frameStep === 2 && frameIdx > 1) {
              images[frameIdx - 2] = images[frameIdx - 1]; 
            }
            resolve();
          };
          const extension = product.frameExtension || 'webp';
          const suffix = product.hasDeviceFolders !== false ? `/${deviceFolder}` : '';
          img.src = `${product.folderPath}${suffix}/${frameIdx}.${extension}`;
        })
      );

      await Promise.all(promises);

      if (isMounted) {
        imagesRef.current = images;
        setImagesLoaded(true);
        // Draw first frame
        requestAnimationFrame(() => drawFrame(0));
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [product.folderPath, product.frameCount, product.frameExtension, drawFrame]);

  // ─── Canvas Setup & Resize ─────────────────────────────────────────────────
  useEffect(() => {
    setupCanvas();

    const observer = new ResizeObserver(() => {
      setupCanvas();
      requestAnimationFrame(() => drawFrame(frameIndexRef.current));
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    resizeObserverRef.current = observer;

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [setupCanvas, drawFrame]);

  // ─── Framer Motion Scroll ──────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!imagesLoaded) return;

    const index = Math.min(
      Math.floor(latest * product.frameCount),
      product.frameCount - 1
    );

    onScrollProgress?.(latest);
    setGlowOpacity(Math.min(latest / 0.15, 1));

    if (index !== frameIndexRef.current) {
      // Low-end frame skip
      if (isLowEnd && index % 2 !== 0 && index !== product.frameCount - 1) {
        return;
      }
      frameIndexRef.current = index;
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  // ─── iOS Safari Native Scroll Fallback ────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !imagesLoaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const wrapperTop = wrapper.offsetTop;
      const wrapperHeight = wrapper.offsetHeight - window.innerHeight;
      const relativeScroll = scrollTop - wrapperTop;
      const progress = Math.max(0, Math.min(1, relativeScroll / wrapperHeight));

      const index = Math.min(
        Math.floor(progress * product.frameCount),
        product.frameCount - 1
      );

      onScrollProgress?.(progress);
      setGlowOpacity(Math.min(progress / 0.15, 1));

      if (index !== frameIndexRef.current) {
        frameIndexRef.current = index;
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imagesLoaded, product.frameCount, drawFrame, onScrollProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh`,
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#050505',
          transform: 'translateZ(0)',
        }}
      >
        {/* Glow behind canvas */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${product.glowColor}, transparent)`,
            opacity: glowOpacity,
            transition: 'opacity 0.3s ease',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            willChange: 'transform',
          }}
        />

        {/* Loading bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            background: product.themeColor,
            width: `${loadProgress}%`,
            transition: 'width 0.1s ease, opacity 0.5s ease',
            opacity: loadProgress >= 100 ? 0 : 1,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
