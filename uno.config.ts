import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['primary-btn', 'inline-block  cursor-pointer bg-gradient-to-r from-[#5eb6d2] to-[#8029e8] text-white border-none transform transition-transform hover:scale-105 !hover:c-pink active:scale-95'],
    ['theme-color', 'bg-[#010101]'],
    ['primary-color', 'bg-gradient-to-r from-[#5eb6d2] to-[#8029e8]'],
    ['primary-text', 'bg-gradient-to-r from-[#5DC1D1] to-[#8B1DEB]  bg-clip-text text-transparent mix-blend-screen font-700'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})
