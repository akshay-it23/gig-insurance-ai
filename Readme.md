
# 🛡️ GigShield — AI-Powered Parametric Insurance for India's Gig Workers

**Comprehensive Insurance & Risk Management Platform for Gig Workers**

GigShield is an innovative AI-powered parametric insurance and risk management solution designed specifically for India's gig economy workers. The platform leverages machine learning to automatically detect real-world disruptions and deliver instant income protection — **no paperwork, no claims filing, instant payouts.**

---

## 🎯 Problem Statement

India's platform-based delivery partners (Zomato, Swiggy, Zepto, Amazon, Dunzo) lose **20–30% of their monthly earnings** due to external disruptions like extreme weather, pollution, and sudden curfews. They have **zero income protection** against these uncontrollable events.

## 💡 Our Solution

GigShield automatically detects disruption events using live data APIs and pays gig workers for lost income the moment a trigger is crossed — removing the burden of filing claims entirely.

---

## ✨ Key Features

- **AI-Powered Risk Assessment**: Machine learning models analyze work patterns, zones, and seasonal data to predict and price risk
- **Parametric Auto-Claims**: Income protection triggers fire automatically when thresholds are breached — no manual claim needed
- **Personalized Premiums**: Weekly premiums calculated dynamically based on zone risk, season, and claim history
- **Fraud Detection**: Multi-signal fraud engine using GPS validation, weather cross-referencing, and peer comparison
- **Real-Time Dashboard**: Workers monitor active coverage, claim history, and earnings protection in one place
- **Admin Analytics**: Loss ratios, risk heat-maps, and fraud alerts for platform operators

---

## 📋 Parametric Triggers (Auto-Claim Events)

| # | Trigger | Data Source | Threshold | Payout |
|---|---------|-------------|-----------|--------|
| 1 | **Heavy Rainfall** | OpenWeatherMap API | > 50 mm/hr | ₹150–300/day |
| 2 | **Extreme Heat** | OpenWeatherMap API | > 45°C | ₹100–200/day |
| 3 | **Severe Air Pollution** | AQICN / OpenAQ API | AQI > 400 | ₹100–200/day |
| 4 | **Flooding / Waterlogging** | Weather + News API | Flood alert active | ₹200–400/day |
| 5 | **Unplanned Curfew / Bandh** | News API / Manual trigger | Official announcement | ₹150–300/day |

---

## 💰 Weekly Premium Model

```
Weekly Premium = Base Rate × Zone Risk Multiplier × Season Factor × Claim History Factor
```

| Factor | Description | Example |
|--------|-------------|---------|
| **Base Rate** | Starting weekly premium | ₹29/week |
| **Zone Risk** | Historical disruption data for worker's area | Mumbai (flood-prone) = 1.4× |
| **Season Factor** | Monsoon vs Summer vs Winter | Monsoon = 1.5×, Winter = 0.8× |
| **Claim History** | Discount for workers with fewer claims | No claims in 4 weeks = 0.85× |

**Example** — A Zomato rider in Mumbai during monsoon:
```
₹29 × 1.4 × 1.5 × 1.0 = ₹60.90/week ≈ ₹61/week
```
**Coverage**: Up to ₹1,500/week in lost income protection.

---

## 🏗️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Context API |
| **Backend** | Node.js, Express.js, MongoDB (Atlas), JWT |
| **AI/ML** | Python, scikit-learn, TensorFlow Lite |
| **APIs** | OpenWeatherMap, AQICN, NewsAPI |
| **Payments** | Razorpay (test mode / simulated) |
| **Auth** | JWT + OTP-based login |
| **Hosting** | Vercel (Frontend) + Render/Railway (Backend) |

---

## 🗂️ Project Structure

```
guideware/
├── client/                    # React Frontend Application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components (Dashboard, Policies, etc.)
│   │   ├── services/          # API call functions
│   │   ├── context/           # React context (auth, theme, user data)
│   │   └── utils/             # Helper functions & utilities
│   └── public/                # Static assets
│
├── server/                    # Node.js/Express Backend API
│   ├── routes/                # API endpoint routes
│   ├── controllers/           # Business logic & request handlers
│   ├── models/                # MongoDB schemas
│   ├── middleware/            # Authentication, validation, logging
│   ├── services/              # External API integrations (weather, AQI, news)
│   └── config/                # Database & environment configuration
│
├── ai-engine/                 # Python ML Module
│   ├── models/                # Trained ML models (risk, claims, fraud)
│   ├── scripts/               # Training scripts & data processing
│   └── api/                   # Flask/FastAPI endpoints for ML inference
│
├── docs/                      # Documentation & pitch deck
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Frontend / Backend**: Node.js 18+, npm
- **AI Engine**: Python 3.9+, pip
- **Database**: MongoDB (Atlas or local)

### Setup

```bash
# Clone the repo
git clone https://github.com/akshay-it23/gig-insurance-ai.git
cd gig-insurance-ai/guideware

# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run dev

# AI Engine
cd ../ai-engine
pip install -r requirements.txt
python api/app.py
```

---

## 🔐 Fraud Detection Strategy

| Method | What It Catches |
|--------|-----------------|
| **GPS Validation** | Verify worker was in the disruption zone |
| **Weather Cross-reference** | Match claim time with actual weather data |
| **Earnings Pattern Analysis** | Detect dips that don't correlate with disruptions |
| **Duplicate Claim Detection** | Same worker, same event, multiple claims |
| **Peer Comparison** | Flag if nearby workers are earning normally |

---

## 📊 Application Workflow

```
1. Worker Onboarding  →  Register → Select Platform → Enter Zone → KYC
2. Policy Purchase    →  View Premium → Choose Plan → Pay Weekly → Get Coverage
3. Disruption Detection (Automated)  →  Monitor APIs → Detect Trigger → Verify Threshold → Auto-Initiate Claim
4. Claim Processing   →  Validate Location → Check Fraud Signals → AI Approval → Instant Payout
5. Dashboard          →  Worker: earnings protected, claim history | Admin: loss ratios, fraud alerts
```

---

## 📄 License

MIT License
