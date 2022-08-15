/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "production",
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    variants: {
        extends: {},
    },
    plugins: [
        require("tailwind-scrollbar"),
        require("tailwind-scrollbar-hide"),
    ],
};
