# Webtera | Digital Transformation & Teknoloji Ofisi

Webtera teknoloji ofisi — On yılı aşkın altyapı tecrübesiyle estetik web tasarımını birleştiren, uçtan uca dijital süreç yönetimi sunan kurumsal web sitesi.

## İletişim Formu (Formspree)

Mesaj formunun çalışması için [formspree.io](https://formspree.io) üzerinden form oluşturup `src/components/ContactFormButton.tsx` dosyasındaki `FORMSPREE_ENDPOINT` değerini güncelleyin:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

`YOUR_FORM_ID` yerine formspree.io'dan aldığınız form ID'nizi yapıştırın.

## Kurulum

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
git push
```

GitHub Actions ile otomatik deploy yapılır. Site: https://tugaytulgar.github.io/webtera/
