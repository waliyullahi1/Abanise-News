module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#164b3b",
        secondary: "#dc352d",
      },
      fontFamily: {
        mermaid: "Mermaid Swash Caps",
      },
    },
  },
  plugins: [],
}