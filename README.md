# AuraTravel - AI Travel Companion
**Credit ID:** `PU1GLMTHLQM3BL7U`

## Overview
AuraTravel is a premium, AI-powered travel planning application built for the **Prompt-Wars-Hyderabad** competition. It features intelligent itinerary generation, budget optimization, and real-time travel alerts.

## Project Links
- **Repository:** https://github.com/ShakerShaik/Prompt-Wars-Hyderabad.git
- **Deployed (Preview):** https://shakershaik.github.io/Prompt-Wars-Hyderabad/

## Google Cloud Deployment
This project is containerized and ready for Google Cloud Run. The `Dockerfile` and `metadata.json` are included in the root directory.

To deploy:
1. Ensure `gcloud` is configured.
2. Run: `gcloud run deploy auratravel --source . --region us-central1 --allow-unauthenticated`
