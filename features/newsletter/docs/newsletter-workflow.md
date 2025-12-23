# Newsletter Workflow

## Overview

This document summarizes the complete architecture for integrating an
**automated newsletter with Human-in-the-Loop (HITL)** in a **Next.js**
app, using **Resend**, **Vercel Workflows**, and a PostgreSQL database.

## Technologies

### Core

- Next.js App Router
- Resend
- PostgreSQL
- Vercel Workflows
- OpenAI / Vercel Gateway

## Database Schema

### newsletter_subscribers

- id
- email
- is_active
- created_at
- confirmed_at
- unsubscribed_at

### newsletter_drafts

- id
- title
- content
- status (needs_review | approved | rejected | sent )
- ai_version
- reviewer_id
- reviewed_at
- timestamps

### newsletter_sends

- id
- draft_id
- status
- total_sent
- timestamps

## Workflow Steps

### 1. Draft Generation (Automated)

AI generates draft → saved as `needs_review`.

### 2. Human-in-the-Loop Review

Human edits, approves, rejects, or regenerates.

### 3. Automated Sending

Triggered by Vercel Workflow or approval event.

### 4. Delivery via Resend

Send to all active subscribers.

### 5. Audit

Track reviewer, timestamps, send logs.

## Summary Diagram

``` mermaid
flowchart LR
A[AI Draft] --> B(needs_review)
B -->|Human Review| C{Decision}
C -->|Approve| D[Workflow Send]
C -->|Reject| E[Revision]
D --> F[Resend → sent]
```

## Conclusion

Architecture scalable, reliable, automated, and supervised by a human.
