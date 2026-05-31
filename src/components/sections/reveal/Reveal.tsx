"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Reveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  {
    number: "01",
    title: "Fino como nunca.",
    description:
      "8.9mm de espessura. Menor que a maioria dos smartphones. Projetado para quem leva o trabalho a sério.",
    specValue: "8.9",
    specLabel: "mm de espessura",
  },
  {
    number: "02",
    title: "Leveza absurda.",
    description:
      "890 gramas. Você vai esquecer que está carregando um computador. Dia inteiro no ombro, sem desculpas.",
    specValue: "890",
    specLabel: "gramas",
  },
  {
    number: "03",
    title: "Poder real.",
    description:
      "Apex M3 Ultra. Processamento que desafia computadores de mesa. Em um chassis impossível de 8.9mm.",
    specValue: "M3",
    specLabel: "Apex Ultra chip",
  },
];

export default function Reveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        blocksRef.current.forEach((block) => {
          if (!block) return;
          gsap.set(block, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: block,
            start: "top 85%",
            onEnter: () => {
              gsap.to(block, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            },
          });
        });
        return;
      }

      const blocks = blocksRef.current;
      const indicators = indicatorsRef.current;
      const image = imageRef.current;

      gsap.set([stickyRef.current, blocks[0], image], { opacity: 0 });
      gsap.set(blocks[0], { y: 40 });
      gsap.set([blocks[1], blocks[2]], { opacity: 0, y: 40 });
      indicators.forEach((ind, i) => {
        if (!ind) return;
        gsap.set(ind, { width: i === 0 ? "40px" : "24px" });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(image, { opacity: 1, duration: 0.8, ease: "power3.out" });
          gsap.to(stickyRef.current, { opacity: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(blocks[0], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
          });
        },
      });

      function updateIndicator(active: number) {
        indicators.forEach((ind, i) => {
          if (!ind) return;
          gsap.to(ind, {
            width: i === active ? "40px" : "24px",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      }

      let currentMoment = -1;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const next = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;

          if (next === currentMoment) return;
          currentMoment = next;

          const outDuration = prefersReduced ? 0 : 0.2;
          const inDuration = prefersReduced ? 0 : 0.3;

          blocks.forEach((b, i) => {
            if (!b) return;
            if (i === next) {
              gsap.to(b, { opacity: 1, y: 0, duration: inDuration, ease: "power3.out", overwrite: true });
            } else if (i < next) {
              gsap.to(b, { opacity: 0, y: -40, duration: outDuration, ease: "power2.in", overwrite: true });
            } else {
              gsap.to(b, { opacity: 0, y: 40, duration: outDuration, ease: "power2.in", overwrite: true });
            }
          });

          if (image) {
            const scales = [1.05, 1, 1.08];
            gsap.to(image, { scale: scales[next], duration: inDuration, ease: "power3.out", overwrite: true });
          }

          updateIndicator(next);
        },
      });

      setTimeout(() => ScrollTrigger.refresh(), 100);

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.imageCol}>
            <div ref={imageRef} className={styles.imageWrap}>
              <Image
                src="/images/hero-notebook.png"
                alt="Apex Ultra em detalhe"
                width={600}
                height={400}
                quality={90}
                className={styles.image}
              />
              <div className={styles.glow} />
            </div>
          </div>

          <div className={styles.textCol}>
            <div className={styles.blocksWrap}>
              {moments.map((m, i) => (
                <div
                  key={m.number}
                  ref={(el) => {
                    blocksRef.current[i] = el;
                  }}
                  className={styles.block}
                >
                  <span className={styles.momentNumber}>
                    <span className={styles.momentLine} />
                    {m.number}
                  </span>
                  <h2 className={styles.title}>{m.title}</h2>
                  <p className={styles.description}>{m.description}</p>
                  <div className={styles.spec}>
                    <span className={styles.specValue}>{m.specValue}</span>
                    <span className={styles.specLabel}>{m.specLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.indicators}>
              {moments.map((m, i) => (
                <span
                  key={m.number}
                  ref={(el) => {
                    indicatorsRef.current[i] = el;
                  }}
                  className={styles.indicator}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
