import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				dark: "hsl(var(--primary-dark))",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				dark: "hsl(var(--secondary-dark))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			footer: {
  				bg: "hsl(var(--footer-bg))",
  				text: "hsl(var(--footer-text))",
  			},
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		},
  		fontFamily: {
  			sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
  		},
  		fontSize: {
  			'xs': '0.75rem',
  			'sm': '0.875rem',
  			'base': '1rem',
  			'lg': '1.25rem',
  			'xl': '2rem',
  		},
  		lineHeight: {
  			'tight': '1.2',
  			'normal': '1.6',
  			'relaxed': '1.8',
  		},
  		fontWeight: {
  			normal: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
