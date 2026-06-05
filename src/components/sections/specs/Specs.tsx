"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Specs.module.css";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  {
    value: 8.9,
    decimals: 1,
    suffix: "mm",
    label: "Espessura",
    description: "O mais fino já criado. Menor que a maioria dos smartphones.",
  },
  {
    value: 890,
    decimals: 0,
    suffix: "g",
    label: "Peso",
    description: "Leve o dia inteiro. Sem comprometer a estrutura.",
  },
  {
    value: 24,
    decimals: 0,
    suffix: "h",
    label: "Bateria",
    description: "Um dia completo de trabalho sem precisar de tomada.",
  },
  {
    value: 120,
    decimals: 0,
    suffix: "Hz",
    label: "Taxa de atualização",
    description: "Tela OLED 2880x1800. Cada pixel, perfeito.",
  },
  {
    value: 32,
    decimals: 0,
    suffix: "GB",
    label: "Memória unificada",
    description: "RAM e GPU compartilhadas. Velocidade sem gargalos.",
  },
  {
    value: 1,
    decimals: 0,
    suffix: "TB",
    label: "Armazenamento NVMe",
    description: "SSD ultrarrápido. Tudo disponível em instantes.",
  },
];

export default function Specs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerLeftRef = useRef<HTMLDivElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const lines = linesRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(headerLeftRef.current, { opacity: 0, x: prefersReduced ? 0 : -40 });
      gsap.set(headerRightRef.current, { opacity: 0, x: prefersReduced ? 0 : 40 });
      gsap.set(cards, { opacity: 0, y: prefersReduced ? 0 : 40 });
      gsap.set(lines, { width: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(headerLeftRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          });
          gsap.to(headerRightRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });
          gsap.to(lines, {
            width: 32,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.3,
          });
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          specs.forEach((spec, i) => {
            const el = countersRef.current[i];
            if (!el) return;
            if (prefersReduced) {
              el.textContent =
                spec.decimals > 0
                  ? spec.value.toFixed(1)
                  : String(spec.value);
              return;
            }
            const obj = { val: 0 };
            gsap.to(obj, {
              val: spec.value,
              duration: 2,
              ease: "power2.out",
              delay: i * 0.08,
              onUpdate() {
                el.textContent =
                  spec.decimals > 0
                    ? obj.val.toFixed(1)
                    : String(Math.round(obj.val));
              },
            });
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
    <section ref={sectionRef} id="specs" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div ref={headerLeftRef} className={styles.headerLeft}>
            <p className={styles.tag}>
              <span className={styles.tagLine} />
              Especificações
            </p>
            <h2 className={styles.title}>
              <span>Números que</span>
              <span>impressionam.</span>
            </h2>
          </div>

          <div ref={headerRightRef} className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Cada especificação foi projetada para redefinir o que se espera de
              um notebook ultrafino.
            </p>
          </div>
        </header>

        <div className={styles.grid}>
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={styles.card}
            >
              <div
                ref={(el) => { linesRef.current[i] = el; }}
                className={styles.cardLine}
              />
              <div className={styles.cardValue}>
                <span
                  ref={(el) => { countersRef.current[i] = el; }}
                  className={styles.cardNumber}
                >
                  {spec.decimals > 0 ? spec.value.toFixed(1) : String(spec.value)}
                </span>
                <span className={styles.cardSuffix}>{spec.suffix}</span>
              </div>
              <p className={styles.cardLabel}>{spec.label}</p>
              <p className={styles.cardDesc}>{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
