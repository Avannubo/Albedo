/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '475px',    // Custom breakpoint for small screens
        'sm': '768px',    // Default small screen
        'md': '768px',    // Default medium screen
        'lg': '1024px',   // Default large screen
        'xl': '1280px',   // Default extra large screen
        '2xl': '1536px',  // Default 2x extra large screen
        // Custom example
        'custom': '1600px',  // A custom breakpoint at 1600px
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
