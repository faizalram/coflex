import { useState } from 'react';
import type { RetailSegment } from '@/types/segment';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TrendingDown, TrendingUp, Users, AlertTriangle, CheckCircle2, Info, Sparkles, Loader2 } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { getDataService } from '@/services/dataService';

interface SegmentDetailCardProps {
  segment: RetailSegment;
  onSegmentUpdate?: (segment: RetailSegment) => void;
}

export function SegmentDetailCard({ segment, onSegmentUpdate }: SegmentDetailCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedSegment, setAnalyzedSegment] = useState<RetailSegment | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use analyzed segment data if available, otherwise use original
  const displaySegment = analyzedSegment || segment;
  const rateDifference = displaySegment.currentRate - displaySegment.recommendedRate;
  const isRateDecrease = rateDifference > 0;

  // Handle analyze button click
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const dataService = getDataService();
      const result = await dataService.analyzeSegment(segment.id);
      setAnalyzedSegment(result);
      
      // Notify parent component if callback provided
      if (onSegmentUpdate) {
        onSegmentUpdate(result);
      }
    } catch (err) {
      setError('Failed to analyze segment. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Determine churn risk level and color
  const getChurnRiskLevel = (risk: number) => {
    if (risk > 35) return { level: 'High', color: 'text-rose-600', bgColor: 'bg-rose-50' };
    if (risk > 25) return { level: 'Medium', color: 'text-amber-600', bgColor: 'bg-amber-50' };
    return { level: 'Low', color: 'text-emerald-700', bgColor: 'bg-emerald-50' };
  };

  const churnRiskInfo = getChurnRiskLevel(displaySegment.churnRisk);

  // Prepare data for retention rate visualization
  const retentionData = [
    { name: 'Retained', value: displaySegment.retentionRate, color: '#10b981' },
    { name: 'At Risk', value: 100 - displaySegment.retentionRate, color: '#ef4444' },
  ];

  // Calculate average balance per customer
  const avgBalancePerCustomer = displaySegment.totalBalance / displaySegment.customerCount;

  return (
    <TooltipProvider>
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{displaySegment.name}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline">{displaySegment.balanceTier}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Count and Total Balance */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-neutral-500">Total Customers</div>
            <div className="mt-1 flex items-center gap-2">
              <Users className="h-5 w-5 text-neutral-500" />
              <span className="text-2xl font-bold">
                {displaySegment.customerCount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Total Balance</div>
            <div className="mt-1 text-2xl font-bold">
              {formatCurrency(displaySegment.totalBalance, true)}
            </div>
          </div>
        </div>

        {/* Average Balance per Customer */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <div className="text-sm text-neutral-500">Avg Balance per Customer</div>
          <div className="mt-1 text-lg font-bold text-neutral-900">
            {formatCurrency(avgBalancePerCustomer, true)}
          </div>
        </div>

        {/* Current Rate */}
        <div>
          <div className="text-sm text-neutral-500">Current Interest Rate</div>
          <div className="mt-1 text-2xl font-bold">
            {formatPercentage(displaySegment.currentRate)}
          </div>
        </div>

        {/* Recommended Rate with Visual Chart */}
        <div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-primary-900">
                Adaptive Interest Rate Recommendation
              </div>
              {displaySegment.isAnalyzed && (
                <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Analyzed
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary-600">
                {formatPercentage(displaySegment.recommendedRate)}
              </span>
              {isRateDecrease ? (
                <div className="flex items-center gap-1 text-emerald-700">
                  <TrendingDown className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {formatPercentage(Math.abs(rateDifference))} lower
                  </span>
                </div>
              ) : rateDifference < 0 ? (
                <div className="flex items-center gap-1 text-orange-600">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {formatPercentage(Math.abs(rateDifference))} higher
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-neutral-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Optimal</span>
                </div>
              )}
            </div>
            <div className="text-xs text-primary-800">
              Optimized for {formatPercentage(displaySegment.retentionRate, 0)} retention rate
            </div>
            
            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              variant={displaySegment.isAnalyzed ? "outline" : "default"}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {displaySegment.isAnalyzed ? 'Re-analyze' : 'Analyze with AI'}
                </>
              )}
            </Button>
            
            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Churn Risk */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700">Churn Risk</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-neutral-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {displaySegment.churnRisk > 35 && 'High Risk (>35%): Immediate action recommended'}
                    {displaySegment.churnRisk > 25 && displaySegment.churnRisk <= 35 && 'Medium Risk (25-35%): Monitor closely'}
                    {displaySegment.churnRisk <= 25 && 'Low Risk (≤25%): Segment is stable'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge
              variant={
                churnRiskInfo.level === 'High'
                  ? 'destructive'
                  : churnRiskInfo.level === 'Medium'
                  ? 'secondary'
                  : 'default'
              }
            >
              {churnRiskInfo.level}
            </Badge>
          </div>
          <div className="relative">
            {/* Progress bar background */}
            <div className="h-8 w-full overflow-hidden rounded-lg bg-neutral-200">
              {/* Progress bar fill */}
              <div
                className={`h-full transition-all duration-500 ${
                  displaySegment.churnRisk > 35
                    ? 'bg-red-500'
                    : displaySegment.churnRisk > 25
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${displaySegment.churnRisk}%` }}
              />
            </div>
            {/* Percentage label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-900">
                {formatPercentage(displaySegment.churnRisk, 0)}
              </span>
            </div>
          </div>
          {displaySegment.churnRisk > 35 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span>High churn risk - consider rate adjustment</span>
            </div>
          )}
        </div>

        {/* Expected Retention Rate with Visual */}
        <div>
          <div className="mb-2 text-sm font-medium text-neutral-700">
            Expected Retention Rate
          </div>
          <div className="flex items-center gap-4">
            {/* Pie chart visualization */}
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={retentionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {retentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Percentage and indicator */}
            <div className="flex-1">
              <div className="text-3xl font-bold text-emerald-700">
                {formatPercentage(segment.retentionRate, 0)}
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                of customers expected to stay
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-xs text-neutral-600">Retained</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-xs text-neutral-600">At Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projected Savings */}
        <div className={`rounded-lg p-4 ${isRateDecrease ? 'bg-green-50' : 'bg-orange-50'}`}>
          <div className="text-sm font-medium text-neutral-700">
            Projected Annual Savings
          </div>
          <div className={`mt-1 text-2xl font-bold ${isRateDecrease ? 'text-emerald-700' : 'text-amber-600'}`}>
            {isRateDecrease ? '+' : '-'}{formatCurrency(Math.abs(displaySegment.projectedSavings), true)}
          </div>
          <div className="mt-1 text-xs text-neutral-600">
            Based on recommended rate adjustment
          </div>
        </div>

        {/* Average Sensitivity */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700">
              Average Rate Sensitivity
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-neutral-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {displaySegment.avgSensitivity > 60 && 'High Sensitivity: Segment is very responsive to rate changes'}
                  {displaySegment.avgSensitivity > 45 && displaySegment.avgSensitivity <= 60 && 'Medium Sensitivity: Segment moderately responds to rate changes'}
                  {displaySegment.avgSensitivity <= 45 && 'Low Sensitivity: Segment is less affected by rate changes'}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-2 w-24 overflow-hidden rounded-full bg-neutral-200">
              <div
                className={`h-full transition-all duration-500 ${
                  displaySegment.avgSensitivity > 60
                    ? 'bg-red-500'
                    : displaySegment.avgSensitivity > 45
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${displaySegment.avgSensitivity}%` }}
              />
            </div>
            <span className="text-sm font-bold text-neutral-900">
              {displaySegment.avgSensitivity}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
