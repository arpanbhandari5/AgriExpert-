🌾 Agri Expert — AI-Powered Agricultural Intelligence for Nepal
Hackathon Tracks:

Artificial Intelligence | Sustainability & Climate Tech | HealthTech & Wellbeing

🚀 Elevator Pitch

Agri Expert is an AI-powered digital companion designed to safeguard the livelihoods of rural farmers in Gandaki Province, Nepal. By combining cutting-edge Artificial Intelligence with indigenous farming wisdom, Agri Expert helps farmers:

Diagnose crop diseases instantly

Adapt to climate uncertainty

Maximize market profits

Access critical insights even with low or no internet

Agri Expert is built to empower the backbone of Nepal’s economy—its farmers.

❗ The Problem

Farmers in Nepal face three major threats:

🌱 1. Crop Diseases

Late Blight, Bacterial Wilt, Rice Blast, and other diseases destroy up to 40% of yield each year due to late or inaccurate diagnosis.

🌦 2. Climate Uncertainty

Unpredictable rainfall, frost events, and shifting seasons make traditional calendars unreliable.

💸 3. Market Exploitation

Without access to real-time market information, farmers often sell crops at loss.

✅ The Solution — Agri Expert

A mobile-first, AI-powered, offline-friendly web application that acts as a complete agricultural decision-support system.

🧠 Core Features
🦠 1. AI Crop Doctor (Vision)

Powered by Google Gemini 2.5 Vision, farmers can upload a photo of a crop to:

Detect diseases

Identify severity

Get treatment steps using locally available inputs

Understand cause and prevention methods

✨ Innovation Highlight:

Save Analysis Card — Generates a digital pamphlet (image format) of the diagnosis so farmers can store treatment steps offline in their gallery.

📈 2. Market Mandi (Intelligence)

Smart visualizations of price trends for major crops like:

Rice

Potato

Maize

✨ Innovation Highlight:

AI Market Advisor
Analyzes historical trends + seasonal patterns and advises:

Sell Now

Hold for Better Price

Additional Offline Tech:
Uses LocalStorage caching to display the last known price even without internet.

🌤️ 3. Climate & Culture (Smart Agro Advisory)

Combines:

Hyper-local real-time weather

Indigenous Nepali Calendar (e.g., Mangsir, Bhadra)

Altitude-based farming practices

Outputs example insights like:

“🌨 Frost alert in your area — cover seedlings tonight.”

“🌱 Ideal time to transplant tomatoes at your altitude.”

🗣️ 4. Inclusive & Human-Centered Design

Audio Assistant reads out important alerts for low-literacy farmers

Personalized settings (farm altitude, crop focus)

Clear icons for accessibility

Offline-ready workflows

🏗 Technology Stack
Frontend

React + TypeScript

Tailwind CSS

Lucide Icons

Recharts

AI Engine

Google Gemini API (gemini-2.5-flash)
Used for:

Vision disease detection

Market reasoning

Agricultural recommendations

Offline & Utility Tech

LocalStorage Caching

HTML2Canvas (Save Analysis Card)

Responsive, mobile-first design

🌍 Impact

Agri Expert delivers measurable benefits:

Reduces crop loss through early detection

Cuts unnecessary pesticide use by providing disease-specific treatment

Increases farmer income through AI-guided market timing

Improves climate resilience using altitude-based and seasonal insights

It is more than an app—
it is a lifeline for sustainable agriculture in Nepal.Rule Compliance Statement (Hackathon Safe)

Built Fresh:
All code was created during the SNOW FEST Hackathon timeline.

AI Usage Disclosure:
Project uses Google Gemini API for multimodal analysis (Vision + Text).
Code generation assistance used: Google AI Studio & Vercel V0.

Originality:
All Nepal-specific agricultural logic and UI flows are original to this project.

Safe Content:
No copyrighted assets, paid data, or restricted datasets are used.

👤 Team

Developer: Arpan Bhandari
(AgriTech & AI Enthusiast | Nepal)
Developer:Anjeela Bhandari

⭐ Special Thanks

Google AI Studio

SNOW FEST Hackathon Team

Nepali farmers who inspired the solution
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Mu_JWRy8W_NytqoCs3Tn6NsfrpKrWLF0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
