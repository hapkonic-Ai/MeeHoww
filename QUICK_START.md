# MEEHOWW - Quick Start Guide

## Start Development (1 minute)

```bash
# 1. Copy environment file
cp .env.example .env.local

# 2. Edit .env.local with your Neon database URL
# DATABASE_URL=postgresql://user:password@host/dbname

# 3. Install dependencies
pnpm install

# 4. Start development server
pnpm dev
```

Visit: **http://localhost:3000**

## Test the App (5 minutes)

1. **Sign Up** → http://localhost:3000/auth/signup
   - Email: `test@example.com`
   - Password: `password123` (min 8 chars)

2. **Login** → http://localhost:3000/auth/login
   - Use same credentials

3. **Explore Features**:
   - Dashboard: http://localhost:3000/dashboard
   - Pet Management: http://localhost:3000/pets
   - Services: http://localhost:3000/services
   - Pet Shop: http://localhost:3000/shop
   - Pet Adoption: http://localhost:3000/adoption
   - Hospital: http://localhost:3000/hospital

## Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| Dashboard | `/dashboard` | User dashboard |
| My Pets | `/pets` | Manage pets |
| Profile | `/profile` | Edit profile |
| Services | `/services` | Browse services |
| Bookings | `/bookings` | View bookings |
| Pet Shop | `/shop` | Browse products |
| Cart | `/shop/cart` | Shopping cart |
| Orders | `/orders` | View orders |
| Adoption | `/adoption` | Browse pets |
| Applications | `/adoption/applications` | Track applications |
| Hospital | `/hospital` | Hospital info |
| Appointments | `/hospital/appointments` | Book appointments |
| Emergency | `/hospital/emergency` | Emergency request |
| Fundraising | `/fundraising` | View campaigns |

## Database Setup

### Option 1: Use Existing Schema (Recommended)
Already included in `/scripts/01-create-schema.sql`

### Option 2: Manual Setup

1. Create Neon account: https://neon.tech
2. Get connection string
3. Add to `.env.local`: `DATABASE_URL=...`
4. Run schema from `/scripts/01-create-schema.sql`

### Test Connection
```bash
psql $DATABASE_URL -c "SELECT 1"
```

## Common Tasks

### Add a Test User to Database
```sql
INSERT INTO users (id, email, name, password_hash, role, created_at)
VALUES (
  'test-id', 
  'test@example.com', 
  'Test User',
  '$2a$10$...', -- Use signup to create proper hash
  'customer',
  NOW()
);
```

### View Database Tables
```bash
psql $DATABASE_URL -c "\dt"
```

### Check User Records
```bash
psql $DATABASE_URL -c "SELECT id, email, name, role FROM users;"
```

## Build for Production

```bash
pnpm build
pnpm start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect GitHub repository to Vercel dashboard.

## Environment Variables

**Required:**
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - Your app URL (default: http://localhost:3000)

**Optional:**
- `BLOB_READ_WRITE_TOKEN` - For image storage (Vercel Blob)

## Troubleshooting

### Page shows blank/404
- Check browser console (F12)
- Verify route exists
- Restart dev server: `pnpm dev`

### Database connection error
- Verify `DATABASE_URL` is correct
- Check Neon dashboard
- Ensure database is running
- Test: `psql $DATABASE_URL -c "SELECT 1"`

### Can't login
- Verify database has user record
- Check password hash (use signup to create)
- Check browser localStorage

### Styles not loading
- Run: `pnpm install`
- Restart server: `pnpm dev`

## File Structure

```
meehoww/
├── app/                  # Pages and API routes
├── components/           # React components
├── lib/                  # Utilities
├── scripts/              # Database migrations
├── public/               # Static files
├── auth.ts              # Authentication
├── package.json         # Dependencies
└── .env.example         # Environment template
```

## Documentation

- **README.md** - Overview and features
- **IMPLEMENTATION.md** - Technical details
- **SETUP_GUIDE.md** - Detailed setup
- **PROJECT_STATUS.md** - Project status
- **QUICK_START.md** - This file

## Important Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Format code
pnpm format
```

## API Quick Reference

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get pets
curl http://localhost:3000/api/pets \
  -H "Authorization: Bearer token"

# Create pet
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 2
  }'
```

## Features Included

✅ User authentication (signup/login)
✅ Pet management
✅ Service bookings
✅ Pet shop with cart
✅ Pet adoption system
✅ Hospital appointments
✅ Emergency requests
✅ Fundraising
✅ User profiles
✅ Responsive design

## Need Help?

1. Check troubleshooting section
2. Review error message in browser
3. Check console logs (F12)
4. See SETUP_GUIDE.md for detailed help
5. Review IMPLEMENTATION.md for architecture

## Next Steps

1. ✅ Run app locally
2. ✅ Create test account
3. ✅ Explore features
4. ✅ Deploy to Vercel
5. ⏳ Add payment integration (future)

---

**All set!** Your MEEHOWW platform is ready to go! 🚀

For detailed information, see README.md or SETUP_GUIDE.md
