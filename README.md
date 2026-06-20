## 🛡️ SafeAid Overview

AI-Powered Emergency Support & Survivor Assistance Platform

SafeAid is a secure, accessible, and intelligent emergency response platform designed to help vulnerable individuals especially victims and survivors of human trafficking, abuse, and exploitation.
The access help quickly, discreetly, and safely.




### Our mission is simple:

No cry for help should go unheard because of fear, lack of internet access, language barriers, or inability to speak.


---

##  The Problem

Millions of vulnerable people face dangerous situations where reaching help is difficult or impossible.

### Many victims:


• Cannot safely make phone calls.


• Have limited internet access.

 
• Fear being monitored by traffickers or abusers.

 
• Do not know available support services nearby.

 
• Need immediate guidance in their local language.



Traditional emergency systems often assume users can freely call, speak, or access online resources- an assumption that fails many people who need help most.

---

##  Our Solution

SafeAid combines AI, SMS technology, voice assistance, and emergency routing into one platform that allows users to request help through multiple channels.

### Users can:

• Send a discreet SOS text message.

• Speak with an AI voice assistant.

• Receive emergency guidance instantly.

• Access support even with low connectivity.

• Get connected to verified NGOs, shelters, and authorities.

•Receive multilingual assistance.


---

##  Core Features


### Silent SOS via SMS

Users can trigger emergency alerts using predefined keywords without needing internet access.


### AI Voice Hotline

An AI-powered voice assistant can:

• Understand distress calls.

• Assess urgency.

• Provide immediate guidance.

• Route cases appropriately.


### Multilingual Support

SafeAid supports multiple local and international languages to ensure accessibility.


### Intelligent Location Assistance

When available, SafeAid helps identify the user’s location and nearest support resources.


### Survivor Resource Matching

### The platform recommends:

• Shelters

• NGOs

• Legal aid services

• Medical support

• Rehabilitation centers


### Emergency Dashboard

### A centralized dashboard for authorized organizations to:

• View incoming alerts

• Track case statuses

• Monitor response metrics

• Coordinate interventions

---

##  AI Capabilities

### SafeAid leverages AI to:

• Detect emergency intent from messages.

• Classify risk levels.

• Provide contextual responses.

• Support multilingual conversations.

• Assist emergency routing decisions.

• Generate insights for support organizations.

---




---

##  Target Users

### Primary Users

• Human trafficking victims

• Abuse survivors

• At-risk individuals

• Vulnerable populations


### Secondary Users

• NGOs

• Emergency responders

• Social workers

• Human rights organizations

• Government agencies


---
## Demo Flow

```
SURVIVOR IN DANGER
        │
        ▼
 Sends SMS / Calls Hotline
        │
        ▼
SafeAid Receives Request
        │
        ▼
AI Analyzes Message
(Risk Level + Keywords + Location)
        │
        ▼
Emergency Classification
 ├── High Risk
 ├── Medium Risk
 └── Information Request
        │
        ▼
AI Matches Survivor
with Nearby Resources
        │
        ▼
Response Delivered
via SMS or Voice Call
        │
        ▼
Case Logged Securely
for Monitoring & Analytics
```

### Example Scenario

User SMS:
"I was promised a job in another state but my passport was taken."

AI detects:

✓ Potential trafficking indicator

✓ Document confiscation

✓ High vulnerability

SafeAid Response:

"You may be experiencing labor trafficking.

Call NAPTIP: XXX-XXXX

Nearest support center: XYZ Shelter

Reply HELP for emergency escalation."


---

##  System Architecture

Frontend → Emergency Dashboard


Backend API → Alert Processing Engine


AI Layer → Risk Assessment & Response Engine


Communication Layer → SMS Gateway & Voice Services


Database → Secure Incident & User Data Storage


Support Network Layer → NGOs, Shelters, Emergency Contacts

---

## AI Tool Loop

```
Incoming SMS / Voice Call
            │
            ▼
      Speech-to-Text
       (if voice)
            │
            ▼
      AI Risk Engine
            │
            ▼
Trafficking Detection Model
            │
            ▼
Resource Matching Engine
            │
            ▼
Generate Safe Response
            │
            ▼
SMS / Voice Delivery
            │
            ▼
Analytics Dashboard
            │
            ▼
Feedback Improves Future Responses
```

### AI Responsibilities

• Detect trafficking indicators

• Assess urgency level

• Classify exploitation type

• Match survivors to support resources

• Generate multilingual responses

• Escalate severe cases

---

## Data Flow Architecture


