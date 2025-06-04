Welcome to my personal portfolio website! This site showcases my projects, skills, and contact information, all built with modern web technologies for a fast and responsive experience.

## About the Site

This portfolio is built using **React** and **Vite** for a lightning-fast development experience, styled with **Tailwind CSS**, and enhanced with smooth animations via **Framer Motion**. The site is fully responsive, supports dark and light modes, and is deployed automatically to **GitHub Pages** using **GitHub Actions**.

### Key Features

- **Responsive Design:** Looks great on all devices.
- **Smooth Animations:** Powered by Framer Motion.
- **Scroll-to-Top Button:** For easy navigation.
- **Contact Form:** Send me a message via EmailJS.
- **Social Links:** Connect with me on various platforms.
- **Project Showcases:** Links to my GitHub repos and live demos.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Animations:** Framer Motion
- **Contact Form:** EmailJS
- **Hosting & Deployment:** GitHub Pages, GitHub Actions

## Getting Started

To run this project locally, follow these steps:

```sh
git clone https://github.com/MurungaOwen/portfolio.git
```
```sh
cd portfolio
```
```sh
npm install
```

```sh
npm run dev
```

Open your browser and visit: [http://localhost:5173/portfolio/](http://localhost:5173/portfolio/)

> **Tip:** You can copy any command above with the copy button in the top right corner of each code block on GitHub.

## Deployment

Deployment is automated with GitHub Actions. On every push to the `main` branch, the site is built and deployed to the `gh-pages` branch.

To manually deploy:

```sh
npm run deploy
```

> **Note:** Ensure your Vite config has the correct `base` path (your repo name) for GitHub Pages.

## Project Structure

- `src/` – Main source code
  - `components/` – Reusable React components
  - `pages/` – Site pages
  - `styles/` – Global styles
  - `utils/` – Utility functions
- `public/` – Static assets
- `dist/` – Production build output
- `README.md` – Project documentation

---

Feel free to explore the code, check out my projects, and get in touch!
