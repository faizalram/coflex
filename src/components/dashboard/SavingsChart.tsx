import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { useTheme } from '@/hooks/useTheme';
import type { TimeSeriesData } from '@/types/scenario';

interface SavingsChartProps {
  data: TimeSeriesData[];
  loading?: boolean;
}

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 dark:text-gray-300">{entry.name}:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(entry.value, true)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Format Y-axis values
const formatYAxis = (value: number) => {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(0)}T`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(0)}M`;
  }
  return value.toString();
};

export function SavingsChart({ data, loading = false }: SavingsChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tren Penghematan Cost of Funds</CardTitle>
          <CardDescription>Perbandingan aktual vs proyeksi penghematan (12 bulan terakhir)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Penghematan Cost of Funds</CardTitle>
        <CardDescription>Perbandingan aktual vs proyeksi penghematan (12 bulan terakhir)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="month"
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: isDark ? '#374151' : '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => (
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Aktual"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActual)"
              animationBegin={0}
              animationDuration={7000}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="Proyeksi"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProjected)"
              animationBegin={500}
              animationDuration={7000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
