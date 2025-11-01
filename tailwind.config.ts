import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: {
					DEFAULT: 'hsl(var(--border))',
					light: 'hsl(var(--border-light))',
					dark: 'hsl(var(--border-dark))'
				},
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				app: {
					bg: 'var(--app-background)',
					fg: 'var(--app-foreground)',
					border: 'var(--app-border)'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'hsl(var(--foreground))',
						h1: {
							color: 'hsl(var(--foreground))',
							marginTop: '2.5rem',
							marginBottom: '1.5rem',
						},
						h2: {
							color: 'hsl(var(--foreground))',
							marginTop: '2.5rem',
							marginBottom: '1.5rem',
						},
						h3: {
							color: 'hsl(var(--foreground))',
							marginTop: '2rem',
							marginBottom: '1rem',
						},
						p: {
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
							lineHeight: '1.75',
						},
						li: {
							marginTop: '0.75rem',
							marginBottom: '0.75rem',
						},
						'ul > li': {
							paddingLeft: '1.75em',
						},
						'ol > li': {
							paddingLeft: '1.75em',
						},
						blockquote: {
							fontStyle: 'italic',
							color: 'hsl(var(--muted-foreground))',
							borderLeftColor: 'hsl(var(--border))',
						},
						'blockquote p:first-of-type::before': {
							content: 'none',
						},
						'blockquote p:last-of-type::after': {
							content: 'none',
						},
						code: {
							color: 'hsl(var(--foreground))',
							backgroundColor: 'hsl(var(--muted))',
							borderRadius: '0.25rem',
							padding: '0.2em 0.4em',
							fontWeight: '400',
						},
						pre: {
							backgroundColor: 'hsl(var(--muted))',
							code: {
								backgroundColor: 'transparent',
								padding: '0',
							},
						},
						hr: {
							borderColor: 'hsl(var(--border))',
							marginTop: '3rem',
							marginBottom: '3rem',
						},
						table: {
							fontSize: '0.875rem',
							lineHeight: '1.7142857',
						},
						thead: {
							borderBottomColor: 'hsl(var(--border))',
						},
						'thead th': {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							backgroundColor: 'hsl(var(--muted))',
						},
						'tbody tr': {
							borderBottomColor: 'hsl(var(--border))',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
					},
				},
			},
		}
	},
	plugins: [animate, typography({
			className: 'prose',
		}),
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'hsl(var(--foreground))',
						h1: {
							color: 'hsl(var(--foreground))',
							marginTop: '2.5rem',
							marginBottom: '1.5rem',
						},
						h2: {
							color: 'hsl(var(--foreground))',
							marginTop: '2.5rem',
							marginBottom: '1.5rem',
						},
						h3: {
							color: 'hsl(var(--foreground))',
							marginTop: '2rem',
							marginBottom: '1rem',
						},
						p: {
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
							lineHeight: '1.75',
						},
						li: {
							marginTop: '0.75rem',
							marginBottom: '0.75rem',
						},
						'ul > li': {
							paddingLeft: '1.75em',
						},
						'ol > li': {
							paddingLeft: '1.75em',
						},
						blockquote: {
							fontStyle: 'italic',
							color: 'hsl(var(--muted-foreground))',
							borderLeftColor: 'hsl(var(--border))',
						},
						'blockquote p:first-of-type::before': {
							content: 'none',
						},
						'blockquote p:last-of-type::after': {
							content: 'none',
						},
						code: {
							color: 'hsl(var(--foreground))',
							backgroundColor: 'hsl(var(--muted))',
							borderRadius: '0.25rem',
							padding: '0.2em 0.4em',
							fontWeight: '400',
						},
						pre: {
							backgroundColor: 'hsl(var(--muted))',
							code: {
								backgroundColor: 'transparent',
								padding: '0',
							},
						},
						hr: {
							borderColor: 'hsl(var(--border))',
							marginTop: '3rem',
							marginBottom: '3rem',
						},
						table: {
							fontSize: '0.875rem',
							lineHeight: '1.7142857',
						},
						thead: {
							borderBottomColor: 'hsl(var(--border))',
						},
						'thead th': {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							backgroundColor: 'hsl(var(--muted))',
						},
						'tbody tr': {
							borderBottomColor: 'hsl(var(--border))',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
					},
				},
			},
		},
	},
} satisfies Config;
