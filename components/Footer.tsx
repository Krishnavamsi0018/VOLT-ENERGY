'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { products } from '@/data/products';

interface Props {
  product: Product;
  onVariantChange: (index: number) => void;
}

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: '#',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const SCIENCE_LINKS = [
  'Our Formula',
  'Ingredients',
  'Lab Reports',
  'Certifications',
];

export default function Footer({ product, onVariantChange }: Props) {
  const [email, setEmail] = useState('');

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: `1px solid ${product.themeColor}1f`,
        padding: '80px clamp(24px, 4vw, 80px) 40px',
      }}
    >
      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(32px, 4vw, 48px)',
          marginBottom: 60,
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M13 2L4.09 12.96H11L10 22L20 11.04H13L13 2Z"
                stroke={product.themeColor}
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 18,
                color: '#ffffff',
              }}
            >
              VOLT ENERGY
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontWeight: 300,
              fontSize: 14,
              color: 'rgba(255,255,255,0.35)',
              margin: '16px 0 24px',
              lineHeight: 1.6,
            }}
          >
            Charge beyond limits. Engineered for peak human output.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ color: product.themeColor }}
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2 — Products */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.4em',
              color: product.themeColor,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Products
          </h3>
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => onVariantChange(i)}
              whileHover={{ color: '#ffffff' }}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                padding: '0 0 10px',
                fontFamily: 'var(--font-grotesk)',
                fontSize: 14,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.2s',
                minHeight: 0,
                minWidth: 0,
              }}
            >
              {p.name}
            </motion.button>
          ))}
        </div>

        {/* Column 3 — Science */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.4em',
              color: product.themeColor,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            The Science
          </h3>
          {SCIENCE_LINKS.map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ color: '#ffffff' }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-grotesk)',
                fontSize: 14,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s',
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Column 4 — Newsletter */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.4em',
              color: product.themeColor,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Stay Charged
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 13,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 16,
              lineHeight: 1.6,
            }}
          >
            New drops, lab reports, and early access.
          </p>
          <div style={{ display: 'flex' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address for newsletter"
              style={{
                flex: 1,
                background: '#0d0d0d',
                border: `1px solid #1a1a1a`,
                borderRight: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-grotesk)',
                fontSize: 14,
                padding: '12px 16px',
                borderRadius: '2px 0 0 2px',
                outline: 'none',
                minWidth: 0,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = product.themeColor;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#1a1a1a';
              }}
            />
            <motion.button
              aria-label="Subscribe to newsletter"
              whileHover={{ opacity: 0.85 }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: 48,
                height: 44,
                background: product.themeColor,
                color: '#000000',
                border: 'none',
                borderRadius: '0 2px 2px 0',
                cursor: 'pointer',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              →
            </motion.button>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-grotesk)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.25)',
              marginTop: 10,
            }}
          >
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: 24,
          borderTop: '1px solid #0f0f0f',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          © 2025 VOLT Energy. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-grotesk)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.2)',
          }}
        >
          Made in India 🇮🇳
        </span>
      </div>
    </footer>
  );
}
