import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Percent, PiggyBank, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercentage, formatNumber } from '@/utils/formatters';
import type { KPIMetrics } from '@/types/metrics';

interface KPICardsProps {
  metrics: KPIMetrics;
  loading?: boolean;
}

interface KPICardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass: string;
}

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1000, shouldAnimate: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldAnimate]);

  return count;
}

function KPICard({ data, loading }: { data: KPICardData; loading?: boolean }) {
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {data.title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${data.colorClass} bg-opacity-10 dark:bg-opacity-20`}>
            {data.icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-2"></div>
          {data.trend && (
            <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24"></div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${data.colorClass} bg-opacity-10 dark:bg-opacity-20`}>
          {data.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{data.value}</div>
        {data.trend && (
          <div className="flex items-center text-xs">
            {data.trend.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1 text-green-500 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1 text-red-500 dark:text-red-400" />
            )}
            <span className={data.trend.isPositive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
              {data.trend.value > 0 ? '+' : ''}{data.trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">vs bulan lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KPICards({ metrics, loading = false }: KPICardsProps) {
  // Animated counters for each metric
  const animatedDPK = useAnimatedCounter(metrics.totalDPK, 7000, !loading);
  const animatedSavings = useAnimatedCounter(metrics.projectedSavings, 7000, !loading);
  const animatedCustomers = useAnimatedCounter(metrics.customerCount, 7000, !loading);
  const animatedHighRisk = useAnimatedCounter(metrics.highRiskCount, 7000, !loading);

  const kpiData: KPICardData[] = [
    {
      title: 'Total DPK',
      value: formatCurrency(animatedDPK, true),
      icon: <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: {
        value: 5.2,
        isPositive: true,
      },
      colorClass: 'bg-blue-600',
    },
    {
      title: 'Rata-rata Suku Bunga',
      value: formatPercentage(metrics.averageRate),
      icon: <Percent className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      trend: {
        value: -0.3,
        isPositive: true, // Lower rate is positive for cost savings
      },
      colorClass: 'bg-purple-600',
    },
    {
      title: 'Proyeksi Penghematan',
      value: formatCurrency(animatedSavings, true),
      icon: <PiggyBank className="w-5 h-5 text-green-600 dark:text-green-400" />,
      trend: {
        value: 12.8,
        isPositive: true,
      },
      colorClass: 'bg-green-600',
    },
    {
      title: 'Nasabah Risiko Tinggi',
      value: `${formatNumber(animatedHighRisk)} / ${formatNumber(animatedCustomers)}`,
      icon: <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
      trend: {
        value: -8.5,
        isPositive: true, // Lower risk count is positive
      },
      colorClass: 'bg-orange-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((data, index) => (
        <KPICard key={index} data={data} loading={loading} />
      ))}
    </div>
  );
}
