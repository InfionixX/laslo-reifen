/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#FF5722', // Vibrant Orange
                    dark: '#0a0a0a',   // Almost Black
                    gray: '#1f1f1f',   // Dark Gray
                    light: '#f3f4f6'
                }
            },
            fontFamily: {
                sans: ['Barlow', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
