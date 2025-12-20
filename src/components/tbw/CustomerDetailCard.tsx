import { useState } from 'react';
import type { WholesaleCustomer } from '@/types/customer';
import { formatCurrency, formatPercentage, formatDate } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TrendingDown, TrendingUp, CheckCircle2, Info, Sparkles, Loader2 } from 'lucide-react';
import { getDataService } from '@/services/dataService';

interface CustomerDetailCardProps {
  customer: WholesaleCustomer;
  onCustomerUpdate?: (customer: WholesaleCustomer) => void;
}

export function CustomerDetailCard({ customer, onCustomerUpdate }: CustomerDetailCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCustomer, setAnalyzedCustomer] = useState<WholesaleCustomer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use analyzed customer data if available, otherwise use original
  const displayCustomer = analyzedCustomer || customer;
  const rateDifference = displayCustomer.currentRate - displayCustomer.recommendedRate;
  const isRateDecrease = rateDifference > 0;

  // Handle analyze button click
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const dataService = getDataService();
      const result = await dataService.analyzeCustomer(customer.id);
      setAnalyzedCustomer(result);
      
      // Notify parent component if callback provided
      if (onCustomerUpdate) {
        onCustomerUpdate(result);
      }
    } catch (err) {
      setError('Failed to analyze customer. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Determine confidence level
  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return { level: 'High', color: 'text-emerald-700' };
    if (score >= 80) return { level: 'Medium', color: 'text-amber-600' };
    return { level: 'Low', color: 'text-rose-600' };
  };

  const confidenceInfo = getConfidenceLevel(displayCustomer.confidenceScore);

  return (
    <TooltipProvider>
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{displayCustomer.name}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline">{displayCustomer.segment}</Badge>
              <span className="text-sm text-neutral-500">
                Updated {formatDate(displayCustomer.lastUpdated, 'short')}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance and Current Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-neutral-500">Current Balance</div>
            <div className="mt-1 text-2xl font-bold">
              {formatCurrency(displayCustomer.currentBalance, true)}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-500">Current Rate</div>
            <div className="mt-1 text-2xl font-bold">
              {formatPercentage(displayCustomer.currentRate)}
            </div>
          </div>
        </div>

        {/* Recommended Rate */}
        <div className="rounded-lg border-2 border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-950/30 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-primary-900 dark:text-primary-100">
                Recommended Interest Rate
              </div>
              {displayCustomer.isAnalyzed && (
                <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Analyzed
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary-600">
                {formatPercentage(displayCustomer.recommendedRate)}
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
            
            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              variant={displayCustomer.isAnalyzed ? "outline" : "default"}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {displayCustomer.isAnalyzed ? 'Re-analyze' : 'Analyze with AI'}
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
        <div className={`rounded-lg p-4 ${isRateDecrease ? 'bg-green-50 dark:bg-green-950/30' : 'bg-orange-50 dark:bg-orange-950/30'}`}>
          <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Projected Annual Savings
          </div>
          <div className={`mt-1 text-2xl font-bold ${isRateDecrease ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {isRateDecrease ? '+' : '-'}{formatCurrency(Math.abs(displayCustomer.projectedSavings), true)}
          </div>
          <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Based on recommended rate adjustment
          </div>
        </div>

        {/* Confidence Score */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium text-neutral-700">
              Confidence Score
            </div>
            <span className={`text-sm font-medium ${confidenceInfo.color}`}>
              {confidenceInfo.level}
            </span>
          </div>
          <div className="relative">
            {/* Progress bar background */}
            <div className="h-6 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              {/* Progress bar fill */}
              <div
                className={`h-full transition-all duration-500 ${
                  displayCustomer.confidenceScore >= 90
                    ? 'bg-green-500'
                    : displayCustomer.confidenceScore >= 80
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${displayCustomer.confidenceScore}%` }}
              />
            </div>
            {/* Percentage label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                {displayCustomer.confidenceScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Sensitivity Badge */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent dark:bg-neutral-900/30 p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Rate Sensitivity
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-neutral-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {displayCustomer.sensitivity === 'High' && 'High Sensitivity: Customer is very responsive to rate changes'}
                  {displayCustomer.sensitivity === 'Medium' && 'Medium Sensitivity: Customer moderately responds to rate changes'}
                  {displayCustomer.sensitivity === 'Low' && 'Low Sensitivity: Customer is less affected by rate changes'}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Badge
            variant={
              displayCustomer.sensitivity === 'High'
                ? 'destructive'
                : displayCustomer.sensitivity === 'Medium'
                ? 'secondary'
                : 'default'
            }
          >
            {displayCustomer.sensitivity}
          </Badge>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
