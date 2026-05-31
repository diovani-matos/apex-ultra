# Apex Ultra

> Landing page de produto premium desenvolvida para portfólio. Projeto fictício de um notebook ultrafino de alto desempenho.

🔗 **Demo:** https://apexultra.vercel.app

---

## Sobre o Projeto

O Apex Ultra é uma landing page de produto desenvolvida com foco em animações sofisticadas, performance e experiência de scroll imersiva. O objetivo foi simular o nível de qualidade visual de marcas como Apple e Razer, utilizando tecnologias modernas do ecossistema React/Next.js.

---

## Stack

- **Next.js 15** — App Router, SSR, Image Optimization
- **TypeScript** — tipagem estática em todo o projeto
- **CSS Modules** — estilos escopados por componente
- **GSAP + ScrollTrigger** — animações e scroll
- **Lenis** — scroll suave

---

## Seções

| Seção | Descrição |
|---|---|
| Hero | Entrada animada com imagem em destaque |
| Reveal | Scroll em 3 painéis com pin e parallax |
| Specs | 6 cards com contadores animados |
| Design | ScrollCamera com troca de imagens suave |
| Performance | Benchmarks com barras animadas |
| Battery | Anel SVG com contador regressivo |
| CTA | Preço animado e botões de conversão |

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Metadata global, fontes
│   ├── page.tsx            # Composição das seções
│   ├── not-found.tsx       # Página 404 customizada
│   ├── sitemap.ts          # Sitemap automático
│   └── robots.ts           # Robots.txt
├── components/
│   ├── header/             # Navegação com âncoras
│   └── sections/
│       ├── hero/           # Seção Hero
│       ├── reveal/         # Seção Reveal
│       ├── specs/          # Seção Specs
│       ├── design/         # Seção Design
│       ├── performance/    # Seção Performance
│       ├── battery/        # Seção Battery
│       └── cta/            # Seção CTA
└── styles/
    └── globals.css         # Tokens de design (CSS vars)
```

---

## Funcionalidades

- **Animações com GSAP** — entrada por scroll, stagger, parallax e pin em todas as seções
- **Contadores animados** — valores numéricos que animam ao entrar na viewport
- **ScrollCamera** — seção Design com scroll pinado e troca de imagens com crossfade suave
- **Anel SVG animado** — bateria com progresso circular e contador central
- **Scroll suave** — Lenis integrado com ScrollTrigger em toda a página
- **Prefers-reduced-motion** — animações desativadas para quem prefere menos movimento
- **SEO completo** — metadata, OpenGraph, Twitter Card, sitemap e robots.txt
- **Headers de segurança** — configurados via next.config.ts
- **Totalmente responsivo** — mobile, tablet e desktop

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar build de produção
npm start
```

Acesse http://localhost:3000

---

## Design System

Todas as cores, tipografia e espaçamentos são controlados via CSS custom properties definidas em `globals.css`:

```css
--color-bg          /* fundo principal */
--color-bg-card     /* fundo dos cards */
--color-text        /* texto principal */
--color-muted       /* texto secundário */
--color-accent      /* azul de destaque */
--color-border      /* bordas e divisórias */
--font-display      /* fonte dos títulos */
--container-max     /* largura máxima */
--container-padding /* padding lateral */
```

---

## Deploy

Projeto hospedado na **Vercel** com deploy automático a cada push na branch main.

---

## Licença

Projeto fictício desenvolvido para fins de portfólio. Todos os dados, preços e especificações são fictícios.
