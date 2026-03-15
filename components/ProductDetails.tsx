'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

function LightningIcon({ color }: { color: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M13 2L4.09 12.96H11L10 22L20 11.04H13L13 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProductDetails({ product }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 0,
        alignItems: 'center',
        padding: '80px clamp(24px, 4vw, 80px)',
        background: '#050505',
      }}
    >
      {/* Left — Text */}
      <div style={{ maxWidth: 600 }}>
        <motion.p
          custom={0}
          variants={ITEM_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.35em',
            color: product.themeColor,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          The Formula
        </motion.p>

        <motion.h2
          custom={1}
          variants={ITEM_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(32px, 4.5vw, 68px)',
            lineHeight: 1.0,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          {product.detailsSection.title}
        </motion.h2>

        <motion.div
          custom={2}
          variants={ITEM_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            width: 56,
            height: 2,
            background: product.themeColor,
            margin: '28px 0',
          }}
        />

        <motion.p
          custom={3}
          variants={ITEM_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 40,
          }}
        >
          {product.detailsSection.description}
        </motion.p>

        {/* Features */}
        {product.features.map((feat, i) => (
          <motion.div
            key={feat}
            custom={4 + i}
            variants={ITEM_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}
          >
            <LightningIcon color={product.themeColor} />
            <span
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontWeight: 400,
                fontSize: 15,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {feat}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right — Stats Card */}
      <motion.div
        variants={CARD_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          background: '#0d0d0d',
          border: `1px solid ${product.themeColor}1f`,
          borderRadius: 4,
          padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px)',
          boxShadow: `inset 0 0 80px ${product.themeColor}08`,
          marginLeft: 'clamp(0px, 3vw, 40px)',
          marginTop: 'clamp(48px, 0px, 0px)',
        }}
      >
        {product.stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '28px 0',
              borderBottom:
                i < product.stats.length - 1 ? '1px solid #1a1a1a' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(48px, 7vw, 64px)',
                color: product.themeColor,
                lineHeight: 1,
              }}
            >
              {stat.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 11,
                fontWeight: 300,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
