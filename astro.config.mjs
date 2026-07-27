// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tamplierautosourcing.fr',
  // FR par défaut à la racine (/), anglais sous /en/. Pas de préfixe pour la langue
  // par défaut → l'URL FR reste propre (bon pour le référencement historique).
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Enable modern formats via sharp (default service)
    responsiveStyles: true,
  },
});
