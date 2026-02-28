# MEEHOWW Platform - Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- A Neon PostgreSQL account and database
- A text editor or IDE

### 1. Clone/Setup Project

```bash
# Navigate to project directory
cd meehoww

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your actual values
```

**Required Environment Variables:**
```env
DATABASE_URL=postgresql://user:password@host/dbname
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Initialize Database

The database schema has already been created via SQL migration in `/scripts/01-create-schema.sql`.

If you need to recreate it:
1. Log into your Neon database
2. Run the SQL from `/scripts/01-create-schema.sql`

### 4. Run Development Server

```bash
pnpm dev
```

Server runs at: **http://localhost:3000**

### 5. Test the Application

1. **Sign Up**: Go to http://localhost:3000/auth/signup
   - Create an account with email and password
   - Redirects to dashboard

2. **Login**: Go to http://localhost:3000/auth/login
   - Use your credentials

3. **Browse Features**:
   - Dashboard: http://localhost:3000/dashboard
   - Pets: http://localhost:3000/pets
   - Services: http://localhost:3000/services
   - Pet Shop: http://localhost:3000/shop
   - Adoption: http://localhost:3000/adoption
   - Hospital: http://localhost:3000/hospital
   - Fundraising: http://localhost:3000/fundraising

## Database Setup Details

### Creating a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create a new project
4. Copy the connection string (will look like: `postgresql://user:password@ep-xxxxx.neon.tech/dbname`)

### Database Connection String Format

```
postgresql://[user]:[password]@[host]/[database]
```

Example:
```
postgresql://neondb_owner:password123@ep-abc123.neon.tech/neondb
```

### Verifying Database Connection

```bash
# Test connection (inside project directory)
node -e "const sql = require('@neondatabase/serverless').neon(process.env.DATABASE_URL); sql\`SELECT 1\`.then(() => console.log('✓ Connection successful')).catch(e => console.log('✗ Connection failed:', e.message))"
```

## Folder Structure Explained

```
meehoww/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx       # User dashboard
│   ├── adoption/                # Pet adoption feature
│   ├── services/                # Services booking
│   ├── shop/                    # Pet shop
│   ├── hospital/                # Veterinary services
│   ├── fundraising/             # Fundraising campaigns
│   ├── api/                     # API endpoints
│   │   └── auth/
│   │       ├── login/route.ts
│   │       └── signup/route.ts
│   └── ...
├── components/
│   ├── layout/                  # Header, footer
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── auth-client.ts          # Client auth utilities
│   └── utils.ts                # Helper functions
├── scripts/
│   └── 01-create-schema.sql    # Database schema
├── public/                      # Static files
├── auth.ts                      # Authentication logic
├── package.json
├── tsconfig.json
├── .env.example                # Environment template
├── README.md                   # Main documentation
├── IMPLEMENTATION.md           # Implementation details
└── SETUP_GUIDE.md             # This file
```

## Key Features & Usage

### 1. Authentication

**Sign Up**
- Email and password required
- Passwords hashed with bcryptjs
- Auto-redirects to login after signup

**Login**
- Email and password authentication
- Session stored in localStorage
- Auto-redirect to dashboard

**Protected Routes**
- Automatically redirect to login if not authenticated
- All dashboard/user pages require login

### 2. User Management

**Profile Page** (`/profile`)
- View and edit user information
- Name, email, contact details
- Address and preferences

**Dashboard** (`/dashboard`)
- User greeting
- Quick access to all features
- Logout button
- Recent activity summary

### 3. Pet Management

**My Pets** (`/pets`)
- View all user's pets
- Add new pets with details
- Edit pet information
- Delete pets

### 4. Services

**Browse Services** (`/services`)
- Filter by category
- View service details
- Provider information
- Customer ratings

**Book Service** (`/services/[id]`)
- Select pet for booking
- Choose date and time
- Add special notes
- Confirm booking

**My Bookings** (`/bookings`)
- View all bookings
- Filter by status
- Reschedule or cancel
- View booking details

### 5. Pet Shop

**Browse Products** (`/shop`)
- Search pet products
- Filter by category
- View product details
- Add to cart

**Shopping Cart** (`/shop/cart`)
- View cart items
- Update quantities
- Proceed to checkout
- Enter delivery address

**My Orders** (`/orders`)
- View order history
- Track order status
- Reorder products

### 6. Pet Adoption

**Browse Pets** (`/adoption`)
- View adoptable pets
- Filter by type/age/size
- View pet profiles
- Submit applications

