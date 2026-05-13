# Loan Assistance & Eligibility Review Platform (India) — Complete SaaS Blueprint

> **Legal Disclaimer (display in footer, onboarding, payment, and status pages):**  
> **“We are not a bank or NBFC. Loan approval depends on lender eligibility.”**

---

## 1) Full System Architecture

### 1.1 High-Level Architecture (Text Diagram)

```text
[Google/Meta Ads + Organic SEO + Google Business Profile]
                |
                v
        [Landing Website / Funnel]
                |
                v
       [Eligibility Pre-Check Wizard]
                |
        (Lead + Consent Capture)
                |
                v
       [Payment Gateway: Razorpay]
                |
   webhook (payment success/failure)
                |
                v
 [Core Backend API + Workflow Orchestrator]
      |          |            |          |
      |          |            |          +--> [Notification Service: Email + WhatsApp]
      |          |            +--------------> [CRM Engine + Task Queue]
      |          +---------------------------> [Document Service + OCR/Validation]
      +--------------------------------------> [Customer Portal + Admin Panel APIs]

             [PostgreSQL]   [Redis]   [Object Storage (S3/R2)]
                  |            |              |
                  |            |              +--> encrypted docs + signed URLs
                  +------------+-----------------> audit + status + automation logs
```

### 1.2 Core Modules
- **Frontend Apps**
  - Public marketing site + funnel
  - Customer portal (mobile-first)
  - Admin/CRM console
- **Backend Services**
  - Auth service (OTP, JWT)
  - Lead service
  - Eligibility service
  - Payment service (Razorpay)
  - Document service
  - CRM workflow service
  - Notification service (email/WhatsApp)
  - Reporting service
- **Data Layer**
  - PostgreSQL (primary relational DB)
  - Redis (cache, OTP store, rate limits, queues)
  - S3-compatible storage (documents)
- **Integrations**
  - Razorpay
  - WhatsApp Business API provider (e.g., Interakt / Twilio / Gupshup)
  - Email API (Postmark/SendGrid/AWS SES)
  - Google Analytics 4 + Meta Pixel + GTM

### 1.3 Tenant Model (Scalable)
- Start single-tenant (one business).
- Design schema with `org_id` for future multi-tenant migration.
- Every table includes `org_id`, `created_at`, `updated_at`, `created_by`.

### 1.4 Customer Flow
1. User lands on ad/SEO landing page.
2. Completes eligibility pre-check (basic financial and business inputs).
3. Sees transparent result: “Likely Eligible / Needs Improvement / Documents Needed”.
4. Pays ₹199/₹399 review fee.
5. Creates account via mobile OTP.
6. Uploads documents.
7. Receives automated updates (email + WhatsApp).
8. Profile enters CRM queue for manual review.
9. Admin maps to suitable lenders.
10. Status updates continue until closed.

### 1.5 Employee Workflow (1–2 person startup)
- **Role: Founder/Admin**
  - Review new paid leads
  - Verify documents
  - Assign lead stage and lender matches
  - Trigger “ready to submit” updates
- **Role: Ops Executive**
  - Follow-up calls/WhatsApp
  - Missing document reminders
  - CRM notes and next-action updates

### 1.6 Admin Roles (RBAC)
- `super_admin`: full access
- `ops_manager`: lead/doc/payment/assignment control
- `review_agent`: view leads + update review + notes
- `support_agent`: communication-only + ticket handling
- `finance_viewer`: payment/revenue reports only

---

## 2) Complete UI/UX Structure (Mobile-First)

### 2.1 Design System
- Clean fintech palette: navy + teal + neutral gray
- Typography: Inter / Manrope
- Components: cards, steppers, status chips, timeline, trust badges
- Tone: educational, transparent, non-promissory

### 2.2 Public Pages
1. **Home/Landing**
   - Hero: “Get your business loan profile reviewed”
   - CTA: “Check Eligibility”
   - Trust strip: “Not a bank/NBFC” + years exp + partners count
   - Steps section (4-step process)
   - Pricing cards (₹199 / ₹399)
   - Testimonials + founder message
   - FAQ + legal disclaimer footer
2. **Eligibility Wizard**
   - Step 1: business type
   - Step 2: turnover range
   - Step 3: GST/ITR availability
   - Step 4: loan requirement and purpose
   - Output screen with clear disclaimer
