'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
}

function CheckIcon({ color }: { color: string }) {
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
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 14l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 10h11a4 4 0 010 8h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BuyNowSection({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        minHeight: '100vh',
        background: '#050505',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'center',
        gap: 0,
        padding: '80px clamp(24px, 4vw, 80px)',
      }}
    >
      {/* Left — Product Card */}
      <div
        style={{
          background: '#0d0d0d',
          border: `1px solid ${product.themeColor}2e`,
          borderRadius: 4,
          padding: 'clamp(32px, 4vw, 52px) clamp(24px, 3vw, 48px)',
          boxShadow: `0 0 60px ${product.themeColor}0a`,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 46px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 17,
            color: product.themeColor,
            marginTop: 6,
          }}
        >
          {product.subName}
        </div>

        <div style={{ height: 1, background: '#1a1a1a', margin: '28px 0' }} />

        <div
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          From
        </div>
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(52px, 6vw, 68px)',
            color: '#ffffff',
            lineHeight: 1,
          }}
        >
          {product.buyNowSection.price}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 15,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 4,
          }}
        >
          {product.buyNowSection.unit}
        </div>

        <div style={{ height: 1, background: '#1a1a1a', margin: '28px 0' }} />

        {/* Processing params */}
        {product.buyNowSection.processingParams.map((param) => (
          <div
            key={param}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <CheckIcon color={product.themeColor} />
            <span
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: 14,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {param}
            </span>
          </div>
        ))}

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 20,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          {product.buyNowSection.deliveryPromise}
        </p>
      </div>

      {/* Right — Action Panel */}
      <div
        style={{
          padding: 'clamp(0px, 3vw, 0px) 0 0 clamp(0px, 5vw, 60px)',
          paddingTop: 'clamp(40px, 0vw, 0px)',
        }}
      >
        {/* Quantity selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            marginBottom: 20,
          }}
        >
          <motion.button
            aria-label="Decrease quantity"
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              border: `1px solid ${product.themeColor}4d`,
              background: 'transparent',
              color: product.themeColor,
              fontSize: 20,
              cursor: 'pointer',
              borderRadius: '2px 0 0 2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </motion.button>
          <div
            style={{
              width: 60,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: `1px solid ${product.themeColor}4d`,
              borderBottom: `1px solid ${product.themeColor}4d`,
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 20,
              color: '#ffffff',
            }}
          >
            {quantity}
          </div>
          <motion.button
            aria-label="Increase quantity"
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuantity((q) => q + 1)}
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              border: `1px solid ${product.themeColor}4d`,
              background: 'transparent',
              color: product.themeColor,
              fontSize: 20,
              cursor: 'pointer',
              borderRadius: '0 2px 2px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </motion.button>
        </div>

        {/* Add to Cart */}
        <motion.button
          aria-label="Add to cart"
          whileTap={{ scale: 0.97 }}
          data-cursor="hover"
          onClick={handleAddToCart}
          style={{
            width: '100%',
            height: 58,
            marginBottom: 12,
            background: product.themeColor,
            color: '#000000',
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            borderRadius: 2,
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%), none`,
            backgroundSize: '200% 100%, auto',
            backgroundPosition: 'center',
            animation: 'shimmer 2.5s infinite',
          }}
        >
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </motion.button>

        {/* Buy Now */}
        <motion.button
          aria-label="Buy now"
          whileTap={{ scale: 0.97 }}
          data-cursor="hover"
          style={{
            width: '100%',
            height: 58,
            marginBottom: 28,
            border: `1px solid ${product.themeColor}`,
            background: 'transparent',
            color: product.themeColor,
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            borderRadius: 2,
            cursor: 'pointer',
          }}
          whileHover={{ background: `${product.themeColor}14` }}
        >
          Buy Now
        </motion.button>

        <p
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 12,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.3)',
            fontStyle: 'italic',
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          {product.buyNowSection.returnPolicy}
        </p>

        {/* Trust Badges */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { icon: <LockIcon />, label: 'Secure Payment' },
            { icon: <ReturnIcon />, label: 'Easy Returns' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-grotesk)',
                fontSize: 12,
              }}
            >
              <span style={{ color: `${product.themeColor}99` }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
