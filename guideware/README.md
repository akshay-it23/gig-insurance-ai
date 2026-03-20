# GigShield

**Comprehensive Insurance & Risk Management Platform for Gig Workers**

GigShield is an innovative AI-powered insurance and risk management solution designed specifically for gig economy workers. The platform leverages machine learning to provide personalized insurance recommendations, real-time risk assessment, and seamless policy management.

## 🎯 Project Overview

GigShield addresses the unique insurance challenges faced by freelancers, delivery drivers, and gig workers by offering:

- **AI-Powered Risk Assessment**: Machine learning models analyze work patterns to predict risks
- **Personalized Insurance Recommendations**: Tailored policies based on individual work profiles
- **Real-Time Dashboard**: Monitor active gigs, coverage status, and risk levels
- **Seamless Policy Management**: Easy enrollment, claims processing, and policy updates
- **Integration with Gig Platforms**: Direct connection with major gig work marketplaces

## 📁 Project Structure

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
│   ├── models/                # MongoDB/Database schemas
│   ├── middleware/            # Authentication, validation, logging
│   ├── services/              # External API integrations (payment, insurance)
│   └── config/                # Database & environment configuration
│
├── ai-engine/                 # Python ML Module
│   ├── models/                # Trained ML models (risk assessment, predictions)
│   ├── scripts/               # Training scripts & data processing
│   └── api/                   # Flask/FastAPI endpoints for ML inference
│
├── docs/                      # Documentation & resources
│   ├── API Documentation
│   ├── Architecture Guide
│   └── Deployment Guide
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Frontend**: Node.js 18+, npm/yarn
- **Backend**: Node.js 18+, MongoDB
- **AI Engine**: Python 3.9+, pip

### Setup

#### 1. Frontend Setup

```bash
cd client
npm install
npm run dev
```

#### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

#### 3. AI Engine Setup

```bash
cd ai-engine
pip install -r requirements.txt
python -m flask run
```

## 🏗️ Architecture

### Frontend (React)
- Modern React 18 with hooks
- Context API for state management
- Responsive UI with Tailwind CSS
- Real-time data updates

### Backend (Node.js + Express)
- RESTful API architecture
- JWT authentication
- MongoDB for data persistence
- Middleware for validation & security

### AI Engine (Python)
- Machine learning models for risk assessment
- Real-time prediction API
- Data processing & model training pipelines
- Integration with backend via REST/gRPC

## 🔐 Key Features

- ✅ **User Authentication**: Secure JWT-based auth
- ✅ **AI Risk Assessment**: Personalized risk scoring
- ✅ **Policy Management**: Create, update, and manage policies
- ✅ **Claims Processing**: Streamlined claim submission & tracking
- ✅ **Dashboard**: Comprehensive analytics & insights
- ✅ **Integrations**: Connect with gig platforms & insurance providers
- ✅ **Mobile Responsive**: Works on all devices

## 📊 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS, Context API |
| Backend | Node.js, Express, MongoDB, JWT |
| AI/ML | Python, TensorFlow/PyTorch, Scikit-learn |
| Deployment | Docker, AWS/GCP, CI/CD Pipeline |
| Database | MongoDB |

## 🤝 Contributing

Please refer to [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for contribution guidelines.

## 📝 License

This project is proprietary and confidential.

## 📧 Contact

For questions or support, reach out to the development team.

---

**Last Updated**: March 2026
