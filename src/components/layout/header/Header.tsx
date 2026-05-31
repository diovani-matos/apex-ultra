'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/config';
import styles from './Header.module.css';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll → .scrolled
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      headerRef.current.classList.toggle(styles.scrolled, window.scrollY > 80);
    };
    // Lenis não é usado aqui — estado de scroll é posição, não evento de animação
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animação de entrada
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const items = containerRef.current?.querySelectorAll('[data-anim]');
      if (!items?.length) return;

      gsap.set(items, { opacity: 0, y: -15 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <header ref={headerRef} className={styles.header}>
      <div ref={containerRef} className={styles.container}>
        <Link href="/" className={styles.logo} data-anim>
          <span className={styles.logoApex}>APEX</span>
          <span className={styles.logoUltra}>ULTRA</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="#specs" className={styles.navLink} data-anim>
            Specs
          </Link>
          <Link href="#design" className={styles.navLink} data-anim>
            Design
          </Link>
          <Link href="#performance" className={styles.navLink} data-anim>
            Performance
          </Link>
          <Link href="#cta" className={styles.cta} data-anim>
            Comprar agora
          </Link>
        </nav>
      </div>
    </header>
  );
}