```
┌───────────────┐
│ Survivor SMS  │
└───────┬───────┘
        │
        ▼
┌──────────────────┐
│ SMS Gateway      │
│ (Twilio/Africa's │
│ Talking)         │
└───────┬──────────┘
        │
        ▼
┌──────────────────┐
│ SafeAid Backend  │
│ (API Layer)      │
└───────┬──────────┘
        │
        ▼
┌──────────────────┐
│ AI Processing    │
│ Classification   │
│ Risk Scoring     │
└───────┬──────────┘
        │
 ┌──────┴────────┐
 ▼               ▼
Resource DB   Case Storage
 ▼               ▼
Support       Analytics
Matching      Dashboard
        │
        ▼
 Survivor Receives Help
 ```

---
##  Privacy & Safety

SafeAid is designed with survivor safety as a priority.


### Key principles include:

• Data minimization

• Secure communications

• Access control

• Privacy-first design

• Responsible AI practices

• Consent-first intake flows

• Role-based access for caseworkers

• Compliance posture aligned with NDPA requirements


---

##  Impact Goals

### SafeAid aims to:

• Increase access to emergency support.

• Reduce barriers to reporting abuse and trafficking.

• Improve survivor referral pathways.

• Enable faster intervention.

• Support organizations with actionable insights.

---

##  Future Roadmap

• Offline-first mobile application

• WhatsApp emergency integration

• Predictive risk analytics

• NGO partnership portal

• Real-time responder network

• Advanced multilingual support

• Survivor follow-up tracking

---
## Recommended File Structure

```
safeaid/
│
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── hotline/
│   │   └── page.tsx
│   ├── api/
│   │   ├── sms/
│   │   │   └── route.ts
│   │   ├── voice/
│   │   │   └── route.ts
│   │   └── ai/
│   │       └── route.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── AlertCard.tsx
│   ├── AnalyticsChart.tsx
│   ├── ResourceCard.tsx
│   └── CaseTable.tsx
│
├── lib/
│   ├── openai.ts
│   ├── sms.ts
│   ├── voice.ts
│   ├── risk-engine.ts
│   └── resource-matcher.ts
│
├── services/
│   ├── ai-service.ts
│   ├── sms-service.ts
│   ├── hotline-service.ts
│   └── analytics-service.ts
│
├── data/
│   ├── shelters.json
│   ├── hotlines.json
│   └── resources.json
│
├── types/
│   ├── case.ts
│   ├── survivor.ts
│   └── alert.ts
│
├── public/
│   ├── logo.svg
│   └── icons/
│
├── README.md
├── package.json
├── tsconfig.json
└── .env.local
```
---

##  Team


### Product Designer

Ibrahim Ashiah Ajoke

### Frontend Developer

Ibrahim Ashiah Ajoke


### Backend Developer

Emmanuel Olayinka Bolaoluwatipoto



### AI/ML Development

The Team

---

  


## Tech Stack

| Category | Technology | Purpose |
|----------|------------|----------|
| Frontend | Next.js 15 | Web application framework |
| Frontend | TypeScript | Type-safe development |
| Frontend | Tailwind CSS | Responsive styling |
| Frontend | ShadCN UI | Modern UI components |
| Backend | Next.js API Routes | Backend endpoints and server logic |
| Backend | Node.js | Runtime environment |
| AI | OpenAI API | Risk assessment and response generation |
| AI | Whisper API | Speech-to-text processing |
| AI | Risk Classification Engine | Detect trafficking indicators and urgency levels |
| AI | Resource Matching Engine | Connect survivors to support services |
| Communication | Twilio SMS | Silent SOS messaging |
| Communication | Twilio Voice | AI-powered hotline |
| Database | PostgreSQL | Data storage |
| Database | Prisma ORM | Database management |
| Authentication | NextAuth.js | User authentication |
| Analytics | Recharts | Dashboard visualizations |
| Deployment | Vercel | Application hosting |
| Monitoring | Vercel Analytics | Performance tracking |
| Version Control | Git & GitHub | Source control and collaboration |

## Future Integrations

| Service | Purpose |
|---------|---------|
| NAPTIP Integration | Survivor referral and escalation |
| WhatsApp Business API | Alternative reporting channel |
| Google Maps API | Location-based resource matching |
| Translation API | Local language support |
| Emergency Services API | High-risk case escalation |


---

##  Built For Impact


 
SafeAid was created to ensure that vulnerable individuals can access help when they need it most-safely, discreetly, and intelligently.


Technology should not only be smart. It should save lives.

### Built for the USAII Global AI Hackathon 2026


