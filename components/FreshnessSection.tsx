'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function FreshnessSection({ product }: Props) {
  return (
    <section
      style={{
        width: '100%',
        background: '#0a0a0a',
        padding: '120px clamp(24px, 8vw, 160px)',
        textAlign: 'center',
      }}
    >
      {/* Top Accent */}
      <motion.div
        custom={0}
        variants={ITEM_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 40,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, transparent, ${product.themeColor}33)`,
          }}
        />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: product.themeColor,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to left, transparent, ${product.themeColor}33)`,
          }}
        />
      </motion.div>

      <motion.h2
        custom={1}
        variants={ITEM_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 58px)',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: '0 auto 24px',
        }}
      >
        {product.freshnessSection.title}
      </motion.h2>

      <motion.p
        custom={2}
        variants={ITEM_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          fontFamily: 'var(--font-grotesk)',
          fontWeight: 300,
          fontSize: 18,
          lineHeight: 1.9,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: 620,
          margin: '0 auto 48px',
        }}
      >
        {product.freshnessSection.description}
      </motion.p>

      {/* Processing pills */}
      <motion.div
        custom={3}
        variants={ITEM_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        {product.buyNowSection.processingParams.map((param) => (
          <span
            key={param}
            style={{
              border: `1px solid ${product.themeColor}40`,
              background: `${product.themeColor}0f`,
              color: product.themeColor,
              fontFamily: 'var(--font-grotesk)',
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '9px 22px',
              borderRadius: 2,
            }}
          >
            {param}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
