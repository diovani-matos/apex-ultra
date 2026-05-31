"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Design.module.css";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    subtitle: "Chassi em alumínio aeroespacial",
    description:
      "Usinado de um único bloco de alumínio série 6000. Rígido onde importa, leve onde é possível. Tolerâncias de fabricação de ±0.01mm.",
    detail: "Liga 6061-T6 · Anodização dupla",
    image: "/images/hero-notebook.png",
    imageAlt: "Chassi em alumínio aeroespacial do Apex Ultra",
  },
  {
    subtitle: "Teclado com curso de 1.2mm",
    description:
      "Cada tecla calibrada individualmente. Feedback tátil preciso, som abafado. Iluminação RGB por zona com 16 milhões de cores.",
    detail: "Anti-ghosting · NKRO completo",
    image: "/images/detalhe-teclado.png",
    imageAlt: "Teclado retroiluminado do Apex Ultra com curso de 1.2mm",
  },
  {
    subtitle: "Tela OLED sem bordas",
    description:
      "Panel OLED de 14.5 polegadas com taxa de contraste infinita. Cobertura de 100% do espaço DCI-P3. Certificado VESA DisplayHDR True Black 500.",
    detail: "Delta E < 1 · TÜV Rheinland",
    image: "/images/detalhe-tela.png",
    imageAlt: "Tela OLED sem bordas do Apex Ultra",
  },
  {
    subtitle: "Conectividade sem compromisso",
    description:
      "Dois Thunderbolt 4, USB-A 3.2, HDMI 2.1 e leitor SD UHS-II. Tudo acessível, nada sacrificado. Sem dongles, sem adaptadores.",
    detail: "Wi-Fi 6E · Bluetooth 5.3",
    image: "/images/detalhe-lateral.png",
    imageAlt: "Portas e conectividade do Apex Ultra vistas de lado",
  },
];

export default function Design() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 768;

      const allPanels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      const allDots = dotsRef.current.filter(Boolean) as HTMLSpanElement[];
      const img = imageRef.current;

      /* ── Estado inicial ─────────────────────────────── */
      gsap.set(tagRef.current, { opacity: 0, x: prefersReduced ? 0 : -30 });
      gsap.set(titleRef.current, { opacity: 0, x: prefersReduced ? 0 : -30 });
      gsap.set(allPanels, { opacity: 0, y: prefersReduced ? 0 : 30 });
      if (img) gsap.set(img, { opacity: 0 });

      /* ── Troca de imagem com crossfade ──────────────── */
      function swapImage(index: number) {
        if (!img) return;
        const newSrc = panels[index].image;
        const newAlt = panels[index].imageAlt;

        if (prefersReduced) {
          img.src = newSrc;
          img.alt = newAlt;
          return;
        }

        gsap.to(img, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            img.src = newSrc;
            img.alt = newAlt;
            gsap.to(img, { opacity: 1, duration: 0.4, ease: "power2.out" });
          },
        });
      }

      /* ── Troca de painel de texto ───────────────────── */
      function swapPanel(nextIndex: number, prevIndex: number) {
        const prev = allPanels[prevIndex];
        const next = allPanels[nextIndex];
        if (!next) return;

        const outDur = prefersReduced ? 0 : 0.3;
        const inDur = prefersReduced ? 0 : 0.4;
        const outY = prevIndex < nextIndex ? -20 : 20;
        const inY = prevIndex < nextIndex ? 20 : -20;

        if (prev) {
          gsap.to(prev, {
            opacity: 0,
            y: outY,
            duration: outDur,
            ease: "power2.in",
            overwrite: true,
          });
        }

        gsap.to(next, {
          opacity: 1,
          y: 0,
          duration: inDur,
          delay: prev ? outDur : 0,
          ease: "power2.out",
          overwrite: true,
        });

        allDots.forEach((d, i) => {
          d.classList.toggle(styles.dotActive, i === nextIndex);
        });
      }

      /* ── Entrada da seção ───────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(tagRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          });
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: 0.1,
            ease: "power3.out",
          });
          if (img) {
            img.src = panels[0].image;
            img.alt = panels[0].imageAlt;
            gsap.to(img, { opacity: 1, duration: 0.8, ease: "power3.out" });
          }
          swapPanel(0, -1);
          allDots[0]?.classList.add(styles.dotActive);
        },
      });

      /* ── ScrollTrigger de troca de painéis ──────────── */
      if (!isMobile) {
        const totalPanels = panels.length;

        panels.forEach((_, i) => {
          if (i === 0) return;

          const startPct = (i / totalPanels) * 100;
          const endPct = ((i + 1) / totalPanels) * 100;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${startPct}% top`,
            end: `top+=${endPct}% top`,
            onEnter: () => {
              swapPanel(i, i - 1);
              swapImage(i);
            },
            onLeaveBack: () => {
              swapPanel(i - 1, i);
              swapImage(i - 1);
            },
          });
        });
      } else {
        /* Mobile: cada painel aparece via scroll simples */
        allPanels.forEach((panel, i) => {
          gsap.set(panel, { opacity: 1, y: 0 }); // mobile sempre visível
          ScrollTrigger.create({
            trigger: panel,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(panel, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            },
          });
        });
      }

      setTimeout(() => ScrollTrigger.refresh(), 100);

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="design" className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>

          {/* ── Lado esquerdo: imagem única ───────────── */}
          <div className={styles.imageCol}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={panels[0].image}
              alt={panels[0].imageAlt}
              className={styles.image}
            />
          </div>

          {/* ── Lado direito: texto ───────────────────── */}
          <div ref={textColRef} className={styles.textCol}>
            <p ref={tagRef} className={styles.tag}>
              <span className={styles.tagLine} />
              Design
            </p>

            <h2 ref={titleRef} className={styles.title}>
              <span>Cada detalhe,</span>
              <span>intencional.</span>
            </h2>

            <div className={styles.panelsWrap}>
              {panels.map((panel, i) => (
                <div
                  key={i}
                  ref={(el) => { panelsRef.current[i] = el; }}
                  className={styles.panel}
                >
                  <h3 className={styles.panelSubtitle}>{panel.subtitle}</h3>
                  <p className={styles.panelDesc}>{panel.description}</p>
                  <p className={styles.panelDetail}>{panel.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Dots indicadores ─────────────────────── */}
          <div className={styles.dots}>
            {panels.map((_, i) => (
              <span
                key={i}
                ref={(el) => { dotsRef.current[i] = el; }}
                className={styles.dot}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