3. **Pricing + Payment**
   - Plan comparison
   - Razorpay checkout embed
   - GST invoice details input
4. **About / Compliance / Privacy / Terms**

### 2.3 Auth + Onboarding
- Mobile OTP login
- Optional email verify
- Progressive profiling:
  - Business identity
  - Financial basics
  - Existing obligations
  - Consent + declaration

### 2.4 Customer Portal Screens
- **Dashboard**: stage, completion %, pending docs, next action
- **Application Timeline**: submitted → under review → matched → in discussion → closed
- **Document Center**: upload status by doc type, replace file, OCR match warnings
- **Notifications**: filter by email/WhatsApp/system
- **Support Chat**: bot first, human escalation
- **Billing**: receipts, invoices, payment history

### 2.5 CRM/Admin Panel Screens
- **Lead Inbox**: new/paid/unassigned
- **Kanban Pipeline**: stage-wise cards
- **Lead 360 View**: profile, docs, notes, interactions, payment
- **Document Verification Console**: side-by-side preview + checklist
- **Automations Monitor**: failed/sent events
- **Reports Dashboard**: funnel, revenue, conversion, TAT
- **Settings**: lender rules, templates, role permissions

### 2.6 Responsive Layout Rules
- Bottom nav on mobile: Home / Status / Upload / Support / Account
- Sticky CTA buttons on small screens
- All forms split into short, 1-question chunks
- Upload optimized for camera capture + compression

---

## 3) Automation Systems

### 3.1 Email Automation
- Trigger matrix:
  - lead created
  - payment success/failure
  - docs pending
  - review started/completed
  - lender match updated
- Sequences:
  - D0: welcome + next steps
  - D1: docs reminder
  - D3: pending info reminder
  - D7: re-engagement
- Template variables: `{first_name}`, `{lead_id}`, `{current_stage}`, `{pending_docs}`

### 3.2 WhatsApp Automation
- Consent checkbox mandatory.
- Messages:
  - payment receipt
  - upload reminder
  - status update
  - appointment reminders
- Add quick replies: “Upload now”, “Talk to support”, “View status”.

### 3.3 CRM Automation Logic
- On payment success → auto-create CRM lead in `PAID_NEW`.
- If documents incomplete > 48 hrs → auto task assigned.
- If no activity > 5 days → reopen follow-up task.
- Priority review (₹399) gets SLA tag = 4 working hours first-touch.

### 3.4 Lead Assignment Logic
- Round robin by agent availability.
- Override rules:
  - Priority leads to best performer.
  - Region/language mapping.
  - Loan amount > threshold goes to senior reviewer.

### 3.5 Reminder System
- Multi-channel reminder fallback:
  1. in-app
  2. WhatsApp
  3. email
- Stop reminders automatically when action completed.

### 3.6 Lifecycle Automation States
`Visitor -> Lead Captured -> Paid -> KYC/Docs Pending -> Under Review -> Matched -> Lender Discussing -> Closed Won/Lost -> Re-engage`

---

## 4) CRM Structure

### 4.1 Pipeline Stages
1. New Inquiry
2. Eligibility Checked
3. Payment Pending
4. Paid – Awaiting Docs
5. Docs Under Verification
6. Profile Reviewed
7. Lender Shortlisted
8. Sent to Lender (advisory handoff)
9. Closed Won / Closed Lost / Hold

### 4.2 Lead Scoring (0–100)
- Business vintage (0–20)
- Turnover band (0–20)
- Credit hygiene proxy (0–20)
- Document completeness (0–20)
- Responsiveness (0–20)

Score Bands:
- 80–100: High confidence advisory case
- 50–79: Moderate
- <50: Improve profile path

### 4.3 Notes + Activity
- Structured note types: `CALL`, `WHATSAPP`, `EMAIL`, `DOC_REVIEW`, `INTERNAL`
- Mandatory next action date
- Every note logs actor and timestamp

### 4.4 Document Verification Workflow
- Checklist by loan type
- Auto OCR extraction + manual confirmation
- Flag reasons: mismatch, unreadable, expired, inconsistent
- Final state: approved/reupload required

---

## 5) Database Schema (Core Tables)

