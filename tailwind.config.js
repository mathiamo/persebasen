/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'tw-',
    mode: 'jit', // Add this line to enable Just-in-Time (JIT) mode
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        "./public/**/*.html",
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {},
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}

