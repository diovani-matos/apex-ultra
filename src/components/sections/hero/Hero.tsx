'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap/config';
import styles from './Hero.module.css';

const PARTICLES = Array.from({ length: 12 }, (_, i) => i);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowBgRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const h1Line1Ref = useRef<HTMLSpanElement>(null);
  const h1Line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── Loops contínuos (rodam sempre) ────────────────────────────────────

      // Glow de fundo: pulse suave
      gsap.to(glowBgRef.current, {
        scale: 1.15,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      if (!reduced) {
        // Zoom lento cinematográfico
        gsap.to(imageRef.current, {
          scale: 1.08,
          duration: 8,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        // Partículas individuais
        const particles = particlesRef.current?.querySelectorAll('[data-particle]');
        particles?.forEach((p) => {
          gsap.to(p, {
            y: -30,
            opacity: 0,
            duration: gsap.utils.random(2, 4),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: gsap.utils.random(0, 2),
          });
        });
      }

      if (reduced) return;

      // ── Animação de entrada ────────────────────────────────────────────────

      gsap.set(tagRef.current, { opacity: 0, y: 20 });
      gsap.set([h1Line1Ref.current, h1Line2Ref.current], {
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)',
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
      gsap.set([ctaPrimaryRef.current, ctaSecondaryRef.current], { opacity: 0, y: 15 });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(glowLineRef.current, { opacity: 0 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          glowLineRef.current,
          { opacity: 0.6, duration: 1, ease: 'power3.out' },
          '<',
        )
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.8')
        .to(
          [h1Line1Ref.current, h1Line2Ref.current],
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.4',
        )
        .to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4',
        )
        .to(
          [ctaPrimaryRef.current, ctaSecondaryRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '-=0.3',
        )
        .to(
          scrollIndicatorRef.current,
          { opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.2',
          // depois do fade-in, inicia o loop de piscar
        )
        .call(() => {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0.3,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Camada 1 — Glow de fundo */}
      <div ref={glowBgRef} className={styles.glowBg} aria-hidden="true" />

      {/* Partículas */}
      <div ref={particlesRef} className={styles.particles} aria-hidden="true">
        {PARTICLES.map((i) => (
          <div
            key={i}
            data-particle
            className={styles.particle}
            style={{
              left: `${10 + Math.floor((i * 73) % 80)}%`,
              top: `${10 + Math.floor((i * 47) % 75)}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: 0.3 + (i % 4) * 0.075,
            }}
          />
        ))}
      </div>

      {/* Camada 2 — Produto */}
      <div ref={imageContainerRef} className={styles.imageContainer}>
        <Image
          src="/images/hero-notebook.png"
          alt="Apex Ultra — Notebook Ultrafino"
          width={1400}
          height={933}
          quality={95}
          priority
          ref={imageRef}
          className={styles.productImage}
        />
      </div>

      {/* Overlays */}
      <div className={styles.overlayRadial} aria-hidden="true" />
      <div ref={glowLineRef} className={styles.overlayGradient} aria-hidden="true" />

      {/* Camada 3 — Texto */}
      <div className={styles.content}>
        <span ref={tagRef} className={styles.tag}>
          Apresentando o Apex Ultra
        </span>

        <h1 className={styles.h1}>
          <span ref={h1Line1Ref} className={styles.h1Line}>
            Redefinindo
          </span>
          <span ref={h1Line2Ref} className={styles.h1Line}>
            o que é{' '}
            <span className={styles.h1Accent}>possível.</span>
          </span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          8.9mm · 890g · 24h · Apex M3 Ultra
        </p>

        <div className={styles.ctaGroup}>
          <a ref={ctaPrimaryRef} href="#cta" className={styles.ctaPrimary}>
            Comprar agora — R$&nbsp;12.990
          </a>
          <a ref={ctaSecondaryRef} href="#specs" className={styles.ctaSecondary}>
            Ver especificações
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