**Pet Profile** (`/adoption/[id]`)
- Full pet information
- Pet story and background
- Adoption requirements
- Application form

**My Applications** (`/adoption/applications`)
- View all applications
- Check application status
- Track adoption progress

### 7. Pet Hospital

**Hospital Services** (`/hospital`)
- Information about hospital
- Services offered
- Emergency hotline
- FAQs

**Book Appointment** (`/hospital/appointments`)
- Browse available slots
- Select service type
- Choose pet
- Add notes for vet

**Emergency Requests** (`/hospital/emergency`)
- Quick emergency form
- Real-time tracking
- 24/7 availability
- Status updates

## API Endpoints Reference

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

### Pets

```http
GET /api/pets
Authorization: Bearer token

Response: 200 OK
{
  "pets": [
    {
      "id": "uuid",
      "name": "Max",
      "species": "Dog",
      "breed": "Golden Retriever",
      ...
    }
  ]
}
```

```http
POST /api/pets
Content-Type: application/json

{
  "name": "Max",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 2,
  "weight": 70,
  "description": "Friendly dog"
}

Response: 201 Created
{ "pet": {...} }
```

## Troubleshooting

### Issue: "Module not found: Can't resolve 'next-auth/react'"

**Solution**: This has been fixed in the latest version. If it persists:
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `pnpm install`
3. Restart dev server: `pnpm dev`

### Issue: Database connection fails

**Solution**:
1. Verify DATABASE_URL in .env.local
2. Check Neon dashboard for active connections
3. Ensure IP allowlist includes your IP
4. Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### Issue: Blank page after login

**Solution**:
1. Check browser console for errors (F12)
2. Verify localStorage has user data
3. Check API responses in Network tab
4. Clear cache and reload

### Issue: Can't create account

**Solution**:
1. Ensure password is at least 8 characters
2. Check if email already exists
3. Verify database schema is initialized
4. Check server logs for errors

### Issue: Services not loading

**Solution**:
1. Verify API endpoint is accessible
2. Check database connection
3. Ensure services table has data
4. Review API error responses

## Building for Production

### 1. Build the Project

```bash
pnpm build
```

### 2. Test Production Build

```bash
pnpm start
```

### 3. Deploy to Vercel

**Option A: Git Integration**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

**Option B: Vercel CLI**
```bash
npm install -g vercel
vercel
```

### 4. Environment Variables for Production

Add to Vercel project settings:
- `DATABASE_URL` - Production database URL
- `NEXT_PUBLIC_API_URL` - Production domain

### 5. Database Setup for Production

1. Create production Neon database
2. Run migrations on production database
3. Verify database connection
4. Test all endpoints

## Performance Optimization Tips

1. **Database Queries**
   - Add indexes for frequently queried columns
   - Use connection pooling
   - Cache results when possible

2. **Frontend**
   - Use Next.js Image component for images
   - Lazy load components
   - Minimize third-party scripts

3. **API**
   - Implement caching
   - Add rate limiting
   - Compress responses

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Track user analytics

## Security Best Practices

1. **Authentication**
   - Never store sensitive data in localStorage (future: use httpOnly cookies)
   - Hash passwords with bcryptjs
   - Validate all inputs

2. **Database**
   - Use parameterized queries (prevents SQL injection)
   - Implement RLS policies
   - Backup regularly

3. **API**
   - Validate request data
   - Implement rate limiting
   - Use HTTPS only
   - Add CORS headers

4. **General**
   - Keep dependencies updated
   - Use environment variables for secrets
   - Implement logging
   - Regular security audits

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Neon Docs](https://neon.tech/docs)

### Community
- GitHub Issues: Report bugs and feature requests
- Discussions: Ask questions and share ideas

### Getting Help
1. Check the README.md for general info
2. Review IMPLEMENTATION.md for architecture
3. Check troubleshooting section above
4. Review console logs and API responses
5. Contact support if needed

## Next Steps

### Phase 1 (In Progress)
- Core platform setup ✅
- Basic features ✅
- Authentication ✅

### Phase 2 (Planned)
- Payment gateway integration
- Email notifications
- Real-time updates
- Admin dashboard

### Phase 3 (Planned)
- Mobile app
- Advanced analytics
- Recommendation engine
- Social features

## Feedback & Contributions

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Last Updated**: March 1, 2026
**Version**: 1.0.0
**Status**: Production Ready
