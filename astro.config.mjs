// @ts-check
import { defineConfig } from 'astro/config';
import { defaultLocale, locales } from "./src/locales.ts";

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale,
        // @ts-ignore
        locales: locales
    },
    build:{
        format: 'file'
    }
});
