import { KPICards } from '@/components/dashboard/KPICards';
import { SensitivityChart } from '@/components/dashboard/SensitivityChart';
import { SavingsChart } from '@/components/dashboard/SavingsChart';
import { ModelPerformance } from '@/components/dashboard/ModelPerformance';
import { LoadingState } from '@/components/shared/LoadingState';
import { useRole } from '@/hooks/useRole';
import { useMetrics } from '@/hooks/useMetrics';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { mockModelPerformance, mockModelPerformanceTrend } from '@/data/mockModelPerformance';

export function DashboardPage() {
  const { currentRole } = useRole();
  const { metrics, savingsTrend, sensitivityDistribution, loading, error } = useMetrics(currentRole);

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
          <CardContent className="flex items-center gap-3 p-6">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Error Loading Dashboard</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading || !metrics) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentRole === 'TBW' 
              ? 'Transaction Banking Wholesale - Overview' 
              : 'Retail Deposit Product & Solution - Overview'}
          </p>
        </div>
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {currentRole === 'TBW' 
            ? 'Transaction Banking Wholesale - Overview' 
            : 'Retail Deposit Product & Solution - Overview'}
        </p>
      </div>

      {/* KPI Cards */}
      <section>
        <KPICards metrics={metrics} loading={loading} />
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 md:grid-cols-2">
        <SensitivityChart data={sensitivityDistribution} loading={loading} />
        <SavingsChart data={savingsTrend} loading={loading} />
      </section>

      {/* Model Performance Section */}
      <section className="mt-8">
        <ModelPerformance 
          metrics={mockModelPerformance} 
          trend={mockModelPerformanceTrend}
          loading={loading}
        />
      </section>

      {/* Additional Info */}
      <section className="mt-8">
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  AI-Powered Interest Rate Optimization
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Dashboard ini menampilkan rekomendasi suku bunga optimal berbasis machine learning 
                  untuk memaksimalkan penghematan cost of funds sambil meminimalkan risiko churn nasabah.
                  {currentRole === 'TBW' 
                    ? ' Gunakan menu TBW View untuk melihat detail per nasabah wholesale.'
                    : ' Gunakan menu RDPS View untuk melihat detail per segmen nasabah retail.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