### 5.1 `users`
- id (uuid, pk)
- org_id
- role (customer/admin/agent)
- full_name
- mobile
- email
- password_hash (optional, OTP-first)
- is_mobile_verified
- status
- created_at, updated_at

### 5.2 `leads`
- id (uuid)
- org_id
- user_id (fk users)
- source (organic/meta/google/referral)
- campaign_id
- requested_amount
- loan_purpose
- business_type
- monthly_turnover_range
- city, state
- stage
- lead_score
- assigned_to (fk users)
- priority_flag
- disclaimer_accepted_at
- created_at, updated_at

### 5.3 `payments`
- id
- org_id
- lead_id
- razorpay_order_id
- razorpay_payment_id
- amount
- currency
- plan_type (basic/priority)
- status (created/paid/failed/refunded)
- invoice_url
- paid_at
- created_at

### 5.4 `documents`
- id
- org_id
- lead_id
- doc_type (PAN/AADHAAR/BANK_STATEMENT/GST/ITR/etc)
- file_key
- file_hash
- encrypted_metadata
- verification_status
- verification_notes
- uploaded_by
- uploaded_at

### 5.5 `banks`
- id
- name
- type (bank/nbfc)
- products_supported
- geo_coverage
- min_criteria_json
- active

### 5.6 `loan_types`
- id
- code (BL/OD/LAP/etc)
- display_name
- required_docs_json
- eligibility_rules_json

### 5.7 `crm_notes`
- id
- lead_id
- note_type
- note_text
- next_action_at
- created_by
- created_at

### 5.8 `automation_logs`
- id
- lead_id
- channel (email/whatsapp/system)
- template_code
- payload_json
- status
- error_message
- sent_at

### 5.9 `notifications`
- id
- user_id
- lead_id
- title
- message
- channel
- read_at
- created_at

### 5.10 `reviews`
- id
- lead_id
- reviewer_id
- eligibility_summary
- risk_flags_json
- lender_match_json
- recommendation
- created_at

### 5.11 `employee_actions`
- id
- employee_id
- lead_id
- action_type
- old_value_json
- new_value_json
- ip_address
- created_at

---

## 6) Admin Panel (Detailed)

- **Lead Management**: filters, tags, SLA timers, bulk updates
- **Analytics**: lead source ROI, paid conversion %, stage drop-off, TAT
- **Payment Tracking**: paid/failed/refund, receipt verification, GST invoice exports
- **Customer Verification**: KYC checklist + duplicate detection
- **Employee Management**: roles, productivity, assignments
- **Document Review**: OCR confidence, re-upload request template
- **CRM Notes**: chronological timeline + next actions
- **Automated Messaging**: template editor + trigger mapping
- **Reports Dashboard**: daily executive summary PDF/email

---

## 7) Customer Portal Capabilities
- Track application stage with ETA bands (no guarantees)
- Upload/re-upload documents via secure uploader
- Receive in-app + email + WhatsApp alerts
- Chat support (bot + escalation)
- View eligibility review summary (advisory-only wording)
- Download invoices/receipts
- See action checklist and progress percentage

---

## 8) Trust-Building Features

1. **Testimonials Engine**
   - Only verified paid customers can submit.
   - Moderation queue before publishing.
2. **Review Collection**
   - Trigger after “profile review delivered” stage.
3. **Google Review Flow**
   - Send review request link with neutral wording.
4. **Founder Profile**
   - Real name, credentials, transparent process explanation.
5. **Educational Blog**
   - Topics: CIBIL basics, GST impact, doc readiness.
6. **FAQ System**
   - Categorized by payments, documents, lender process.
7. **Compliance Banner**
   - Persistent footer + checkout + dashboard disclaimer.

---

## 9) AI Features (Practical MVP + Scale)

### MVP AI
- **Lead Qualification Assistant**: scores readiness from form data.
- **Doc Checklist Generator**: dynamic list by profile + loan type.
- **FAQ Chatbot**: policy-safe canned + retrieval-based answers.

### Phase 2 AI
- **Eligibility Estimation Model** (advisory probability bands only)
- **Customer Query Classification** (billing/docs/status/escalation)
- **Fraud Flags**
  - inconsistent PAN/name
  - repeated device across multiple identities
  - suspicious document metadata

