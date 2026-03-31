# resume-bios

BIOS-style resume website built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

This project is a resume website designed as a retro BIOS interface. It presents a professional profile as an interactive one-page experience instead of a traditional static CV.

The current version is a personal resume site for Vladimir Gordeev, focused on Linux system administration and DevOps-oriented engineering.

## What The Site Is

The site is a web-based resume. Its goal is to showcase experience, skills, projects, education, and contact information in a more distinctive format than a standard document.

Instead of using a typical portfolio layout, the interface imitates an old BIOS screen with a boot sequence, high-contrast colors, and keyboard-like navigation.

## How It Works

The site is built as a single-page Next.js application. All resume content is stored directly in [`pages/index.tsx`](./pages/index.tsx) as structured arrays for profile data, work experience, skills, cases, education, and contacts.

The visual style is defined in [`styles/globals.css`](./styles/globals.css), where the BIOS color palette, borders, scanlines, flicker effect, and interface elements are configured.

A local font, [`NDS-Bios.ttf`](./public/fonts/NDS-Bios.ttf), is loaded through `next/font/local` in [`pages/_app.tsx`](./pages/_app.tsx) to preserve the retro look.

The page first shows a boot-style intro animation, then switches to the main resume screen with section buttons and keyboard navigation between content blocks.
