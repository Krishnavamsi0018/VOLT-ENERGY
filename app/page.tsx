'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import ProductCanvasScroll from '@/components/ProductCanvasScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';
import ProductDetails from '@/components/ProductDetails';
import FreshnessSection from '@/components/FreshnessSection';
import BuyNowSection from '@/components/BuyNowSection';
import NextFlavorCTA from '@/components/NextFlavorCTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── Constants ─────────────────────────────────────────────────────────────────
const SHORT_NAMES: Record<string, string> = {
  plasma: 'Plasma',
  ultraviolet: 'UV',
  arctic: 'Arctic',
  inferno: 'Inferno',
};

// ─── Variants defined OUTSIDE component ───────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, scale: 0.985 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const arrowButtonBaseStyle = {
  position: 'fixed' as const,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'rgba(5,5,5,0.7)',
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
};

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const currentProduct = products[currentIndex];
  const nextProduct = products[(currentIndex + 1) % products.length];

  // ─── Detect mobile ────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // ─── Swipe hint (mobile, first visit) ────────────────────────────────────
  useEffect(() => {
    if (isMobile && !sessionStorage.getItem('volt-swipe-hint-shown')) {
      setShowSwipeHint(true);
      sessionStorage.setItem('volt-swipe-hint-shown', '1');
      const timer = setTimeout(() => setShowSwipeHint(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // ─── CSS variable update on variant change ────────────────────────────────
  useEffect(() => {
    document.documentElement.style.setProperty('--active-color', currentProduct.themeColor);
    document.documentElement.style.setProperty('--active-glow', currentProduct.glowColor);
  }, [currentProduct.themeColor, currentProduct.glowColor]);

  // ─── Scroll reset on variant change ──────────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentIndex]);

  // ─── Variant change handler ───────────────────────────────────────────────
  const handleVariantChange = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning, currentIndex]
  );

  // ─── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleVariantChange((currentIndex + 1) % products.length);
      }
      if (e.key === 'ArrowLeft') {
        handleVariantChange((currentIndex - 1 + products.length) % products.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, handleVariantChange]);

  // ─── Touch swipe navigation ───────────────────────────────────────────────
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // Only horizontal swipe (not scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
        if (deltaX < 0) {
          handleVariantChange((currentIndex + 1) % products.length);
        } else {
          handleVariantChange((currentIndex - 1 + products.length) % products.length);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, handleVariantChange]);

  return (
    <>
      <Navbar
        product={currentProduct}
        currentIndex={currentIndex}
        onVariantChange={handleVariantChange}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentProduct.id}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Section 1: Canvas Scroll + Text Overlays */}
          <section style={{ position: 'relative' }}>
            <ProductCanvasScroll product={currentProduct} />
            <ProductTextOverlays product={currentProduct} />
          </section>

          {/* Section 2: Product Details */}
          <ProductDetails product={currentProduct} />

          {/* Section 3: Freshness */}
          <FreshnessSection product={currentProduct} />

          {/* Section 4: Buy Now */}
          <BuyNowSection product={currentProduct} />

          {/* Section 5: Next Flavor CTA */}
          <NextFlavorCTA
            currentProduct={currentProduct}
            nextProduct={nextProduct}
            onNext={() =>
              handleVariantChange((currentIndex + 1) % products.length)
            }
          />
        </motion.div>
      </AnimatePresence>

      <Footer product={currentProduct} onVariantChange={handleVariantChange} />

      {/* ─── Fixed Left Arrow (desktop only) ─── */}
      {!isMobile && (
        <motion.button
          aria-label="Previous flavor"
          onClick={() =>
            handleVariantChange((currentIndex - 1 + products.length) % products.length)
          }
          style={{
            ...arrowButtonBaseStyle,
            left: 24,
            border: `1px solid ${currentProduct.themeColor}4d`,
            color: currentProduct.themeColor,
            opacity: isTransitioning ? 0.3 : 1,
          }}
          whileHover={{
            boxShadow: `0 0 20px ${currentProduct.glowColor}`,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          disabled={isTransitioning}
        >
          ←
        </motion.button>
      )}

      {/* ─── Fixed Right Arrow (desktop only) ─── */}
      {!isMobile && (
        <motion.button
          aria-label="Next flavor"
          onClick={() =>
            handleVariantChange((currentIndex + 1) % products.length)
          }
          style={{
            ...arrowButtonBaseStyle,
            right: 24,
            border: `1px solid ${currentProduct.themeColor}4d`,
            color: currentProduct.themeColor,
            opacity: isTransitioning ? 0.3 : 1,
          }}
          whileHover={{
            boxShadow: `0 0 20px ${currentProduct.glowColor}`,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          disabled={isTransitioning}
        >
          →
        </motion.button>
      )}

      {/* ─── Swipe Hint (mobile, first visit) ─── */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'fixed',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(5,5,5,0.85)',
              WebkitBackdropFilter: 'blur(12px)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100,
              padding: '10px 20px',
              fontFamily: 'var(--font-grotesk)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
              zIndex: 200,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            ← swipe to change flavor →
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Fixed Bottom Pill Nav ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5,5,5,0.85)',
          WebkitBackdropFilter: 'blur(20px)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 100,
          padding: 5,
          display: 'flex',
          gap: 2,
          zIndex: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {products.map((p, i) => {
          const isActive = i === currentIndex;
          const label = isMobile ? SHORT_NAMES[p.id] : p.name;
          return (
            <motion.button
              key={p.id}
              aria-label={`Switch to ${p.name}`}
              onClick={() => handleVariantChange(i)}
              animate={{
                background: isActive ? p.themeColor : 'transparent',
                color: isActive ? '#000000' : 'rgba(255,255,255,0.35)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                padding: isMobile ? '8px 12px' : '9px 18px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-grotesk)',
                fontSize: isMobile ? 11 : 12,
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
              }}
              whileTap={{ scale: 0.96 }}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
