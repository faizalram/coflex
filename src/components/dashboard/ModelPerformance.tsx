import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Target, TrendingUp, Zap } from 'lucide-react';
import { formatPercentage } from '@/utils/formatters';
import type { ModelPerformanceMetrics, ModelPerformanceTrend } from '@/types/modelPerformance';

interface ModelPerformanceProps {
  metrics: ModelPerformanceMetrics;
  trend: ModelPerformanceTrend[];
  loading?: boolean;
}

interface MetricCardData {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

function MetricGaugeCard({ data, loading }: { data: MetricCardData; loading?: boolean }) {
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-2"></div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  // Calculate gauge fill percentage
  const fillPercentage = data.value;
  const rotation = (fillPercentage / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{data.title}</h3>
          <div className={`p-2 rounded-lg ${data.bgColor} dark:bg-opacity-20`}>
            {data.icon}
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-2" style={{ color: data.color }}>
          {formatPercentage(data.value)}
        </div>

        {/* Gauge visualization */}
        <div className="relative h-16 mb-2">
          <div className="absolute inset-0 flex items-end justify-center">
            {/* Background arc */}
            <svg width="120" height="60" viewBox="0 0 120 60" className="overflow-visible">
              <path
                d="M 10 50 A 50 50 0 0 1 110 50"
                fill="none"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Filled arc */}
              <path
                d="M 10 50 A 50 50 0 0 1 110 50"
                fill="none"
                stroke={data.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(fillPercentage / 100) * 157} 157`}
                className="transition-all duration-1000 ease-out"
              />
              {/* Needle */}
              <line
                x1="60"
                y1="50"
                x2="60"
                y2="15"
                stroke={data.color}
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${rotation} 60 50)`}
                className="transition-all duration-1000 ease-out"
              />
              <circle cx="60" cy="50" r="4" fill={data.color} />
            </svg>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">{data.description}</p>
      </CardContent>
    </Card>
  );
}

function PerformanceTrendChart({ data, loading }: { data: ModelPerformanceTrend[]; loading?: boolean }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-64"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Performa Model</CardTitle>
        <CardDescription>
          Performa model ML dalam 12 bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'currentColor' }}
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <YAxis
              domain={[80, 100]}
              tick={{ fontSize: 12, fill: 'currentColor' }}
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--foreground)',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Accuracy"
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="precision"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Precision"
              animationBegin={100}
              animationDuration={500}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="recall"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Recall"
              animationBegin={200}
              animationDuration={500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ModelPerformance({ metrics, trend, loading = false }: ModelPerformanceProps) {
  const metricsData: MetricCardData[] = [
    {
      title: 'Accuracy',
      value: metrics.accuracy,
      icon: <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      color: '#3b82f6',
      bgColor: 'bg-blue-100',
      description: 'Ketepatan prediksi keseluruhan',
    },
    {
      title: 'Precision',
      value: metrics.precision,
      icon: <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />,
      color: '#10b981',
      bgColor: 'bg-green-100',
      description: 'Akurasi prediksi positif',
    },
    {
      title: 'Recall',
      value: metrics.recall,
      icon: <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
      color: '#f59e0b',
      bgColor: 'bg-orange-100',
      description: 'Cakupan deteksi kasus positif',
    },
    {
      title: 'F1 Score',
      value: metrics.f1Score,
      icon: <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      color: '#8b5cf6',
      bgColor: 'bg-purple-100',
      description: 'Harmonic mean precision & recall',
    },
  ];

  const lastUpdatedText = loading
    ? 'Loading...'
    : `Terakhir diperbarui: ${metrics.lastUpdated.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performa Model ML</h2>
          <p className="text-sm text-muted-foreground mt-1">{lastUpdatedText}</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricsData.map((data, index) => (
          <MetricGaugeCard key={index} data={data} loading={loading} />
        ))}
      </div>

      {/* Trend Chart */}
      <PerformanceTrendChart data={trend} loading={loading} />
    </div>
  );
}
