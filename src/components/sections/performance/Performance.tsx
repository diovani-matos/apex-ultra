"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Performance.module.css";

gsap.registerPlugin(ScrollTrigger);

const benchmarks = [
  {
    name: "Cinebench R24 Multi",
    score: 12480,
    decimals: 0,
    suffix: "",
    barWidth: 92,
    competitor: "MacBook Pro M3",
    competitorScore: "9.840",
  },
  {
    name: "Geekbench 6 Single",
    score: 3840,
    decimals: 0,
    suffix: "",
    barWidth: 88,
    competitor: "Dell XPS 15",
    competitorScore: "2.950",
  },
  {
    name: "DaVinci Resolve Export",
    score: 4.2,
    decimals: 1,
    suffix: "min",
    barWidth: 95,
    competitor: "ThinkPad X1 Carbon",
    competitorScore: "11.8min",
  },
  {
    name: "Blender BMW (CPU)",
    score: 38,
    decimals: 0,
    suffix: "s",
    barWidth: 90,
    competitor: "ASUS ZenBook Pro",
    competitorScore: "67s",
  },
];

export default function Performance() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerLeftRef = useRef<HTMLDivElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      const bars = barsRef.current.filter(Boolean) as HTMLDivElement[];

      /* ── Estado inicial ─────────────────────────────── */
      gsap.set(headerLeftRef.current, { opacity: 0, x: prefersReduced ? 0 : -40 });
      gsap.set(headerRightRef.current, { opacity: 0, x: prefersReduced ? 0 : 40 });
      gsap.set(items, { opacity: 0, y: prefersReduced ? 0 : 30 });
      gsap.set(bars, { width: "0%" });

      /* ── Animações de entrada ────────────────────────── */
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
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          });
          bars.forEach((bar, i) => {
            gsap.to(bar, {
              width: `${benchmarks[i].barWidth}%`,
              duration: 1,
              ease: "power3.out",
              delay: 0.3 + i * 0.1,
            });
          });
        },
      });

      /* ── Contadores animados ─────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          benchmarks.forEach((bm, i) => {
            const el = countersRef.current[i];
            if (!el) return;
            if (prefersReduced) {
              el.textContent =
                bm.decimals > 0 ? bm.score.toFixed(1) : String(bm.score);
              return;
            }
            const obj = { val: 0 };
            gsap.to(obj, {
              val: bm.score,
              duration: 2,
              ease: "power2.out",
              delay: 0.3 + i * 0.1,
              onUpdate() {
                el.textContent =
                  bm.decimals > 0
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
    <section ref={sectionRef} id="performance" className={styles.section}>
      <div aria-hidden="true" className={styles.decorText}>
        FAST
      </div>

      <div className={styles.container}>
        {/* ── Cabeçalho ──────────────────────────────── */}
        <header className={styles.header}>
          <div ref={headerLeftRef} className={styles.headerLeft}>
            <p className={styles.tag}>
              <span className={styles.tagLine} />
              Performance
            </p>
            <h2 className={styles.title}>
              <span>Velocidade que</span>
              <span>você sente.</span>
            </h2>
          </div>

          <div ref={headerRightRef} className={styles.headerRight}>
            <p className={styles.headerDesc}>
              Benchmarks reais, sem truques. O Apex Ultra performa onde importa:
              no seu trabalho do dia a dia.
            </p>
          </div>
        </header>

        {/* ── Grid de benchmarks ─────────────────────── */}
        <div className={styles.grid}>
          {benchmarks.map((bm, i) => (
            <div
              key={bm.name}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={styles.item}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>{bm.name}</span>
                <span className={styles.itemScore}>
                  <span
                    ref={(el) => { countersRef.current[i] = el; }}
                    className={styles.itemScoreValue}
                  >
                    0
                  </span>
                  {bm.suffix && (
                    <span className={styles.itemScoreSuffix}>{bm.suffix}</span>
                  )}
                </span>
              </div>

              <div className={styles.barTrack}>
                <div
                  ref={(el) => { barsRef.current[i] = el; }}
                  className={styles.barFill}
                />
              </div>

              <div className={styles.itemComparison}>
                <span>Apex Ultra</span>
                <span>
                  {bm.competitor} — {bm.competitorScore}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Nota de rodapé ─────────────────────────── */}
        <p className={styles.footnote}>
          * Benchmarks realizados em condições controladas. Resultados podem
          variar conforme configuração e uso.
        </p>
      </div>
    </section>
  );
}
