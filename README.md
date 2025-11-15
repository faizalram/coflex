# AI Interest Rate Optimizer

A modern web dashboard MVP for demonstrating AI-powered interest rate optimization for banking divisions (TBW and RDPS).

## Documentation

- **[User Guide](USER_GUIDE.md)** - Complete guide for end users on how to use the application
- **[Technical Documentation](#getting-started)** - Developer setup and technical details (below)

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router v6
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (AppLayout, Header, Sidebar)
│   ├── dashboard/       # Dashboard page components
│   ├── tbw/             # TBW view components
│   ├── rdps/            # RDPS view components
│   ├── simulator/       # What-if simulator components
│   └── shared/          # Shared utility components
├── pages/               # Page components
├── services/            # Data service layer
├── data/                # Mock data files
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── lib/                 # Library utilities (shadcn/ui)
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Environment Variables

- `VITE_APP_MODE`: Application mode (`mock` or `api`)
  - `mock`: Use mock data service (default, for development/demo)
  - `api`: Use external API service (when backend is available)
- `VITE_API_BASE_URL`: API base URL (required when `VITE_APP_MODE=api`)
- `VITE_APP_VERSION`: Application version

### Data Mode Configuration

The application supports two data modes:

1. **Mock Mode** (Default): Uses local mock data for development and demonstrations
   - Set `VITE_APP_MODE=mock` in `.env`
   - No backend required
   - Realistic simulated data with delays

2. **API Mode**: Connects to external backend API
   - Set `VITE_APP_MODE=api` in `.env`
   - Set `VITE_API_BASE_URL` to your API endpoint
   - Requires backend API to be running

**Development Indicator**: In development mode, a badge appears in the bottom-right corner showing the current data mode (MOCK or API).

## Features

- **Dashboard**: Overview with KPI metrics and visualizations
- **TBW View**: Wholesale customer interest rate recommendations
- **RDPS View**: Retail segment interest rate recommendations
- **What-if Simulator**: Interactive scenario simulation
- **Role Switching**: Toggle between TBW and RDPS views
- **Dark Mode**: Light and dark theme support with automatic persistence
- **Mock Data**: Realistic Indonesian banking data for demonstration

## Development Notes

- TypeScript is configured with strict mode
- Path aliases are configured (`@/` points to `src/`)
- Tailwind CSS is configured with custom banking color palette
- Inter font family is used throughout the application

## Testing

### Automated Tests

Run unit and integration tests:
```bash
npm test
```

### Manual Testing

Comprehensive testing documentation is available:
- **TESTING_REPORT.md**: Complete test execution report with results
- **MANUAL_TESTING_CHECKLIST.md**: Step-by-step manual testing guide
- **ACCESSIBILITY_CHECKLIST.md**: Accessibility compliance checklist

### Test Coverage

- ✅ Data consistency validation
- ✅ TypeScript compilation (zero errors)
- ✅ Component diagnostics
- ✅ Utility function tests
- ✅ Mock data service validation
- ✅ Routing and navigation
- ✅ Build process verification

### Quality Metrics

- **TypeScript**: Strict mode, zero errors
- **Build Size**: ~819KB (optimization recommended)
- **Test Pass Rate**: 100% (14/14 tests passing)
- **Data Consistency**: Verified across all views
- **Accessibility**: WCAG 2.1 Level AA compliant (pending manual verification)

## Known Issues

### Node.js Version Requirement
- **Issue**: Vite dev server requires Node.js 20.19+ or 22.12+
- **Current**: Node.js 20.10.0 detected
- **Impact**: Development server won't start
- **Workaround**: Production build works correctly
- **Solution**: Upgrade Node.js to 20.19+ or 22.12+

### Bundle Size
- **Issue**: Initial bundle is ~819KB (target: <500KB)
- **Impact**: Slightly slower initial load
- **Recommendation**: Implement additional code splitting and lazy loading
- **Priority**: Medium (acceptable for MVP)

## Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be live at: `https://faizalram.github.io/coflex/`

The deployment workflow runs on every push to `main` and can also be triggered manually from the Actions tab.

### Manual Production Build

1. Ensure Node.js version meets requirements (20.19+ or 22.12+)
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. Deploy the `dist/` folder to your hosting service

### Alternative Hosting Options

- **Vercel**: Zero-config deployment for Vite apps
- **Netlify**: Simple drag-and-drop deployment
- **AWS S3 + CloudFront**: Enterprise-grade hosting

### Pre-Deployment Checklist

- [ ] Node.js version upgraded to 20.19+ or 22.12+
- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Lighthouse audit score >90
- [ ] Cross-browser testing completed
- [ ] Accessibility testing completed
- [ ] Stakeholder demo approved

## Documentation

- **requirements.md**: Feature requirements and acceptance criteria
- **design.md**: Technical design and architecture
- **tasks.md**: Implementation task list
- **TESTING_REPORT.md**: Comprehensive testing report
- **MANUAL_TESTING_CHECKLIST.md**: Manual testing procedures
- **ACCESSIBILITY_CHECKLIST.md**: Accessibility guidelines and compliance

## Support

For questions or issues, please contact the development team.

## License

Private - Internal use only
