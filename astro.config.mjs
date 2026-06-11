// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain (Namecheap), served at the domain root — so no `base` path.
// public/CNAME tells GitHub Pages which domain to serve. If you ever revert to
// the github.io project URL, restore `base: '/aurelcreative'` and set `site`
// back to https://epf10.github.io.
export default defineConfig({
  site: 'https://aurelcreative.com',
});
