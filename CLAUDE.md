# Apex Ultra — Landing Page de Produto Premium

## Identidade do Projeto
- Produto: Apex Ultra — Notebook Ultrafino Premium
- Tagline: "Redefinindo o que é possível."
- Posicionamento: O notebook mais fino, mais leve
  e mais poderoso já criado
- Objetivo: Case de portfólio demonstrando
  animações de produto premium nível Apple
- URL futura: [url]

## Stack Obrigatória
- Next.js 15, App Router, TypeScript estrito
- CSS Modules exclusivamente — zero Tailwind
- GSAP para todas as animações
- Lenis para scroll suave
- next/image para todas as imagens
- next/font para todas as fontes
- Sem bibliotecas de UI

## Identidade Visual
- Tema: dark exclusivamente
- Fundo base: #050508
- Fundo cards: #0A0A12
- Bordas: #141420
- Texto principal: #E8EEFF
- Texto muted: #8892AA
- Acento azul glacial: #4FC3F7
- Azul claro hover: #81D4FA
- Azul escuro bg: #0D47A1
- Azul translúcido: rgba(79,195,247,0.08)
- Glow azul: 0 0 40px rgba(79,195,247,0.3)

## Tipografia
- Display: Space Grotesk
  (weights: 300, 400, 500, 600, 700)
  Usar em todos os headings e destaques
- Corpo: Inter
  (weights: 300, 400, 500)
  Usar em parágrafos e UI

## Especificações do Produto
- Nome: Apex Ultra
- Espessura: 8.9mm
- Peso: 890g
- Processador: Apex M3 Ultra
- Bateria: 24 horas
- Tela: 14" OLED 120Hz 2880x1800
- RAM: 32GB
- SSD: 1TB NVMe
- Preço: R$ 12.990

## Animação (regras absolutas)
- Todo scroll usa Lenis — nunca scroll nativo
- Todo movimento usa GSAP — nunca CSS transition
  em animações de entrada
- Ease padrão: power3.out
- Duration mínima: 0.6s
- Entradas sempre de baixo para cima: y: 60→0
- Stagger entre elementos: 0.08s
- Nunca bounce, nunca elastic, nunca ease-in-out
- ScrollTrigger.refresh() só após Lenis pronto
- gsap.set() sempre antes de ScrollTrigger
- Pin desabilitado em < 768px

## Lenis + ScrollTrigger
- Inicializar Lenis no providers.tsx
- Conectar ao ScrollTrigger via
  lenis.on('scroll', ScrollTrigger.update)
- NUNCA window.addEventListener('scroll')

## Componentes
- Um componente = um .tsx + um .module.css
- useGSAP com scope obrigatório
- Cleanup no return do useGSAP
- Nenhum estilo inline

## Seções da LP (arquivo único page.tsx)
1. Hero — produto + tagline + CTA
2. Reveal — scroll controla abertura do produto
3. Specs — especificações com parallax
4. Design — detalhes do produto
5. Performance — benchmarks animados
6. Bateria — animação de duração
7. CTA Final — preço e compra

## Efeitos Visuais Obrigatórios
- Glow azul embaixo do produto no hero
- Partículas de luz ao fundo (CSS, não lib)
- Linhas de scan horizontal sutis no fundo
- Reflexo do produto na superfície
- Blur de desfoque em elementos secundários

## SEO
- lang="pt-BR"
- Meta title e description únicos
- OG tags completas
- Canonical correto

## Performance
- Imagens via next/image com WebP
- Fontes via next/font com display: swap
- CSS Modules elimina CSS não usado

## Compatibilidade Mobile e Safari
- ScrollTrigger.refresh() só após Lenis pronto
- gsap.set() sempre antes de ScrollTrigger
- Pin desabilitado em viewport < 768px
- Animações simplificadas em mobile

## O que nunca fazer
- Tailwind de qualquer forma
- Cores hardcoded — sempre var()
- Gradiente roxo
- Animações simultâneas demais
- border-radius > 8px nos elementos principais