Guardrails:
- Never output “guaranteed approval”.
- Always append advisory disclaimer in AI outputs.

---

## 10) Payment System (Razorpay)

### Flow
1. Backend creates order (`/payments/create-order`).
2. Frontend opens Razorpay checkout (UPI/card/netbanking/wallet).
3. Razorpay webhook confirms signature.
4. Payment row marked `PAID`.
5. Invoice generated and emailed.
6. Lead moves to `PAID_AWAITING_DOCS`.

### Failure Handling
- failed payment retry link
- abandoned checkout reminder in 30 mins
- duplicate webhook idempotency key handling

---

## 11) File Storage System (Sensitive Docs)

### Required Docs
- PAN
- Aadhaar (masked display)
- Bank statements
- GST certificates
- ITR docs

### Security Controls
- Upload to pre-signed URL (short expiry)
- Server-side encryption (KMS-managed)
- Private bucket only, no public read
- Antivirus scan + MIME validation
- Hashing for tamper detection
- Versioned object storage
- Access logs and immutable audit trails

### Access Policy
- customer: own docs only
- review agent: assigned lead docs
- admin: full with justification logs

---

## 12) Security Requirements

- OTP login (mobile-first)
- JWT access token (15 min) + refresh token rotation
- RBAC + row-level authorization
- API rate limiting (IP + mobile)
- CAPTCHA on suspicious traffic
- WAF + bot mitigation
- Secure headers (CSP, HSTS, XFO)
- Encryption at rest + TLS in transit
- Audit logs for every critical action
- PII masking in UI and logs

---

## 13) Google Business + Lead System

### SEO Structure
- Pages by intent:
  - `/business-loan-assistance`
  - `/msme-loan-eligibility-check`
  - `/documents-required-business-loan`
- Local SEO pages by city/state.
- Schema markup: FAQ, LocalBusiness, Breadcrumb.

### Google Business Profile Strategy
- Weekly posts (educational tips)
- Q&A management
- Review response SOP
- UTM-tagged profile links for attribution

### Analytics Stack
- GA4 events: form_start, form_submit, payment_success, doc_upload
- Meta pixel: ViewContent, Lead, InitiateCheckout, Purchase
- Server-side conversion API for reliability

---

## 14) Ads + Funnel System

### Meta Funnel
1. TOFU: educational reels/carousels (“how eligibility works”)
2. MOFU: checklist lead magnet
3. BOFU: profile review offer ₹199/₹399

### Retargeting Funnel
- audience A: visited eligibility page, no submit
- audience B: submitted but unpaid
- audience C: paid but docs pending
- audience D: closed lost reactivation after 45 days

### Conversion Optimization
- 2-step lead form
- social proof near CTA
- frictionless mobile payment
- dynamic FAQ near checkout

---

## 15) Recommended Tech Stack

### Lean MVP Stack
- **Frontend**: Next.js (App Router) + Tailwind + shadcn/ui
- **Backend**: Node.js (NestJS) or Next.js API routes (initial)
- **DB**: PostgreSQL (Supabase/Neon/RDS)
- **Cache/Queue**: Redis (Upstash/Elasticache)
- **Storage**: AWS S3 or Cloudflare R2
- **Auth**: OTP via MSG91/Twilio + JWT
- **Payments**: Razorpay
- **WhatsApp**: Interakt/Gupshup/Twilio WA API
- **Email**: Postmark/SES
- **CRM**: In-app CRM (custom) + optional HubSpot sync later
- **Hosting**: Vercel (frontend) + Railway/Render/AWS ECS (backend)
- **Observability**: Sentry + PostHog + Grafana Cloud (later)

---

## 16) MVP Plan (30-Day)

### Day 1–5
- Branding, legal pages, landing, eligibility wizard
- DB setup + auth + lead capture

### Day 6–10
- Razorpay integration + webhooks
- Customer dashboard basic
- Document upload module

### Day 11–15
- Admin CRM: lead list, stages, notes
- Email + WhatsApp templates

### Day 16–20
- Automation triggers + reminder scheduler
- Review summary generation screen

### Day 21–25
- Analytics (GA4, pixel, funnel events)
- QA + security hardening

### Day 26–30
- Soft launch in 1 city/segment
- SOP for daily ops
- First ad campaigns + retargeting

