import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { PageTransition } from '@/components/shared/PageTransition';
import { DataModeIndicator } from '@/components/shared/DataModeIndicator';
import { RoleProvider } from '@/hooks/useRole';
import { DashboardPage } from '@/pages/DashboardPage';
import { TBWPage } from '@/pages/TBWPage';
import { RDPSPage } from '@/pages/RDPSPage';
import { SimulatorPage } from '@/pages/SimulatorPage';

function App() {
  return (
    <ErrorBoundary>
      <RoleProvider>
        <BrowserRouter>
          <AppLayout>
            <PageTransition>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tbw" element={<TBWPage />} />
                <Route path="/rdps" element={<RDPSPage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
              </Routes>
            </PageTransition>
          </AppLayout>
          <DataModeIndicator />
        </BrowserRouter>
      </RoleProvider>
    </ErrorBoundary>
  );
}

export default App;
