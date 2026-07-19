# 🚀 AWS Serverless Sentiment Analysis

![Python](https://img.shields.io/badge/Python-3.12-blue)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-success)
![NLP](https://img.shields.io/badge/NLP-VADER-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **Serverless Sentiment Analysis Web Application** that analyzes public YouTube review comments to estimate customer sentiment for products.

The application automatically searches YouTube review videos, filters spam and irrelevant comments, performs Natural Language Processing (NLP) using **VADER Sentiment**, and generates an analytics dashboard including:

- Overall Rating
- Sentiment Distribution
- Aspect-Based Sentiment
- Trending Keywords
- Confidence Score
- Reliability Indicator

---

# 📸 Demo

> Add screenshots here.

Example:

```
screenshots/

homepage.png

results.png

keywords.png

architecture.png
```

---

# ✨ Features

## Core Features

- Search any product
- Fetch YouTube review comments
- Spam filtering
- Low-quality comment removal
- Serverless AWS backend
- Real-time sentiment analysis

---

## Analytics

- Positive / Negative / Neutral percentages
- Product rating
- Confidence score
- Data reliability indicator
- Aspect-based sentiment analysis
- Trending keywords
- Top review comments

---

## Cloud

- AWS Lambda
- API Gateway
- Vercel Frontend

---

# 🏗 Architecture

```

                User
                  │
                  ▼
          React Frontend
             (Vercel)
                  │
                  ▼
            API Gateway
                  │
                  ▼
            AWS Lambda
                  │
                  ▼
        YouTube Data API v3
                  │
                  ▼
         Comment Filtering
                  │
                  ▼
        VADER Sentiment NLP
                  │
                  ▼
        Analytics Engine
                  │
                  ▼
           JSON Response

```

---

# 📁 Project Structure

```

aws-serverless-sentiment-analysis/

backend/
│
├── lambda_function.py
├── youtube.py
├── sentiment.py
├── analysis.py
├── filters.py
├── cache.py
├── utils.py
├── config.py
├── requirements.txt

frontend/

screenshots/

README.md

```

---

# 🧠 Analysis Pipeline

```

Product Name

↓

Search YouTube Reviews

↓

Fetch Comments

↓

Spam Filtering

↓

Quality Filtering

↓

VADER Sentiment Analysis

↓

Aspect Analysis

↓

Keyword Extraction

↓

Confidence Score

↓

JSON Response

```

---

# ⚙ Tech Stack

## Backend

- Python
- AWS Lambda
- API Gateway

## Frontend

- React
- Next.js
- CSS

## APIs

- YouTube Data API v3

## NLP

- VADER Sentiment

## Deployment

- AWS
- Vercel

---

# 📊 API

## Request

GET

```

/?query=iphone 16

```

POST

```json
{
    "product":"iphone 16"
}
```

---

## Example Response

```json
{
  "product": "iPhone 16",

  "rating": 4.3,

  "confidence": "High",

  "summary": "Overall customer sentiment is strongly positive.",

  "data_reliability": "Sufficient data for analysis.",

  "total_analyzed": 35,

  "sentiment_distribution": {
    "Positive": 72.1,
    "Negative": 13.2,
    "Neutral": 14.7
  },

  "aspect_analysis": {

    "camera": {

      "Positive%":82,

      "Negative%":8,

      "Neutral%":10,

      "mentions":14

    }

  },

  "trending_keywords":[

    "battery",

    "camera",

    "display"

  ]

}
```

---

# 🚀 Local Setup

Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/aws-serverless-sentiment-analysis.git
```

Install dependencies

```bash
pip install -r backend/requirements.txt
```

Create environment variable

```
YOUTUBE_API_KEY=YOUR_API_KEY
```

Deploy Lambda

Upload the backend folder to AWS Lambda.

---

# 🔒 Environment Variables

```
YOUTUBE_API_KEY=YOUR_API_KEY
```

---

# 📈 Future Improvements

- Amazon review integration
- Flipkart review integration
- AI-generated summaries
- Multi-language sentiment analysis
- Trend visualization
- Historical comparison
- Product comparison
- BERT sentiment model
- Redis cache
- DynamoDB storage

---

# 📚 Learning Outcomes

This project demonstrates experience with:

- AWS Lambda
- Serverless Architecture
- REST APIs
- Python
- Cloud Computing
- Natural Language Processing
- JSON Processing
- API Integration
- Backend Development
- Software Engineering
- Data Cleaning

---

# 👨‍💻 Author

**Mir Haseeb Ali**

B.Tech CSE (AI & ML)

Machine Learning Intern

Hyderabad, India

LinkedIn:

GitHub:

---

# 📄 License

MIT License
