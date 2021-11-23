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
