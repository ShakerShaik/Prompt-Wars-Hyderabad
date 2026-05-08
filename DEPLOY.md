# AuraTravel Deployment Guide for Google Cloud Run

To deploy this application to Google Cloud Run, follow these steps:

## Prerequisites
1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed.
2. An active Google Cloud Project.

## Deployment Commands

### 1. Configure gcloud (One-time)
```powershell
gcloud auth login
gcloud config set project [YOUR_PROJECT_ID]
```

### 2. Build and Deploy
Run the following command in your terminal:
```powershell
gcloud run deploy auratravel --source . --region us-central1 --allow-unauthenticated
```

## Why Cloud Run?
- **Serverless**: Scales to zero when not in use (Cost Efficient).
- **Global**: High-speed delivery.
- **Secure**: Automated HTTPS.

---
*Note: Since gcloud is not found in the current environment, please run these commands in a terminal where Google Cloud SDK is initialized.*
