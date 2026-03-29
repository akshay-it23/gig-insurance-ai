
# 🛡️ GigShield — AI-Powered Parametric Insurance for India's Gig Workers

## 🎯 Problem Statement
India's platform-based delivery partners (Zomato, Swiggy, Zepto, Amazon, Dunzo) lose **20–30% of their monthly earnings** due to external disruptions like extreme weather, pollution, and sudden curfews. They have **zero income protection** against these uncontrollable events.

## 💡 Our Solution
**GigShield** is an AI-enabled parametric insurance platform that automatically detects disruptions and pays gig workers for lost income — **no paperwork, no claims filing, instant payouts.**

---

## 🧑‍🍳 Chosen Persona
**Food Delivery Partners** (Zomato / Swiggy)

### Why Food Delivery?
- Highest sensitivity to weather (rain, extreme heat directly halts deliveries)
- Most frequent earning cycle (daily/weekly payouts)
- Largest gig workforce segment in India (~5M+ active riders)

---

## 📋 Parametric Triggers (Auto-Claim Events)

| # | Trigger | Data Source | Threshold | Payout |
|---|---------|-------------|-----------|--------|
| 1 | **Heavy Rainfall** | Weather API (OpenWeatherMap) | > 50mm/hr | ₹150–300/day lost |
| 2 | **Extreme Heat** | Weather API | > 45°C | ₹100–200/day lost |
| 3 | **Severe Air Pollution** | AQI API (AQICN/OpenAQ) | AQI > 400 | ₹100–200/day lost |
| 4 | **Flooding / Waterlogging** | Weather + News API | Flood alert active | ₹200–400/day lost |
| 5 | **Unplanned Curfew / Bandh** | News API / Manual trigger | Official announcement | ₹150–300/day lost |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Atlas) |
| **AI/ML** | Python (scikit-learn / TensorFlow Lite) |
| **APIs** | OpenWeatherMap, AQICN, NewsAPI |
| **Payments** | Razorpay Test Mode (simulated) |
| **Auth** | JWT + OTP-based login |
| **Hosting** | Vercel (Frontend) + Render/Railway (Backend) |

---

## 💰 Weekly Premium Model

### How It Works
```
Weekly Premium = Base Rate × Zone Risk Multiplier × Season Factor × Claim History Factor
```

| Factor | Description | Example |
|--------|-------------|---------|
| **Base Rate** | Starting weekly premium | ₹29/week |
| **Zone Risk** | Based on historical disruption data for worker's area | Mumbai (flood-prone) = 1.4x |
| **Season Factor** | Monsoon vs Summer vs Winter | Monsoon = 1.5x, Winter = 0.8x |
| **Claim History** | Workers with fewer claims get discounts | No claims in 4 weeks = 0.85x |

**Example**: A Zomato rider in Mumbai during monsoon:
```
₹29 × 1.4 × 1.5 × 1.0 = ₹60.90/week ≈ ₹61/week
```

**Coverage**: Up to ₹1,500/week in lost income protection.

---

## 🔐 Fraud Detection Strategy

| Method | What It Catches |
|--------|-----------------|
| **GPS Validation** | Verify worker was actually in the disruption zone |
| **Cross-reference Weather** | Match claim time with actual weather data |
| **Earnings Pattern Analysis** | Detect unusual earning dips that don't correlate with disruptions |
| **Duplicate Claim Detection** | Same worker, same event, multiple claims |
| **Peer Comparison** | If nearby workers are earning normally, flag the claim |

---

## 📊 Application Workflow

```
1. Worker Onboarding
   └── Register → Select Platform → Enter Zone → KYC
   
2. Policy Purchase
   └── View Premium → Choose Plan → Pay Weekly → Get Coverage

3. Disruption Detection (Automated)
   └── Monitor APIs → Detect Trigger → Verify Threshold → Auto-Initiate Claim

4. Claim Processing
   └── Validate Location → Check Fraud Signals → AI Approval → Instant Payout

5. Dashboard
   └── Worker: Earnings protected, claim history, active coverage
   └── Admin: Loss ratios, risk analytics, fraud alerts
```

---

## 🗂️ Project Structure

```
guideware/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API call functions
│   │   ├── context/         # React context (auth, theme)
│   │   └── utils/           # Helper functions
│   └── public/
├── server/                  # Node.js Backend
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── middleware/           # Auth, validation
│   ├── services/            # External API integrations
│   └── config/              # DB config, env setup
├── ai-engine/               # Python ML Module
│   ├── models/              # Trained models
│   ├── scripts/             # Training & prediction scripts
│   └── api/                 # Flask/FastAPI endpoints
├── docs/                    # Documentation & pitch deck
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/guideware.git
cd guideware

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

## 📅 Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| **Phase 1** | March 4–20 | Ideation, README, Prototype |
| **Phase 2** | March 21–April 4 | Registration, Policy, Premium Calc, Claims |
| **Phase 3** | April 5–17 | Fraud Detection, Payouts, Dashboard, Final Demo |

---


## 📄 License
MIT License
