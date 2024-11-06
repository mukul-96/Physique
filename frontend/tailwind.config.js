
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		screens: {
		md1200: { max: "1200px" },
		md1000: { max: "1000px" },
		min800: { max: "800px" },
		min620: { max: "620px" },
		min540: { max: "540px" },
		min450: { max: "450px" },
		min375: { max: "375px" },
	  },
  		backgroundImage: {
  			'login-image': 'url(/src/utilities/images/loginImg.jpg)',
  			athlete2: 'url(/src/utilities/images/athlete.png)',
  			athlete1: 'url(/src/utilities/images/athlete2.png)',
  			mangercard: 'url(/src/utilities/images/managerCard.jpg)',
  		},
		 
  		colors: {
  			'login-bg': '#D6D6E7',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			  'custom-blue': '#aab5ef',
			  'custom-blue2': '#98bcf7',
			  'custon-orange':'#f3856a',
			  'custom-brown':'#4f2632',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
	
  },
  plugins: [require("tailwindcss-animate")],
}