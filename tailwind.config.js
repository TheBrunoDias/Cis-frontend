/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },

      textColor: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },

      backgroundColor: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },

      borderColor: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },

      fill: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },

      ring: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },
      shadow: {
        'primary-100': 'var(--color-primary-100)',
        'primary-50': 'var(--color-primary-50)',
        'primary-30': 'var(--color-primary-30)',

        'secondary-100': 'var(--color-secondary-100)',
        'secondary-50': 'var(--color-secondary-50)',
        'secondary-30': 'var(--color-secondary-30)',

        'dark-darker': 'var(--color-dark-darker)',
        'dark-main': 'var(--color-dark-main)',
        'dark-lighter': 'var(--color-dark-lighter)',

        'light-darker': 'var(--color-light-darker)',
        'light-main': 'var(--color-light-main)',
        'light-lighter': 'var(--color-light-lighter)',
      },
    },
  },
  plugins: [],
};
