import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '@/hooks/useTheme';

interface SensitivityData {
  sensitivity: string;
  count: number;
  percentage: number;
  [key: string]: string | number;
}

interface SensitivityChartProps {
  data: SensitivityData[];
  loading?: boolean;
}

const COLORS = {
  Low: '#10b981',      // green-500
  Medium: '#f59e0b',   // orange-500
  High: '#ef4444',     // red-500
};

const RADIAN = Math.PI / 180;

// Custom label for the pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percentage,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="font-semibold text-sm"
    >
      {`${percentage}%`}
    </text>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{data.sensitivity} Sensitivity</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Jumlah: {data.count} nasabah</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Persentase: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

// Custom legend
const renderLegend = (props: any, isDark: boolean) => {
  const { payload } = props;
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {entry.value} ({entry.payload.percentage}%)
          </span>
        </div>
      ))}
    </div>
  );
};

export function SensitivityChart({ data, loading = false }: SensitivityChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Sensitivitas Nasabah</CardTitle>
          <CardDescription>Tingkat sensitivitas terhadap perubahan suku bunga</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Sensitivitas Nasabah</CardTitle>
        <CardDescription>Tingkat sensitivitas terhadap perubahan suku bunga</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.sensitivity as keyof typeof COLORS]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={(props) => renderLegend(props, isDark)} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
