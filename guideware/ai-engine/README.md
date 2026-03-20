# GigShield AI Engine

Python-based machine learning module for risk assessment and predictive analytics in the GigShield platform.

## 📂 Directory Structure

```
ai-engine/
├── models/          # Pre-trained ML models
│   ├── risk_model.pkl
│   ├── claim_prediction.pkl
│   ├── fraud_detection.pkl
│   └── model_configs.json
│
├── scripts/         # Data processing & training
│   ├── train_risk_model.py
│   ├── train_claim_predictor.py
│   ├── data_preprocessing.py
│   ├── feature_engineering.py
│   └── evaluate_models.py
│
├── api/             # Flask/FastAPI endpoints
│   ├── app.py
│   ├── routes.py
│   ├── models.py
│   └── utils.py
│
├── requirements.txt # Python dependencies
├── config.py        # Configuration settings
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- pip package manager

### Installation

```bash
pip install -r requirements.txt
```

### Configuration

Create `config.py` with your settings:

```python
# ML Model paths
MODELS_PATH = './models/'

# API Configuration
API_HOST = '0.0.0.0'
API_PORT = 5001

# Backend API URL
BACKEND_API_URL = 'http://localhost:5000'
```

### Running the API

```bash
python -m flask run --port 5001
```

Or with Gunicorn (production):

```bash
gunicorn -w 4 -b 0.0.0.0:5001 api.app:app
```

## 🤖 ML Models

### 1. Risk Assessment Model
- **Purpose**: Predict risk level based on user work profile
- **Input**: Work patterns, gig type, hours, location
- **Output**: Risk score (0-100), Risk category (Low/Medium/High)
- **Algorithm**: Random Forest / XGBoost

### 2. Claim Prediction Model
- **Purpose**: Predict likelihood of insurance claims
- **Input**: User demographics, work type, risk profile
- **Output**: Claim probability, Recommended coverage

### 3. Fraud Detection Model
- **Purpose**: Identify suspicious claims
- **Input**: Claim details, user history, similar claims
- **Output**: Fraud score, Recommendation (approve/reject/review)

## 📊 API Endpoints

### Risk Assessment
```
POST /api/ml/risk-assessment
Content-Type: application/json

{
  "user_id": "123",
  "work_type": "delivery",
  "hours_per_week": 40,
  "location": "urban",
  "experience_years": 2
}

Response:
{
  "risk_score": 65,
  "risk_category": "MEDIUM",
  "recommended_coverage": "premium",
  "factors": {...}
}
```

### Claim Prediction
```
POST /api/ml/claim-prediction
Content-Type: application/json

{
  "user_id": "123",
  "claim_type": "injury"
}

Response:
{
  "claim_probability": 0.45,
  "recommended_premium": 150,
  "confidence": 0.92
}
```

### Fraud Detection
```
POST /api/ml/fraud-detection
Content-Type: application/json

{
  "claim_id": "CLM-456",
  "claim_details": {...}
}

Response:
{
  "fraud_score": 0.15,
  "fraud_risk": "LOW",
  "recommendation": "APPROVE"
}
```

## 🏋️ Model Training

### Train Risk Assessment Model

```bash
python scripts/train_risk_model.py \
  --data data/historical_users.csv \
  --output models/risk_model.pkl
```

### Train Claim Predictor

```bash
python scripts/train_claim_predictor.py \
  --data data/historical_claims.csv \
  --output models/claim_prediction.pkl
```

### Evaluate All Models

```bash
python scripts/evaluate_models.py
```

## 📦 Required Dependencies

```
Flask==2.3.0
scikit-learn==1.2.0
pandas==1.5.0
numpy==1.23.0
joblib==1.2.0
gunicorn==20.1.0
requests==2.28.0
python-dotenv==0.21.0
```

## 🧪 Model Performance

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| Risk Assessment | 89% | 88% | 90% | 0.89 |
| Claim Prediction | 82% | 80% | 85% | 0.82 |
| Fraud Detection | 93% | 91% | 92% | 0.91 |

## 🔄 Data Pipeline

```
Raw Data
   ↓
Data Preprocessing (scripts/data_preprocessing.py)
   ↓
Feature Engineering (scripts/feature_engineering.py)
   ↓
Model Training (scripts/train_*.py)
   ↓
Model Evaluation (scripts/evaluate_models.py)
   ↓
Model Deployment (api/app.py)
```

## 🔐 Security

- Request validation on all endpoints
- Rate limiting to prevent abuse
- API authentication with backend
- Secure model file storage

## 📈 Monitoring & Logging

Enable logging in `api/app.py`:

```python
import logging
logging.basicConfig(level=logging.INFO)
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5001", "api.app:app"]
```

### Build and Run

```bash
docker build -t gigshield-ai .
docker run -p 5001:5001 gigshield-ai
```

---

**AI/ML Engine Module** | Part of GigShield Project
