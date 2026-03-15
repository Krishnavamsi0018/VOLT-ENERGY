'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import type { Product } from '@/data/products';

// ─── Variants defined OUTSIDE component ───────────────────────────────────────
const containerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '600vh', // matches SCROLL_HEIGHT_MULTIPLIER * 100vh
  pointerEvents: 'none',
  zIndex: 2,
};

interface Props {
  product: Product;
}

interface SectionProps {
  scrollYProgress: MotionValue<number>;
  inRange: [number, number, number, number];
  children: React.ReactNode;
  align: 'left' | 'right';
  verticalAlign: 'bottom' | 'top';
}

function OverlaySection({
  scrollYProgress,
  inRange,
  children,
  align,
  verticalAlign,
}: SectionProps) {
  const opacity = useTransform(
    scrollYProgress,
    [inRange[0], inRange[1], inRange[2], inRange[3]],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [inRange[0], inRange[1]],
    [30, 0]
  );

  const paddingStyle =
    align === 'left'
      ? { paddingLeft: 'clamp(40px, 6vw, 120px)', paddingRight: '20px' }
      : { paddingRight: 'clamp(40px, 6vw, 120px)', paddingLeft: '20px' };

  const positionStyle =
    verticalAlign === 'bottom'
      ? { bottom: '18%', top: 'auto' }
      : { top: '22%', bottom: 'auto' };

  return (
    <motion.div
      style={{
        ...opacity && { opacity },
        ...y && { y },
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: verticalAlign === 'bottom' ? 'flex-end' : 'flex-start',
        ...paddingStyle,
        paddingBottom: verticalAlign === 'bottom' ? 'clamp(80px, 15vh, 180px)' : '0',
        paddingTop: verticalAlign === 'top' ? 'clamp(80px, 15vh, 200px)' : '0',
        textAlign: align,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductTextOverlays({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const glowShadow = `0 0 80px ${product.glowColor}`;

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* ─── Section 1: Product Name Big Reveal ─── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inRange={[0, 0.05, 0.12, 0.18]}
        align="left"
        verticalAlign="bottom"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 2,
            background: product.themeColor,
            marginBottom: 24,
          }}
        />

        <h1
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(48px, 7.5vw, 110px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: glowShadow,
          }}
        >
          {product.section1.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 400,
            lineHeight: 1.7,
            marginTop: 20,
          }}
        >
          {product.section1.subtitle}
        </p>

        {/* Stats pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 32,
          }}
        >
          {product.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                border: `1px solid ${product.themeColor}`,
                background: `${product.themeColor}14`,
                color: product.themeColor,
                fontFamily: 'var(--font-grotesk)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: 2,
                whiteSpace: 'nowrap',
              }}
            >
              {stat.val} {stat.label}
            </motion.div>
          ))}
        </div>
      </OverlaySection>

      {/* ─── Section 2 ─── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inRange={[0.2, 0.27, 0.38, 0.44]}
        align="right"
        verticalAlign="top"
      >
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: glowShadow,
          }}
        >
          {product.section2.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 400,
            lineHeight: 1.7,
            marginTop: 20,
            marginLeft: 'auto',
          }}
        >
          {product.section2.subtitle}
        </p>
      </OverlaySection>

      {/* ─── Section 3 ─── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inRange={[0.47, 0.54, 0.64, 0.70]}
        align="left"
        verticalAlign="bottom"
      >
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: glowShadow,
          }}
        >
          {product.section3.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 400,
            lineHeight: 1.7,
            marginTop: 20,
          }}
        >
          {product.section3.subtitle}
        </p>
      </OverlaySection>

      {/* ─── Section 4 ─── */}
      <OverlaySection
        scrollYProgress={scrollYProgress}
        inRange={[0.72, 0.79, 0.88, 0.94]}
        align="right"
        verticalAlign="top"
      >
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: glowShadow,
          }}
        >
          {product.section4.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 380,
            lineHeight: 1.7,
            marginTop: 20,
            marginLeft: 'auto',
          }}
        >
          {product.section4.subtitle}
        </p>
      </OverlaySection>
    </div>
  );
}
