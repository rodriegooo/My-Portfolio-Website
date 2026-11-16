# 🌐 Personal Portfolio Website

## 📖 Project Overview

This is a single-page responsive portfolio website that started as a lab assignment (HCI Lab: Build and Test a Single-Page Responsive Portfolio) and has since been redesigned with a luxury dark-and-gold look and more interactive features. It showcases my personal information, education and experience, skills, projects, and contact details. It is built using HTML, CSS, and JavaScript.

* URL Link to website portfolio: [Click Here](https://rodriegooo.github.io/My-Portfolio-Website/)
* URL Link to the original website design for desktop & tablet: [Click Here](https://canva.link/yhee58o051e3dhu)
* URL Link to the original website design for mobile: [Click Here](https://canva.link/t8typ3pler8mezf)

## 🎯 Purpose

The goal of this project is to:

* Practice responsive web design using HTML5, CSS3, and JavaScript
* Learn how to structure, style, and organize a single-page website
* Build a professional personal brand that showcases my background, skills, experience, and projects
* Present my interest in Data Science and Quantitative Finance as potential career directions
* Provide recruiters and other visitors with an overview of my profile and a way to contact me

## 👥 Target Audience

This portfolio is designed for:

* Potential employers and recruiters interested in my academic background, technical foundations, and projects
* Academic supervisors and lecturers who want to learn more about my interests and development
* Students and professionals interested in programming, data analysis, and technology

## 🧱 Technologies Used

* HTML5 (semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`)
* CSS3 (Grid, Flexbox, custom properties, media queries, `color-mix()`, `backdrop-filter`, animations, and transitions)
* Vanilla JavaScript (no libraries or frameworks)
* Playfair Display (headings) and Poppins (body text) from Google Fonts
* Icons as inline SVG, kept in one sprite inside `index.html`

## 📐 Layout & Sections

The website includes the following sections:

* Header – Logo mark, navigation menu, language switch, and theme switch
* Home – Typing headline, introduction, buttons (including Download CV), animated stats, and hero photo
* Marquee – Scrolling strip of my main interests
* About Me – Short bio in three tabs (Profile, Experience, What's next)
* Experience & Education – Timeline of my experience and education
* Skills – Technical and non-technical skills
* Featured Project – Project cards with a technology filter and a detail popup
* Contact – Email (click to copy), LinkedIn, and GitHub
* Footer – Copyright

## ✨ Features

**Design**

* Luxury theme: obsidian black with champagne-gold accents in dark mode, and ivory with bronze accents in light mode
* Glass-style cards, a gold gradient on buttons and highlights, and a subtle film-grain texture
* Light and dark mode, saved in the browser and applied before the page paints to avoid a flash

**Interactivity**

* Interactive particle background that reacts to the cursor
* Soft glow that follows the cursor, a spotlight inside each card, 3D tilt on project cards and the hero photo, and magnetic buttons (desktop with a mouse only)
* Typing animation on the headline, animated number counters, and staggered scroll-reveal animations
* Scroll progress bar, active-section highlight in the navigation, and a back-to-top button
* About Me tabs that rotate by themselves until the visitor interacts, and support arrow-key navigation
* Project filter by technology (All, HTML, CSS, Python)
* Project popup with a longer description, what the project demonstrates, technologies used, and a GitHub link
* Click-to-copy email with a confirmation toast

**Language**

* English / Indonesian switch. The choice is saved in the browser. Text is stored in a dictionary in `script.js` and linked to the page with `data-i18n` attributes.

## 📱 Responsiveness

The site is optimized for:

* Desktop
* Tablet
* Mobile

Responsive design is achieved using CSS Grid, Flexbox, media queries, relative units (`em`, `rem`, `%`, `vh`, `vw`), and `clamp()` for fluid text and spacing.

* **Desktop:** two-column hero, horizontal navigation, and three-column project grid.
* **Tablet (up to 64em, about 1024px):** project grid becomes two columns.
* **Mobile (48em or smaller, about 768px):** one-column layout. The language button, theme button, and menu button sit side by side in the top bar. The navigation opens as an animated drop-down menu, and the cursor effects are turned off.
* The page width is locked to the screen width, so decorative elements never cause sideways scrolling.

## 🎨 UI/UX Considerations

* **Readable colors:** text and background colors were checked with the WCAG contrast ratio. In dark mode, main text on the background is 17.2:1, muted text is 7.6:1, gold text is 9.9:1, and dark text on gold buttons is 9.2:1. In light mode, main text is 15.7:1, muted text is 5.4:1, gold text is 5.4:1, and light text on gold buttons is 5.8:1. The minimum recommended for normal text is 4.5:1.
* **Distinct controls:** the GitHub button in the project popup is a wide bar with an icon, so it is not confused with the small pill-shaped technology tags.
* **Navigation:** the menu stays at the top on desktop, section titles are not hidden under it when a link is clicked, the current section is highlighted, and there is a visible outline when navigating with the keyboard (Tab key). The project popup traps focus and closes with the Escape key.
* **Accessibility:** buttons have labels in both languages, the About tabs use `tablist` roles, and the headline keeps a plain-text label for screen readers.
* **Reduced motion:** if the visitor's system asks for reduced motion, animations, the particle movement, the typing effect, and the marquee are turned off.
* **Readability:** the text is left-aligned instead of justified, so the spacing between words stays even in narrow cards.
* **Feedback:** buttons, cards, tags, and links have hover effects with smooth transitions, so users can see what is clickable.

## 🧪 How to Run Locally

1. Open your code editor (e.g., Visual Studio Code, etc.).
2. In your code editor, open the terminal.
3. Clone the repository:

```
git clone https://github.com/rodriegooo/My-Portfolio-Website
```

4. Open index.html in your browser, or run the website locally using the Live Server Extension.

An internet connection is needed to load the Playfair Display and Poppins fonts from Google Fonts.

## 📂 Folder Structure

```
portfolio-website/
│
├── index.html
├── style.css
├── script.js
├── images/
├── files/
│   └── CV - Alfonsus Rodrigo Haryoko.pdf
└── README.md
```

## 🛠️ Editing the Content

* **Text:** English text is written in `index.html` and in the `en` part of the `I18N` dictionary in `script.js`. When you change a sentence, change it in both places and update the Indonesian version too.
* **Project popups:** the longer descriptions are in the `PROJECTS` list in `script.js`, in the same order as the cards in `index.html`.
* **Colors:** all colors are CSS variables at the top of `style.css` (`:root` for dark mode and `:root[data-theme="light"]` for light mode).
* **CV:** put the PDF in the `files/` folder and keep the file name, or change the link in the Download CV button in `index.html`.

## 📄 Notes

* I designed the first layout and color scheme myself before coding.
* I used Claude (AI) to help write some complex HTML and CSS code so it matches my design. After that, I asked it to improve the design using UI/UX principles (project card colors, navigation, and readability), and later to redesign the website with a luxury gold theme and more interactive features. I also edited and fixed parts of the code myself.
* I wrote the content of the website (about me, experience, skills, and project descriptions) myself.

## 📸 Screenshots

Screenshots of the original (teal) version:

My Portfolio Website on Desktop & Tablet:
<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/0f1db061-4195-4f39-9761-d78f491a247c" />

My Portfolio Website on Mobile:
<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/b9821353-4a51-40a4-8905-18244c5edcd8" />

Original website design:

Desktop & Tablet:
<img width="1440" height="4000" alt="Desktop - HCI LAB Build and Test a Single-Page Responsive Portfolio (4)" src="https://github.com/user-attachments/assets/483a5163-3b6e-4d6b-baf0-2b039371b4fd" />

Mobile:
<img width="360" height="1550" alt="Mobile - HCI LAB Build and Test a Single-Page Responsive Portfolio (1)" src="https://github.com/user-attachments/assets/c0c8eedd-b758-4dd0-90a0-4d8d310c03e1" />