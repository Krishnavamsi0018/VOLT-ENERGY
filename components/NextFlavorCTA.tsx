'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface Props {
  currentProduct: Product;
  nextProduct: Product;
  onNext: () => void;
}

export default function NextFlavorCTA({ currentProduct, nextProduct, onNext }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Detect mobile for clip-path
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const clipPath = isMobile
    ? 'none'
    : 'polygon(0 48px, 100% 0, 100% 100%, 0 100%)';

  return (
    <section
      onClick={onNext}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="hover"
      style={{
        width: '100%',
        minHeight: 280,
        background: '#080808',
        clipPath,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 80px)',
        textAlign: 'center',
      }}
      role="button"
      aria-label={`Next flavor: ${nextProduct.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onNext();
      }}
    >
      {/* Background glow on hover */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 50% 80% at 50% 50%, ${nextProduct.glowColor}, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: currentProduct.themeColor,
            marginBottom: 16,
          }}
        >
          Up Next
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <motion.span
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: nextProduct.themeColor,
              letterSpacing: '-0.02em',
            }}
          >
            →
          </motion.span>
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: nextProduct.themeColor,
              letterSpacing: '-0.02em',
            }}
          >
            {nextProduct.name}
          </h2>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 8,
          }}
        >
          {nextProduct.subName}
        </p>
      </div>

      {/* Bottom progress bar */}
      <motion.div
        aria-hidden="true"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: nextProduct.themeColor,
        }}
      />
    </section>
  );
}
