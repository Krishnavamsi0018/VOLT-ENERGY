'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  currentIndex: number;
  onVariantChange: (index: number) => void;
}

// Lightning bolt SVG path
const LightningPath = ({ color }: { color: string }) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <motion.path
      d="M13 2L4.09 12.96H11L10 22L20 11.04H13L13 2Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  </svg>
);

export default function Navbar({ product, currentIndex, onVariantChange }: Props) {
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0)',
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? `1px solid ${product.themeColor}26`
          : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '0 clamp(24px, 4vw, 80px)',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 2,
          background: product.themeColor,
          width: progressWidth,
          zIndex: 10,
        }}
      />

      {/* Left — Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LightningPath color={product.themeColor} />
        <span
          className="inline-block bg-clip-text text-transparent transition-all duration-300"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 900,
            fontSize: 22,
            backgroundImage: `linear-gradient(90deg, ${product.themeColor}, #ffffff)`,
          }}
        >
          VOLT
        </span>
        <span
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.35)',
            marginLeft: 2,
            display: 'block',
          }}
          className="hidden sm:block"
        >
          ENERGY
        </span>
      </div>

      {/* Center — Variant Dots */}
      <div
        style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        className="variant-dots"
        aria-label="Select flavor"
      >
        {[0, 1, 2, 3].map((i) => {
          const productColors = ['#FFD600', '#BF00FF', '#00F5FF', '#FF3D00'];
          const isActive = i === currentIndex;
          return (
            <motion.button
              key={i}
              aria-label={`Variant ${i + 1}`}
              onClick={() => onVariantChange(i)}
              animate={{
                scale: isActive ? 1.3 : 1,
                background: isActive ? productColors[i] : 'transparent',
                borderColor: isActive ? productColors[i] : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 10,
                height: 10,
                minWidth: 10,
                minHeight: 10,
                borderRadius: '50%',
                border: `1px solid rgba(255,255,255,0.2)`,
                cursor: 'pointer',
                padding: 0,
              }}
            />
          );
        })}
      </div>

      {/* Right — CTA */}
      <motion.button
        aria-label="Charge up — buy now"
        data-cursor="hover"
        whileTap={{ scale: 0.96 }}
        whileHover={{
          background: product.themeColor,
          color: '#000000',
          boxShadow: `0 0 24px ${product.glowColor}`,
        }}
        style={{
          border: `1px solid ${product.themeColor}`,
          background: 'transparent',
          color: product.themeColor,
          fontFamily: 'var(--font-grotesk)',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          padding: '11px 26px',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
        }}
      >
        Charge Up
      </motion.button>
    </nav>
  );
}
