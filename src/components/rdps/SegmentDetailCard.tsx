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
import { TrendingDown, TrendingUp, Users, CheckCircle2, Info, Sparkles, Loader2 } from 'lucide-react';
import { getDataService } from '@/services/dataService';
import { MLVariablesCard } from '@/components/shared/MLVariablesCard';

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
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Total Customers</div>
            <div className="mt-1 flex items-center gap-2">
              <Users className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
              <span className="text-2xl font-bold">
                {displaySegment.customerCount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Total Balance</div>
            <div className="mt-1 text-2xl font-bold">
              {formatCurrency(displaySegment.totalBalance, true)}
            </div>
          </div>
        </div>

        {/* Average Balance per Customer */}
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">Avg Balance per Customer</div>
          <div className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(avgBalancePerCustomer, true)}
          </div>
        </div>

        {/* Current Rate */}
        <div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">Current Interest Rate</div>
          <div className="mt-1 text-2xl font-bold">
            {formatPercentage(displaySegment.currentRate)}
          </div>
        </div>

        {/* Recommended Rate with Visual Chart */}
        <div className="rounded-lg border-2 border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-primary-900 dark:text-primary-100">
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
            <div className="text-xs text-primary-800 dark:text-primary-300">
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

        {/* Projected Savings */}
        <div className={`rounded-lg p-4 ${isRateDecrease ? 'bg-green-50 dark:bg-green-900/30' : 'bg-orange-50 dark:bg-orange-900/30'}`}>
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Projected Annual Savings
          </div>
          <div className={`mt-1 text-2xl font-bold ${isRateDecrease ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {isRateDecrease ? '+' : '-'}{formatCurrency(Math.abs(displaySegment.projectedSavings), true)}
          </div>
          <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Based on recommended rate adjustment
          </div>
        </div>

        {/* Average Sensitivity */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-700 p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Average Rate Sensitivity
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-neutral-500 dark:text-neutral-400 cursor-help" />
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
            <div className="relative h-2 w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
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
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {displaySegment.avgSensitivity}%
            </span>
          </div>
        </div>

        {/* ML Model Variables for Segment */}
        {displaySegment.mlVariables && (
          <MLVariablesCard 
            variables={displaySegment.mlVariables}
            title="Segment AI Model Analysis"
          />
        )}
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
