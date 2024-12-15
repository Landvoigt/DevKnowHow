module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'default-to': '#172c06',
        'default-from': '#01071d',

        'welcome-to': '#3a0b4f',
        'welcome-from': '#000510',

        'nav-to': '#08490d',
        'nav-from': '#077c91',
      },
      colors: {
        aliceblue: '#f0f8ff',
        
        defaultColor: 'rgb(29, 29, 29)',
        accentColorOld: '#7400c2',
        accentColor: 'rgb(0, 130, 194)',
        accentColorHoverOld: '#aa42f0',
        accentColorHover: 'rgb(71 174 225)',

        textColorPrimary: 'rgb(240, 248, 255)',
        textColorSecondary: 'rgb(240, 248, 255)',
        textColorHover: 'rgb(207 135 255)',
        textColorVariable: '#32ff7c',

        borderColorPopup: '#e3d9ffb8',
        borderColorLight: '#e5e7eb38',
        borderColorVideoBox: 'rgba(241, 248, 253, 0.2)',

        bgCopyIcon: '#01071d',
        borderCopyIcon: '#edededd6',

        tableBgSecondary: 'rgba(240, 248, 255, 0.05)',

        inputColorFocus: '#2528eb',

        navColorHover: 'rgb(186 213 255 / 44%)',

        greyTransparent: '#9f9f9fa3',
        greyTransparentHover: '#dbdbdbe0',

        videoflixRed: '#d90505',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.75)',
        },
        '.text-shadow-md': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.75)',
        },
        '.text-shadow-lg': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 1)',
        },
        '.text-shadow-xl': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 1)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      });
    },
  ],
}