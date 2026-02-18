# Webtera | Digital Transformation & AI Solutions

Webtera teknoloji ofisi — On yılı aşkın altyapı tecrübesiyle estetik web tasarımını birleştiren, uçtan uca dijital süreç yönetimi sunan kurumsal web sitesi.

## Gereksinimler

- Node.js 20+
- npm

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Build & Deploy

```bash
npm run build
```

Statik export `out/` klasörüne çıkar. GitHub Actions ile otomatik deploy için `main` branch'e push yapın.

### GitHub Pages Alt Klasör

Repo `username.github.io/tugay` gibi bir alt path'te yayınlanacaksa, `next.config.ts` içine ekleyin:

```ts
basePath: "/tugay",
assetPrefix: "/tugay/",
```

## Proje Yapısı

- `src/app/` — Sayfalar ve layout
- `src/components/` — Navbar, Hero, About, Services, CaseStudies, Footer
