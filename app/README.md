# Laslo Reifen Website (Modern React)

This is the modern React rewrite of the Laslo Reifen website, replacing the legacy HTML/jQuery version.

## Key Features

- **Modern Tech Stack:** React, TypeScript, Vite, Tailwind CSS.
- **Performance:** Fast loading times, optimized assets, smooth animations (Framer Motion).
- **Internationalization (i18n):** Full support for German (DE) and Hungarian (HU).
- **Responsive Design:** Mobile-first approach, looks great on all devices.
- **Features:**
    - Interactive 3D-style Tire & Rim showcases.
    - Contact Form with PHP backend integration.
    - Live Chat Widget (Mockup/JSON-based).
    - Legal Modals (Impressum, Datenschutz).

## Project Structure

```
/src
  /components   # Reusable UI components (Navbar, Footer, Hero, Services, etc.)
  /context      # React Context (ModalContext)
  /pages        # Page components (Home, etc.)
  /locales      # Translation files (if extracted later)
  i18n.ts       # i18n configuration
  index.css     # Global styles & Tailwind
  main.tsx      # Entry point
/public
  .htaccess     # Apache configuration
  send_mail.php # PHP Mailer script
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## Credits

Re-developed by Google Deepmind Agent.
Original Logic preserved where applicable.
