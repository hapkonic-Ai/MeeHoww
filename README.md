# MEEHOWW - Pet Ecosystem Platform

A comprehensive pet care platform built with Next.js 16, React 19, and Neon PostgreSQL that connects pet lovers with adoption services, grooming, training, emergency veterinary care, pet shopping, and fundraising.

## Overview

MEEHOWW provides a unified ecosystem for:
- **Pet Adoption** - Browse adoptable pets (free and paid adoptions)
- **Services** - Book professional grooming, training, and pet sitting
- **Pet Shop** - Purchase pet products and supplies
- **Pet Hospital** - Regular appointments and 24/7 emergency services
- **User Dashboard** - Manage pets, bookings, and profile
- **Fundraising** - Support animal welfare campaigns
- **Contact** - Get in touch with the platform

## Tech Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: Neon (Serverless PostgreSQL)
- **Storage**: Vercel Blob (for pet photos)
- **Authentication**: Custom session management with localStorage
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm

## Project Structure

```
meehoww/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── auth/
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Signup page
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts    # Login endpoint
│   │       └── signup/route.ts   # Signup endpoint
│   ├── dashboard/page.tsx         # User dashboard
│   ├── adoption/                  # Pet adoption pages
│   ├── services/                  # Services booking
│   ├── shop/                      # Pet shop
│   ├── hospital/                  # Hospital services
│   ├── fundraising/               # Fundraising campaigns
│   ├── profile/page.tsx          # User profile
│   └── ...
├── components/
│   ├── layout/
│   │   ├── header.tsx            # Main navigation header
│   │   └── footer.tsx            # Site footer
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── auth-client.ts            # Client-side auth utilities
│   └── utils.ts                  # Helper utilities
├── auth.ts                        # Authentication logic
├── scripts/
│   └── 01-create-schema.sql      # Database schema
└── public/                        # Static files
```

## Database Schema

The platform uses 14 main tables:

- **users** - User accounts with roles
- **pets** - Pet profiles owned by users
- **adoption_listings** - Adoptable pets (free/paid)
- **adoption_applications** - Adoption requests
- **services** - Available services (grooming, training, etc.)
- **service_bookings** - Booked services
- **products** - Pet shop items
- **product_orders** - Orders for products
- **fundraisers** - Fundraising campaigns
- **emergency_requests** - Emergency vet requests
- **hospital_appointments** - Regular vet appointments
- **bookmarks** - User favorites
- **reviews** - Service/product reviews
- **audit_log** - Activity tracking

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Neon PostgreSQL account
- Vercel Blob account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meehoww
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Update `.env.local` with:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `NEXT_PUBLIC_API_URL` - API endpoint (default: http://localhost:3000)

5. **Initialize the database**
   ```bash
   npm run db:init
   ```

6. **Run the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

## Authentication

The platform uses a custom authentication system with:

- **Password Hashing**: bcryptjs (10 salt rounds)
- **Session Storage**: localStorage (client-side)
- **API-based**: Custom `/api/auth/login` and `/api/auth/signup` endpoints
- **Protected Routes**: Automatic redirect to login for unauthenticated users

### User Roles

- **customer** - Regular users (default)
- **service_provider** - Can offer services
- **veterinarian** - Can manage hospital services
- **admin** - Full platform access

## Key Features

### 1. User Management
- Sign up with email and password
- Profile management
- Pet profile management
- View booking history

### 2. Pet Adoption
- Browse adoptable pets
- Filter by type, age, size
- Submit adoption applications
- Track application status
- Support both free and paid adoptions

### 3. Services
- Browse professional services
- Book appointments with date/time selection
- View service details and ratings
- Manage bookings

### 4. Pet Shop
- Browse pet products
- Add to cart
- Checkout process
- Order tracking

### 5. Pet Hospital
- Browse hospital services
- Book regular appointments
- 24/7 emergency request system
- Hospital information and FAQ

### 6. Fundraising
- View active campaigns
- Campaign details and progress
- Contact for donations

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Pets
- `GET /api/pets` - Get user's pets
- `POST /api/pets` - Create new pet
- `PUT /api/pets/[id]` - Update pet
- `DELETE /api/pets/[id]` - Delete pet

### Services
- `GET /api/services` - List all services
- `POST /api/bookings` - Create booking

### Adoption
- `GET /api/adoption/listings` - Get adoptable pets
- `POST /api/adoption/applications` - Submit application

### Hospital
- `GET /api/hospital/appointments` - Get appointments
- `POST /api/hospital/emergency` - Emergency request

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
pnpm start
```

### Code Quality
```bash
pnpm lint
```

## Database Migrations

Migrations are SQL scripts in `/scripts`:

```bash
# Run migrations
npm run db:migrate
```

To create a new migration:
1. Create `scripts/XX-name.sql`
2. Run with the SystemAction executeScript tool

## Performance Optimizations

- Server-side rendering for SEO
- Client-side caching with localStorage
- Database query optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading

## Security Features

- Password hashing with bcryptjs
- SQL injection prevention via parameterized queries
- CSRF protection
- Input validation and sanitization
- Environment variable management
- Secure session handling

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

```bash
vercel deploy
```

### Environment Setup for Production

1. Set up Neon PostgreSQL production database
2. Configure Vercel Blob for production
3. Update `.env.production.local` with production URLs
4. Run database migrations on production

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon dashboard for active connections
- Ensure IP allowlist includes your server

### Missing Dependencies
```bash
pnpm install
```

### Build Errors
```bash
pnpm clean
pnpm install
pnpm build
```

### Authentication Issues
- Clear browser cache and localStorage
- Verify user credentials in database
- Check API endpoint responses in browser DevTools

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests and linting
4. Submit pull request

## Future Enhancements

- Payment gateway integration (Stripe)
- Email notifications
- Real-time notifications
- Advanced search and filters
- User ratings and reviews
- Admin dashboard
- Mobile app
- API rate limiting
- Analytics dashboard

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/meehoww/platform/issues)
- Contact: support@meehoww.com

## Acknowledgments

Built with:
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Neon
- Vercel
