# FinFlow Assist

**Loan Assistance & Eligibility Review SaaS Platform**

> ⚠️ **DISCLAIMER**: FinFlow Assist is NOT a bank or NBFC. We provide loan eligibility review, documentation assistance, and consultation services only. Loan approval depends entirely on lender eligibility criteria.

## 🚀 Quick Start

```bash
# Install dependencies (when disk space available)
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## 📁 Project Structure

```
finflow-assist/
├── src/                    # Next.js Frontend
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   └── types/              # TypeScript types
├── backend/                # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth & validation
│   │   └── routes/         # API routes
│   └── prisma/             # Database schema
├── automation/             # Make.com/n8n workflows
└── docs/                   # Documentation
```

## 🎯 Features

### For Customers
- ✅ Mobile OTP Login
- ✅ Eligibility Check Form
- ✅ Document Upload
- ✅ Application Tracking
- ✅ Payment Integration (Razorpay)
- ✅ Real-time Notifications
- ✅ Support Chat

### For Admins
- ✅ CRM Pipeline Management
- ✅ Lead Assignment
- ✅ Document Verification
- ✅ Analytics Dashboard
- ✅ Employee Management
- ✅ Activity Logs
- ✅ Bulk Operations

### Automation
- ✅ Email Confirmations
- ✅ WhatsApp Updates
- ✅ Payment Receipts
- ✅ Document Reminders
- ✅ Follow-up Sequences
- ✅ Status Notifications

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Basic Review | ₹199 | Eligibility assessment, document checklist, email support, 48hr turnaround |
| Priority Review | ₹399 | Everything in Basic + priority processing, WhatsApp support, 24hr turnaround |

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT + OTP
- **Storage**: AWS S3
- **Payments**: Razorpay
- **Email**: Nodemailer/SendGrid
- **Automation**: Make.com/n8n

## 📋 API Documentation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for complete API reference.

## 🔐 Security

- JWT-based authentication
- OTP verification for login
- Role-based access control (RBAC)
- Encrypted document storage
- Rate limiting
- Audit logging
- HTTPS enforcement

## 📄 Legal

- [Terms & Conditions](docs/TERMS.md)
- [Privacy Policy](docs/PRIVACY.md)
- [Refund Policy](docs/REFUND.md)
- [Disclaimer](docs/DISCLAIMER.md)

## 🤝 Contributing

This is a private project. Contact the maintainer for access.

## 📞 Support

- Email: support@finflowassist.com
- WhatsApp: +91-XXXXXXXXXX
- Hours: 9 AM - 6 PM IST

---

**FinFlow Assist** - Empowering Smart Financial Decisions

Built with ❤️ for Indian entrepreneurs
