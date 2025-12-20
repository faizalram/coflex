import type { RetailSegment } from '@/types/segment';
import { formatPercentage } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

interface RetentionAnalysisProps {
  segments: RetailSegment[];
}

export function RetentionAnalysis({ segments }: RetentionAnalysisProps) {
  // Prepare data for the bar chart
  const chartData = segments
    .map((segment) => ({
      name: segment.name,
      balanceTier: segment.balanceTier,
      retentionRate: segment.retentionRate,
      customerCount: segment.customerCount,
    }))
    .sort((a, b) => a.retentionRate - b.retentionRate); // Sort by retention rate ascending (lowest first)

  // Color function based on retention rate level
  const getRetentionColor = (retentionRate: number) => {
    if (retentionRate >= 95) return '#10b981'; // green-500 - Excellent
    if (retentionRate >= 90) return '#22c55e'; // green-400 - Good
    if (retentionRate >= 85) return '#f59e0b'; // amber-500 - Fair
    if (retentionRate >= 80) return '#f97316'; // orange-500 - Poor
    return '#ef4444'; // red-500 - Critical
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3 shadow-lg">
          <div className="font-medium text-gray-900 dark:text-gray-100">{data.name}</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Balance Tier: {data.balanceTier}
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Retention Rate:</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatPercentage(data.retentionRate, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Customers:</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {data.customerCount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate summary statistics
  const avgRetentionRate = segments.reduce((sum, s) => sum + s.retentionRate, 0) / segments.length;
  const excellentSegments = segments.filter((s) => s.retentionRate >= 95).length;
  const goodSegments = segments.filter((s) => s.retentionRate >= 90 && s.retentionRate < 95).length;
  const fairSegments = segments.filter((s) => s.retentionRate >= 85 && s.retentionRate < 90).length;
  const poorSegments = segments.filter((s) => s.retentionRate < 85).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Retention Analysis</CardTitle>
        <CardDescription>
          Segment-level retention rates and customer satisfaction analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Avg Retention</div>
            <div className="mt-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {formatPercentage(avgRetentionRate, 0)}
            </div>
          </div>
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-3">
            <div className="text-xs text-green-700 dark:text-green-400">Excellent (≥95%)</div>
            <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
              {excellentSegments}
            </div>
          </div>
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950 p-3">
            <div className="text-xs text-emerald-700 dark:text-emerald-400">Good (90-94%)</div>
            <div className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {goodSegments}
            </div>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950 p-3">
            <div className="text-xs text-amber-700 dark:text-amber-400">Needs Attention</div>
            <div className="mt-1 text-xl font-bold text-amber-600 dark:text-amber-400">
              {fairSegments + poorSegments}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: 'currentColor' }}
                className="text-gray-600 dark:text-gray-400"
                stroke="currentColor"
              />
              <YAxis
                label={{
                  value: 'Retention Rate (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 12, fill: 'currentColor' },
                }}
                tick={{ fontSize: 12, fill: 'currentColor' }}
                className="text-gray-600 dark:text-gray-400"
                stroke="currentColor"
                domain={[70, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={() => (
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Retention Rate</span>
                )}
              />
              <Bar
                dataKey="retentionRate"
                radius={[8, 8, 0, 0]}
                animationBegin={0}
                animationDuration={500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRetentionColor(entry.retentionRate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Retention Level Legend */}
        <div className="flex items-center justify-center gap-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-green-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Excellent (≥95%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-green-400" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Good (90-94%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-amber-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Fair (85-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-orange-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Poor (80-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-red-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Critical (&lt;80%)</span>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
          <div className="text-sm font-medium text-blue-900 dark:text-blue-300">Key Insights</div>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-400">
            {poorSegments > 0 && (
              <li>
                • {poorSegments} segment{poorSegments > 1 ? 's' : ''} with low retention rates
                require immediate attention
              </li>
            )}
            <li>
              • Average retention rate across all segments is {formatPercentage(avgRetentionRate, 1)}
            </li>
            {excellentSegments > 0 && (
              <li>
                • {excellentSegments} segment{excellentSegments > 1 ? 's' : ''} showing excellent retention
                performance
              </li>
            )}
            {avgRetentionRate >= 90 && (
              <li>
                • Overall retention performance is strong - focus on maintaining current strategies
              </li>
            )}
            {avgRetentionRate < 85 && (
              <li>
                • Consider implementing retention improvement programs across multiple segments
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}