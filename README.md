# Creative Collaboration Platform – Dashboard

🔗 **Live Demo:** https://celis-dashboard.vercel.app/dashboard

---

# Overview

The **Creative Collaboration Platform Dashboard** is a modern web application built for professionals in the music and creative industry. It provides a centralized environment where creators such as **songwriters, producers, musicians, visual artists, and industry professionals** can connect, collaborate, and manage creative projects.

The platform allows users to build professional profiles, discover creators, share creative work, apply to industry briefs, manage collaborative projects, and monetize digital assets through an integrated marketplace.

The goal of the system is to streamline the creative workflow from **idea generation → collaboration → project execution → monetization**.

---

# Key Features

### User Authentication
- Secure user registration and login
- Multi-step signup process
- Google and Apple sign-in support
- Password recovery using OTP verification

### Profile & Creative Identity
Users can create detailed profiles including:
- Display name
- Bio
- Location
- Profile image
- Creative roles
- Genres
- Skills and expertise
- Portfolio links
- Social media links

---

# Dashboard Modules

## Home
The home dashboard provides a quick overview of user activity including:
- Profile views
- Collaborations
- Active briefs
- Uploaded works
- Profile completion percentage
- Suggested creators
- Trending users
- Industry briefs and active projects

---

## Discover
The Discover section helps users find other creators.

Features include:
- Creator search
- Role-based filtering
- Genre filtering
- Creator tier filtering
- Sorting by popularity, relevance, and newest

Users can:
- Send connection requests
- Accept or reject requests
- Message connected creators

---

## Feed
The Feed allows users to share and discover creative content.

Post types include:
- Lyrics
- Audio
- Video
- Photos

Users can:
- React to posts
- Comment
- Share
- Bookmark content
- Report or hide posts

Creators can also mark their posts as **available for collaboration**.

---

## Briefs
The Briefs section connects creators with industry opportunities.

Users can:
- Browse industry briefs
- View detailed requirements
- Submit applications
- Upload audio submissions
- Write cover letters
- Attach portfolio links

Creators can also **publish their own briefs** with:
- Budget or compensation
- Project roles
- Requirements
- Deliverables
- Submission deadlines

---

## Projects
After brief deadlines pass, accepted submissions are converted into **collaborative projects**.

Project features include:
- Collaborator management
- File uploads
- Lyrics sharing
- Comment discussions
- Revenue split management
- Progress tracking

Project owners can invite collaborators and assign roles such as:
- Owner
- Admin
- Collaborator
- Viewer

---

## Marketplace
The Marketplace allows creators to sell digital assets.

Supported assets include:
- Beats / Tracks
- Lyrics
- Sample packs
- Visual assets

Features include:
- Asset preview
- License purchasing
- Stripe payment integration
- Download purchased assets
- Earnings tracking

Users can sell assets under:
- **Exclusive licenses**
- **Non-exclusive licenses**

---

## Sparks Sessions
Sparks Sessions enable **real-time collaboration** between creators.

Features include:
- Session creation
- Invite participants
- Share session links
- Live chat
- File sharing
- Emoji reactions

Sessions can be ended by the host at any time.

---

## Settings
Users can manage their accounts through multiple settings sections:

- Profile management
- Account credentials
- Payment methods
- Subscription plans
- Storage usage
- Notification preferences
- Security settings
- Two-factor authentication
- Active session tracking

---

# Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Authentication:** Token-based authentication
- **Payments:** Stripe Integration

---

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev