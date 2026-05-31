"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CTA.module.css";

gsap.registerPlugin(ScrollTrigger);

const guarantees = [
  "Frete grátis para todo o Brasil",
  "Garantia de 2 anos",
  "30 dias para devolução",
];

const formatter = new Intl.NumberFormat("pt-BR");

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const priceBlockRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const guaranteeItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const buttons = buttonsRef.current.filter(Boolean) as HTMLButtonElement[];
      const gItems = guaranteeItemsRef.current.filter(Boolean) as HTMLLIElement[];

      /* ── Estado inicial ─────────────────────────────── */
      gsap.set(tagRef.current, { opacity: 0, y: prefersReduced ? 0 : -20 });
      gsap.set(titleRef.current, { opacity: 0, y: prefersReduced ? 0 : 40 });
      gsap.set(priceBlockRef.current, { opacity: 0, y: prefersReduced ? 0 : 30 });
      gsap.set(buttons, { opacity: 0, y: prefersReduced ? 0 : 20 });
      gsap.set(gItems, { opacity: 0, y: prefersReduced ? 0 : 20 });
      gsap.set(footerRef.current, { opacity: 0 });
      if (priceRef.current) priceRef.current.textContent = "0";

      /* ── Animações de entrada ────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.to(tagRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
          });
          gsap.to(priceBlockRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          });
          gsap.to(buttons, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          });
          gsap.to(gItems, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          });
          gsap.to(footerRef.current, {
            opacity: 1,
            duration: 0.6,
            delay: 1,
            ease: "power3.out",
          });
        },
      });

      /* ── Contador do preço ──────────────────────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const el = priceRef.current;
          if (!el) return;
          if (prefersReduced) {
            el.textContent = formatter.format(12990);
            return;
          }
          const obj = { val: 0 };
          gsap.to(obj, {
            val: 12990,
            duration: 2,
            ease: "power2.out",
            delay: 0.4,
            onUpdate() {
              el.textContent = formatter.format(Math.round(obj.val));
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
    <section ref={sectionRef} id="cta" className={styles.section}>
      <div aria-hidden="true" className={styles.decorText}>
        APEX
      </div>

      <div className={styles.container}>

        {/* ── Tag superior ─────────────────────────── */}
        <p ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          Disponível agora
          <span className={styles.tagLine} />
        </p>

        {/* ── Título ───────────────────────────────── */}
        <h2 ref={titleRef} className={styles.title}>
          <span>O futuro</span>
          <span>cabe no seu</span>
          <span>bolso.</span>
        </h2>

        {/* ── Bloco de preço ───────────────────────── */}
        <div ref={priceBlockRef} className={styles.priceBlock}>
          <div className={styles.priceRow}>
            <span className={styles.pricePrefix}>R$</span>
            <span ref={priceRef} className={styles.priceValue}>0</span>
          </div>
          <p className={styles.installments}>ou 12x de R$ 1.083 sem juros</p>
        </div>

        {/* ── Botões ───────────────────────────────── */}
        <div className={styles.buttons}>
          <button
            ref={(el) => { buttonsRef.current[0] = el; }}
            className={styles.btnPrimary}
            type="button"
          >
            Comprar agora
          </button>
          <button
            ref={(el) => { buttonsRef.current[1] = el; }}
            className={styles.btnSecondary}
            type="button"
          >
            Saiba mais
          </button>
        </div>

        {/* ── Garantias ────────────────────────────── */}
        <ul className={styles.guarantees}>
          {guarantees.map((text, i) => (
            <li
              key={text}
              ref={(el) => { guaranteeItemsRef.current[i] = el; }}
              className={styles.guaranteeItem}
            >
              <span className={styles.guaranteeIcon}>✓</span>
              {text}
            </li>
          ))}
        </ul>

        {/* ── Divisória ────────────────────────────── */}
        <div className={styles.divider} />

        {/* ── Rodapé ───────────────────────────────── */}
        <div ref={footerRef} className={styles.footer}>
          <p className={styles.copyright}>
            © 2025 Apex Ultra. Todos os direitos reservados.
          </p>
          <nav className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Política de privacidade
            </a>
            <a href="#" className={styles.footerLink}>
              Termos de uso
            </a>
          </nav>
        </div>

      </div>
    </section>
  );
}
