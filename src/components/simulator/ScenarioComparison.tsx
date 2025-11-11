import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import type { Scenario } from '@/types/scenario';

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  currentRate: number;
}

export function ScenarioComparison({ scenarios, currentRate }: ScenarioComparisonProps) {
  const getScenarioColor = (type: Scenario['type']) => {
    switch (type) {
      case 'baseline':
        return 'bg-blue-50 border-blue-200';
      case 'optimistic':
        return 'bg-green-50 border-green-200';
      case 'pessimistic':
        return 'bg-orange-50 border-orange-200';
      case 'custom':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getScenarioBadgeVariant = (type: Scenario['type']) => {
    switch (type) {
      case 'baseline':
        return 'default';
      case 'optimistic':
        return 'default';
      case 'pessimistic':
        return 'destructive';
      case 'custom':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-emerald-700';
    if (risk < 40) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getRiskIcon = (risk: number) => {
    if (risk < 20) return <CheckCircle2 className="h-5 w-5 text-emerald-700" />;
    if (risk < 40) return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    return <AlertTriangle className="h-5 w-5 text-rose-600" />;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Scenario Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Compare different rate adjustment scenarios and their projected impacts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((scenario) => {
          const newRate = currentRate + scenario.rateAdjustment;
          const savingsChange = scenario.projectedSavings;
          const isSavingsPositive = savingsChange >= 0;

          return (
            <Card
              key={scenario.id}
              className={`p-5 border-2 transition-all duration-300 hover:shadow-lg ${getScenarioColor(
                scenario.type
              )}`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-base mb-1">{scenario.name}</h4>
                    <Badge variant={getScenarioBadgeVariant(scenario.type)} className="text-xs">
                      {scenario.type.charAt(0).toUpperCase() + scenario.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Rate Adjustment */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rate Adjustment</span>
                    <div className="flex items-center gap-1">
                      {scenario.rateAdjustment > 0 ? (
                        <TrendingUp className="h-4 w-4 text-rose-600" />
                      ) : scenario.rateAdjustment < 0 ? (
                        <TrendingDown className="h-4 w-4 text-emerald-700" />
                      ) : null}
                      <span
                        className={`font-semibold ${
                          scenario.rateAdjustment > 0
                            ? 'text-rose-600'
                            : scenario.rateAdjustment < 0
                            ? 'text-emerald-700'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {scenario.rateAdjustment > 0 ? '+' : ''}
                        {formatPercentage(scenario.rateAdjustment)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New Rate</span>
                    <span className="font-bold text-lg">{formatPercentage(newRate)}</span>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-3">
                  {/* Churn Risk */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Churn Risk</span>
                      <div className="flex items-center gap-1">
                        {getRiskIcon(scenario.projectedChurnRisk)}
                        <span className={`font-bold ${getRiskColor(scenario.projectedChurnRisk)}`}>
                          {formatPercentage(scenario.projectedChurnRisk)}
                        </span>
                      </div>
                    </div>
                    {/* Risk Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          scenario.projectedChurnRisk < 20
                            ? 'bg-emerald-600'
                            : scenario.projectedChurnRisk < 40
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${scenario.projectedChurnRisk}%` }}
                      />
                    </div>
                  </div>

                  {/* Retention Rate */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Retention Rate</span>
                    <span className="font-semibold text-emerald-700">
                      {formatPercentage(scenario.projectedRetention)}
                    </span>
                  </div>

                  {/* Cost of Funds Impact */}
                  <div className="bg-white/50 rounded-lg p-3 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cost of Funds Impact</span>
                      <div className="flex items-center gap-1">
                        {isSavingsPositive ? (
                          <TrendingDown className="h-4 w-4 text-emerald-700" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-rose-600" />
                        )}
                        <span
                          className={`font-bold ${
                            isSavingsPositive ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {isSavingsPositive ? '' : '+'}
                          {formatCurrency(Math.abs(savingsChange))}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isSavingsPositive ? 'Annual savings' : 'Additional cost'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
