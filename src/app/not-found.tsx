'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './not-found.module.css';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      gsap.set(decorRef.current, { opacity: 0 });
      gsap.set(tagRef.current, { opacity: 0, y: prefersReduced ? 0 : -20 });
      gsap.set(titleRef.current, { opacity: 0, y: prefersReduced ? 0 : 30 });
      gsap.set(descRef.current, { opacity: 0 });
      gsap.set(btnRef.current, { opacity: 0, y: prefersReduced ? 0 : 10 });

      gsap.to(decorRef.current, {
        opacity: 0.06,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.to(descRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        ease: 'power3.out',
      });
      gsap.to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.page}>
      <div ref={decorRef} aria-hidden="true" className={styles.decorText}>
        404
      </div>

      <div className={styles.content}>
        <p ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          Página não encontrada
          <span className={styles.tagLine} />
        </p>

        <h1 ref={titleRef} className={styles.title}>
          <span>Você foi longe</span>
          <span>demais.</span>
        </h1>

        <p ref={descRef} className={styles.description}>
          Esta página não existe ou foi movida. Volte para o início e encontre
          o que procura.
        </p>

        <Link ref={btnRef} href="/" className={styles.btn}>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
