/*  ========================================================================
    # Astro
    ========================================================================  */

import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      BACKEND_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'http://localhost:3000'
      })
    }
  }
});
