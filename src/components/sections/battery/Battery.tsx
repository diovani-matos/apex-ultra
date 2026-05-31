"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Battery.module.css";

gsap.registerPlugin(ScrollTrigger);

const CIRCUMFERENCE = 2 * Math.PI * 120; // 753.6
const FILL_OFFSET = CIRCUMFERENCE * (1 - 0.8); // 80% preenchido → 150.72

const details = [
  {
    icon: "86",
    title: "86Wh de capacidade",
    subtitle: "Célula de alta densidade energética",
  },
  {
    icon: "↯",
    title: "Carrega 50% em 30 minutos",
    subtitle: "Adaptador GaN 140W incluído",
  },
  {
    icon: "∞",
    title: "1.000 ciclos garantidos",
    subtitle: "Sem degradação perceptível",
  },
];

export default function Battery() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const counterRef = useRef<SVGTSpanElement>(null);
  const detailItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const items = detailItemsRef.current.filter(
        Boolean
      ) as HTMLDivElement[];

      /* ── Estado inicial ─────────────────────────────── */
      gsap.set(leftColRef.current, {
        opacity: 0,
        x: prefersReduced ? 0 : -40,
      });
      gsap.set(svgContainerRef.current, {
        opacity: 0,
        scale: prefersReduced ? 1 : 0.9,
      });
      gsap.set(items, { opacity: 0, x: prefersReduced ? 0 : -20 });
      if (progressRef.current) {
        gsap.set(progressRef.current, { strokeDashoffset: CIRCUMFERENCE });
      }
      if (counterRef.current) {
        counterRef.current.textContent = "0";
      }

      /* ── Animações de entrada ────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(leftColRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(svgContainerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(progressRef.current, {
            strokeDashoffset: FILL_OFFSET,
            duration: prefersReduced ? 0 : 2,
            ease: "power2.out",
            delay: 0.3,
          });

          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.4,
          });
        },
      });

      /* ── Contador central ───────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const el = counterRef.current;
          if (!el) return;
          if (prefersReduced) {
            el.textContent = "24";
            return;
          }
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 24,
            duration: 2,
            ease: "power2.out",
            delay: 0.3,
            onUpdate() {
              el.textContent = String(Math.round(obj.val));
            },
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="battery" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── Lado esquerdo: texto ─────────────────── */}
          <div ref={leftColRef} className={styles.leftCol}>
            <p className={styles.tag}>
              <span className={styles.tagLine} />
              Bateria
            </p>

            <h2 className={styles.title}>
              <span>24 horas.</span>
              <span>Sem desculpas.</span>
            </h2>

            <p className={styles.description}>
              Bateria de 86Wh com carregamento inteligente. Sabe quando
              preservar, sabe quando entregar. Carregamento rápido de 140W
              incluso.
            </p>

            <ul className={styles.detailList}>
              {details.map((item, i) => (
                <li key={item.title}>
                  <div
                    ref={(el) => { detailItemsRef.current[i] = el; }}
                    className={styles.detailItem}
                  >
                    <div className={styles.detailIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.detailTitle}>{item.title}</p>
                      <p className={styles.detailSubtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Lado direito: animação visual ────────── */}
          <div ref={svgContainerRef} className={styles.svgContainer}>
            <svg
              viewBox="0 0 300 300"
              className={styles.svg}
              aria-label="Indicador de autonomia de bateria: 24 horas"
              role="img"
            >
              {/* Círculo de fundo */}
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              {/* Círculo de progresso */}
              <circle
                ref={progressRef}
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE}
                style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
              />

              {/* Valor central */}
              <text
                x="150"
                y="155"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-display)"
                fontWeight="700"
                fontSize="56"
                fill="var(--color-text)"
              >
                <tspan ref={counterRef}>0</tspan>
              </text>

              {/* Sufixo "h" */}
              <text
                x="150"
                y="195"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-display)"
                fontWeight="300"
                fontSize="20"
                fill="var(--color-accent)"
              >
                h
              </text>
            </svg>

            <p className={styles.svgLabel}>Autonomia real em uso misto</p>
          </div>

        </div>
      </div>
    </section>
  );
}
