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

interface ChurnHeatmapProps {
  segments: RetailSegment[];
}

export function ChurnHeatmap({ segments }: ChurnHeatmapProps) {
  // Prepare data for the bar chart
  const chartData = segments
    .map((segment) => ({
      name: segment.name,
      balanceTier: segment.balanceTier,
      churnRisk: segment.churnRisk,
      retentionRate: segment.retentionRate,
      customerCount: segment.customerCount,
    }))
    .sort((a, b) => b.churnRisk - a.churnRisk); // Sort by churn risk descending

  // Color function based on churn risk level
  const getChurnColor = (churnRisk: number) => {
    if (churnRisk > 40) return '#ef4444'; // red-500
    if (churnRisk > 30) return '#f97316'; // orange-500
    if (churnRisk > 20) return '#f59e0b'; // amber-500
    return '#10b981'; // green-500
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
              <span className="text-sm text-gray-600 dark:text-gray-300">Churn Risk:</span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {formatPercentage(data.churnRisk, 0)}
              </span>
            </div>
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
  const avgChurnRisk = segments.reduce((sum, s) => sum + s.churnRisk, 0) / segments.length;
  const highRiskSegments = segments.filter((s) => s.churnRisk > 35).length;
  const mediumRiskSegments = segments.filter((s) => s.churnRisk > 25 && s.churnRisk <= 35).length;
  const lowRiskSegments = segments.filter((s) => s.churnRisk <= 25).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Churn Risk Analysis</CardTitle>
        <CardDescription>
          Segment-level churn risk distribution and retention analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Avg Churn Risk</div>
            <div className="mt-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {formatPercentage(avgChurnRisk, 0)}
            </div>
          </div>
          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-3">
            <div className="text-xs text-red-700 dark:text-red-400">High Risk</div>
            <div className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">
              {highRiskSegments}
            </div>
          </div>
          <div className="rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-3">
            <div className="text-xs text-orange-700 dark:text-orange-400">Medium Risk</div>
            <div className="mt-1 text-xl font-bold text-orange-600 dark:text-orange-400">
              {mediumRiskSegments}
            </div>
          </div>
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-3">
            <div className="text-xs text-green-700 dark:text-green-400">Low Risk</div>
            <div className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
              {lowRiskSegments}
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
                  value: 'Churn Risk (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 12, fill: 'currentColor' },
                }}
                tick={{ fontSize: 12, fill: 'currentColor' }}
                className="text-gray-600 dark:text-gray-400"
                stroke="currentColor"
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={() => (
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">Churn Risk</span>
                )}
              />
              <Bar
                dataKey="churnRisk"
                radius={[8, 8, 0, 0]}
                animationBegin={0}
                animationDuration={500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getChurnColor(entry.churnRisk)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Legend */}
        <div className="flex items-center justify-center gap-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-green-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Low (&lt;20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-amber-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Medium (20-30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-orange-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Elevated (30-40%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-red-500" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">High (&gt;40%)</span>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
          <div className="text-sm font-medium text-blue-900 dark:text-blue-300">Key Insights</div>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-400">
            {highRiskSegments > 0 && (
              <li>
                • {highRiskSegments} segment{highRiskSegments > 1 ? 's' : ''} with high churn risk
                require immediate attention
              </li>
            )}
            <li>
              • Average churn risk across all segments is {formatPercentage(avgChurnRisk, 1)}
            </li>
            {lowRiskSegments > 0 && (
              <li>
                • {lowRiskSegments} segment{lowRiskSegments > 1 ? 's' : ''} showing strong retention
                potential
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
