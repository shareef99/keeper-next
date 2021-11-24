const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: "var(--blue)",
                darkBlue: "var(--dark-blue)",
                lightBlue: "var(--light-blue)",
                cream: "var(--cream)",
                brown: "var(--brown)",
                lightBrown: "var(--light-brown)",

                gray: "var(--gray)",
                grayShade: "var(--gray-shade)",
                gray200: "var(--gray-200)",
                lightBlackShade: "var(--light-black-shade)",
                yellow: "var(--yellow)",
                yellow200: "var(--yellow-200)",
                yellow300: "var(--yellow-300)",
                yellow400: "var(--yellow-400)",
                shadowDark: "var(--shadow-dark)",
                shadowLight: "var(--shadow-light)",
                white: "var(--white)",
            },
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
        container: {
            padding: "2rem",
            center: true,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
