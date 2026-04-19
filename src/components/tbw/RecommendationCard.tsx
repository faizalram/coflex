import { useState } from 'react';
import type { Recommendation } from '@/types/recommendation';
import { formatCurrency } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  TrendingDown,
  TrendingUp,
  Minus,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { MLVariablesCard } from '@/components/shared/MLVariablesCard';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Get icon based on recommendation type
  const getTypeIcon = () => {
    switch (recommendation.type) {
      case 'rate_decrease':
        return <TrendingDown className="h-5 w-5 text-emerald-700" />;
      case 'rate_increase':
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      case 'rate_maintain':
        return <Minus className="h-5 w-5 text-blue-600" />;
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (
    priority: 'High' | 'Medium' | 'Low'
  ): 'destructive' | 'secondary' | 'default' => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'default';
    }
  };

  // Get confidence badge variant and icon
  const getConfidenceInfo = (confidence: 'High' | 'Medium' | 'Low') => {
    switch (confidence) {
      case 'High':
        return {
          variant: 'default' as const,
          icon: <CheckCircle2 className="h-3 w-3" />,
          color: 'text-emerald-700',
        };
      case 'Medium':
        return {
          variant: 'secondary' as const,
          icon: <Info className="h-3 w-3" />,
          color: 'text-amber-600',
        };
      case 'Low':
        return {
          variant: 'destructive' as const,
          icon: <AlertCircle className="h-3 w-3" />,
          color: 'text-rose-600',
        };
    }
  };

  const confidenceInfo = getConfidenceInfo(recommendation.confidence);

  // Check if this is a significant rate change (>1% change)
  const isSignificantChange = Math.abs(recommendation.impact.savingsAmount) > 50_000_000_000;

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">{getTypeIcon()}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{recommendation.title}</CardTitle>
                  {isSignificantChange && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Significant rate change - review carefully</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {recommendation.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityVariant(recommendation.priority)}>
                {recommendation.priority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Impact Metrics */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-3">
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Savings Impact</div>
              <div
                className={`mt-1 text-lg font-bold ${
                  recommendation.impact.savingsAmount >= 0
                    ? 'text-emerald-700'
                    : 'text-rose-600'
                }`}
              >
                {recommendation.impact.savingsAmount >= 0 ? '+' : ''}
                {formatCurrency(recommendation.impact.savingsAmount, true)}
              </div>
            </div>
          </div>

          {/* Confidence Indicator */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 cursor-help">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Confidence Level
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${confidenceInfo.color}`}>
                    {recommendation.confidence}
                  </span>
                  {confidenceInfo.icon}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {recommendation.confidence === 'High' && 'Model is highly confident in this recommendation (>90%)'}
                {recommendation.confidence === 'Medium' && 'Model has moderate confidence in this recommendation (80-90%)'}
                {recommendation.confidence === 'Low' && 'Model has low confidence - use with caution (<80%)'}
              </p>
            </TooltipContent>
          </Tooltip>

          {/* ML Model Variables */}
          {recommendation.mlVariables && (
            <MLVariablesCard 
              variables={recommendation.mlVariables}
              title="AI Model Analysis"
            />
          )}

          {/* View Details Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowDetailModal(true)}
          >
            View Detailed Rationale
          </Button>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getTypeIcon()}
              {recommendation.title}
            </DialogTitle>
            <DialogDescription>{recommendation.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Priority and Confidence */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Priority:
                </span>
                <Badge variant={getPriorityVariant(recommendation.priority)}>
                  {recommendation.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Confidence:
                </span>
                <Badge variant={confidenceInfo.variant}>
                  {recommendation.confidence}
                </Badge>
              </div>
            </div>

            {/* Detailed Rationale */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Detailed Analysis
              </h4>
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {recommendation.rationale}
                </p>
              </div>
            </div>

            {/* Impact Details */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Expected Impact
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                  <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    Annual Savings
                  </div>
                  <div
                    className={`mt-2 text-2xl font-bold ${
                      recommendation.impact.savingsAmount >= 0
                        ? 'text-emerald-700'
                        : 'text-rose-600'
                    }`}
                  >
                    {recommendation.impact.savingsAmount >= 0 ? '+' : ''}
                    {formatCurrency(recommendation.impact.savingsAmount, true)}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    Cost of funds impact
                  </div>
                </div>
              </div>
            </div>

            {/* ML Model Variables in Modal */}
            {recommendation.mlVariables && (
              <MLVariablesCard 
                variables={recommendation.mlVariables}
                title="Detailed AI Model Analysis"
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
