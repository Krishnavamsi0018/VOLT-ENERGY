'use client';

import { useEffect, useRef } from 'react';

const LERP_FACTOR = 0.12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches)
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      if (ring) ring.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      if (ring) ring.classList.remove('hovering');
    };

    const animate = () => {
      ringPos.current.x +=
        (mousePos.current.x - ringPos.current.x) * LERP_FACTOR;
      ringPos.current.y +=
        (mousePos.current.y - ringPos.current.y) * LERP_FACTOR;

      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const hoverTargets = document.querySelectorAll<HTMLElement>(
      'button, a, [data-cursor="hover"]'
    );

    const addHoverListeners = (el: HTMLElement) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    };

    document.addEventListener('mousemove', handleMouseMove);
    hoverTargets.forEach(addHoverListeners);

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      const newTargets = document.querySelectorAll<HTMLElement>(
        'button, a, [data-cursor="hover"]'
      );
      newTargets.forEach(addHoverListeners);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