### Cost Estimate (Monthly, early stage)
- Hosting + DB + storage: ₹4k–₹12k
- WhatsApp + SMS + email: ₹3k–₹10k (volume based)
- Ads test budget: ₹20k–₹75k
- Misc tools: ₹2k–₹8k
- **Total**: ~₹29k–₹1.05L/month

---

## 17) Wireframes, User Flows, Automation Flows, Folder Structure, APIs, Deployment

### 17.1 Wireframe (Text)

```text
[Landing]
Top Nav | Hero + CTA | Trust Badges | How It Works | Pricing | Testimonials | FAQ | Footer Disclaimer

[Eligibility Wizard]
Step Indicator (1/4) -> Inputs -> Next -> Review -> Result + CTA (Pay & Continue)

[Customer Dashboard]
Header
| Status Card | Progress Ring |
| Pending Docs Checklist |
| Timeline |
| Notifications |
| Support |

[Admin CRM]
Sidebar: Leads, Docs, Payments, Automations, Reports, Settings
Main: Pipeline/Kanban + lead details drawer
```

### 17.2 User Flow Diagram

```text
Ad/SEO -> Landing -> Eligibility -> Plan Select -> Payment -> Account OTP -> Upload Docs -> Review -> Lender Match Advisory -> Ongoing Updates -> Closure
```

### 17.3 Automation Flow Diagram

```text
Event: payment_success
   -> create lead stage PAID_AWAITING_DOCS
   -> send email receipt
   -> send whatsapp confirmation
   -> schedule doc reminder (T+24h)
   -> if docs complete => assign reviewer
   -> reviewer submits review => send status update
```

### 17.4 Suggested Folder Structure

```text
/apps
  /web (Next.js marketing + customer)
  /admin (Next.js CRM)
/services
  /api-gateway
  /auth-service
  /lead-service
  /payment-service
  /document-service
  /notification-service
  /automation-worker
/packages
  /ui
  /types
  /config
/infrastructure
  /terraform
  /docker
/docs
  /sop
  /compliance
```

### 17.5 API Endpoints (Sample)
- `POST /api/v1/auth/send-otp`
- `POST /api/v1/auth/verify-otp`
- `POST /api/v1/leads/precheck`
- `POST /api/v1/payments/create-order`
- `POST /api/v1/payments/webhook/razorpay`
- `POST /api/v1/documents/presign`
- `POST /api/v1/documents/confirm-upload`
- `GET /api/v1/customer/dashboard`
- `GET /api/v1/customer/leads/:id/status`
- `POST /api/v1/crm/leads/:id/assign`
- `POST /api/v1/crm/leads/:id/stage`
- `POST /api/v1/crm/leads/:id/notes`
- `POST /api/v1/notifications/test`
- `GET /api/v1/reports/funnel`

### 17.6 Deployment Strategy
- Environment split: dev / staging / prod
- CI/CD: GitHub Actions
- DB migrations with Prisma/Drizzle
- Feature flags for gradual rollout
- Backups:
  - DB snapshot daily
  - object storage versioning
- DR target:
  - RPO < 24h for MVP
  - RTO < 4h

---

## 18) Execution SOP for 1–2 Person Team

### Daily Rhythm
- 9:00–10:00: new paid lead review
- 10:00–1:00: document verification + follow-ups
- 2:00–4:00: lender mapping + updates
- 4:00–6:00: outbound reminders + CRM cleanup
- 6:00–6:30: dashboard/report check

### Weekly Rhythm
- Monday: pipeline audit
- Wednesday: campaign optimization
- Friday: testimonial & review requests
- Saturday: blog/FAQ publish

---

## Compliance & Trust Copy Snippets (Ready to Use)

- “We provide loan assistance, profile review, and documentation support.”
- “We are not a bank or NBFC. Final approval is solely at lender discretion.”
- “Review fee covers advisory and processing support; it does not guarantee sanction.”
- “Timelines vary by lender and applicant profile.”

---

## Final Blueprint Outcome
This architecture gives you a **legally safer**, **trust-first**, **automation-heavy**, and **mobile-first** SaaS platform that can be operated by **1–2 team members** initially, while remaining ready for scale (multi-agent, multi-city, and multi-lender expansion).
