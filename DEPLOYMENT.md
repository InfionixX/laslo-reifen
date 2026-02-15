# Deployment Guide for Laslo Reifen

This project is built with React + Vite and is configured for deployment on standard Apache hosting environments like Strato.

## Prerequisites

- Node.js (v18+)
- npm

## Building for Production

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Build the Project:**
    ```bash
    npm run build
    ```
    This command compiles the application into the `dist/` directory.

## Deploying to Strato

1.  **Connect to your Webspace:**
    Use an FTP client (like FileZilla) to connect to your Strato webspace.

2.  **Upload Files:**
    Upload the **entire contents** of the `dist/` folder to your public directory (e.g., `public_html/` or `/`).

3.  **Verify Files:**
    Ensure the following files are present in the root of your webspace:
    - `index.html`
    - `assets/` (folder containing JS/CSS)
    - `.htaccess` (Critical for routing)
    - `send_mail.php` (Critical for contact form)

## Server Configuration (.htaccess)

The `.htaccess` file is automatically included in the `public/` folder and copied to `dist/` during build. It handles:
- **SPA Routing:** Redirects all requests to `index.html` so React Router can handle them.
- **Security:** Basic security headers.

## Email Configuration (send_mail.php)

The `send_mail.php` script handles contact form submissions.
- **Destination Email:** By default, it sends to `info@laslo-reifen.de`.
- **Sender:** It uses `noreply@laslo-reifen.de` as the sender to avoid spam filters. Ensure this email alias exists or is allowed on your Strato package.

## Troubleshooting

-   **404 on Refresh:** If refreshing a sub-page gives a 404, check if `.htaccess` was uploaded correctly.
-   **Email not sending:** Check the PHP error logs on Strato. Ensure the `mail()` function is enabled.
-   **Styling missing:** Ensure the `assets/` folder was uploaded and permissions are correct (755 for folders, 644 for files).
