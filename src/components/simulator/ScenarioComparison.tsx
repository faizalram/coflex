import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  ArrowDown,
  ArrowUp,
  Minus,
  Info,
  DollarSign
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import type { Scenario } from '@/types/scenario';

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  currentRate: number;
}

export function ScenarioComparison({ scenarios, currentRate }: ScenarioComparisonProps) {
  // Enhanced scenario information with clear descriptions
  const getScenarioInfo = (type: Scenario['type'], rateAdjustment: number) => {
    switch (type) {
      case 'baseline':
        return {
          title: 'Current Recommended Rate',
          description: 'AI-recommended optimal rate',
          color: 'bg-blue-50 border-blue-300 dark:bg-blue-950 dark:border-blue-800',
          badgeVariant: 'default' as const,
          icon: <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
          strategy: 'Follow AI recommendation'
        };
      case 'optimistic':
        return {
          title: rateAdjustment < 0 ? 'Lower Rate Strategy' : 'Higher Rate Strategy',
          description: rateAdjustment < 0 
            ? 'Reduce rate to save more on cost of funds' 
            : 'Increase rate to improve customer retention',
          color: rateAdjustment < 0 
            ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-800'
            : 'bg-orange-50 border-orange-300 dark:bg-orange-950 dark:border-orange-800',
          badgeVariant: rateAdjustment < 0 ? 'default' as const : 'secondary' as const,
          icon: rateAdjustment < 0 
            ? <ArrowDown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> 
            : <ArrowUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />,
          strategy: rateAdjustment < 0 ? 'Cost optimization focus' : 'Retention focus'
        };
      case 'pessimistic':
        return {
          title: rateAdjustment < 0 ? 'Aggressive Rate Cut' : 'Significant Rate Increase',
          description: rateAdjustment < 0 
            ? 'More aggressive rate reduction (higher risk)' 
            : 'Larger rate increase (higher cost)',
          color: 'bg-amber-50 border-amber-300 dark:bg-amber-950 dark:border-amber-800',
          badgeVariant: 'destructive' as const,
          icon: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
          strategy: 'Higher risk/reward approach'
        };
      default:
        return {
          title: 'Custom Scenario',
          description: 'User-defined rate adjustment',
          color: 'bg-purple-50 border-purple-300 dark:bg-purple-950 dark:border-purple-800',
          badgeVariant: 'secondary' as const,
          icon: <Minus className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
          strategy: 'Custom strategy'
        };
    }
  };

  const getSavingsImpact = (savings: number) => {
    const isPositive = savings >= 0;
    return {
      isPositive,
      color: isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
      icon: isPositive ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />,
      label: isPositive ? 'Bank Saves Money' : 'Bank Pays More',
      description: isPositive 
        ? 'Lower interest expense for the bank' 
        : 'Higher interest expense for the bank'
    };
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with better explanation */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Interest Rate Scenarios</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare different interest rate strategies and see how they impact your bank's costs and customer retention. 
            Each scenario shows the trade-off between saving money and keeping customers satisfied.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => {
            const newRate = currentRate + scenario.rateAdjustment;
            const scenarioInfo = getScenarioInfo(scenario.type, scenario.rateAdjustment);
            const savingsInfo = getSavingsImpact(scenario.projectedSavings);

            return (
              <Card
                key={scenario.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${scenarioInfo.color} ${
                  index === 0 ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                }`}
              >
                {/* Recommended badge for baseline */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                    RECOMMENDED
                  </div>
                )}

                <div className="p-6 space-y-5">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {scenarioInfo.icon}
                      <h4 className="font-bold text-lg">{scenarioInfo.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{scenarioInfo.description}</p>
                    <Badge variant={scenarioInfo.badgeVariant} className="text-xs">
                      {scenarioInfo.strategy}
                    </Badge>
                  </div>

                  {/* New Interest Rate - Most Important */}
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center border-2 border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">New Interest Rate</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPercentage(newRate)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {scenario.rateAdjustment !== 0 && (
                        <>
                          {scenario.rateAdjustment > 0 ? (
                            <ArrowUp className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          )}
                          <span className={`text-xs font-medium ${
                            scenario.rateAdjustment > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {scenario.rateAdjustment > 0 ? '+' : ''}{formatPercentage(scenario.rateAdjustment)} change
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Key Impacts */}
                  <div className="space-y-4">
                    {/* Bank Cost Impact */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Bank Impact</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-neutral-500 dark:text-neutral-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{savingsInfo.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-medium ${savingsInfo.color}`}>
                            {savingsInfo.label}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`rounded-lg p-3 shadow-sm ${
                        savingsInfo.isPositive 
                          ? 'bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-300 dark:border-emerald-800' 
                          : 'bg-rose-50 dark:bg-rose-950 border-2 border-rose-300 dark:border-rose-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className={`${savingsInfo.color}`}>
                              {savingsInfo.icon}
                            </span>
                            <span className={`font-bold text-base ${savingsInfo.color}`}>
                              {formatCurrency(Math.abs(scenario.projectedSavings), true)}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">per year</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Retention Rate */}
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="text-neutral-600 dark:text-neutral-400">Expected retention:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatPercentage(scenario.projectedRetention)}
                      </span>
                    </div>
                  </div>

                  {/* Action recommendation */}
                  <div className={`rounded-lg p-3 text-center text-xs font-medium border-2 ${
                    index === 0 
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700' 
                      : scenario.projectedRetention < 80
                      ? 'bg-amber-50 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                  }`}>
                    {index === 0 && "✓ AI recommends this rate for optimal balance"}
                    {index !== 0 && scenario.projectedRetention < 80 && "⚠ Lower retention - monitor customer satisfaction"}
                    {index !== 0 && scenario.projectedRetention >= 80 && "Consider this alternative approach"}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary explanation */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-300 dark:border-blue-800 shadow-md">
          <div className="flex gap-4">
            <div className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">
              <Info className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">Understanding the Trade-offs</h4>
              <div className="text-sm text-blue-900 dark:text-blue-200 space-y-2">
                <p><strong className="text-blue-950 dark:text-blue-100">Lower rates:</strong> Bank saves money on interest payments, but customers might be less satisfied with lower returns.</p>
                <p><strong className="text-blue-950 dark:text-blue-100">Higher rates:</strong> Customers are happier with better returns and more likely to stay, but bank pays more in interest costs.</p>
                <p><strong className="text-blue-950 dark:text-blue-100">The goal:</strong> Find the sweet spot that balances cost savings with customer satisfaction and retention.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
