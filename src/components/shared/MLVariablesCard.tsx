import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Brain, 
  CreditCard, 
  Smartphone, 
  Ship, 
  Store, 
  Banknote,
  Info 
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { MLModelVariables } from '@/types/recommendation';

interface MLVariablesCardProps {
  variables: MLModelVariables;
  title?: string;
  className?: string;
}

export function MLVariablesCard({ 
  variables, 
  title = "AI Model Input Variables",
  className = ""
}: MLVariablesCardProps) {
  
  // Format transaction numbers with Indonesian locale
  const formatTransactionCount = (count: number): string => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)}M`;
    } else if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K`;
    }
    return count.toLocaleString('id-ID');
  };

  // Get relative importance indicator based on value ranges
  const getImportanceLevel = (value: number, type: 'transaction' | 'portfolio'): 'high' | 'medium' | 'low' => {
    if (type === 'transaction') {
      if (value >= 10000) return 'high';
      if (value >= 1000) return 'medium';
      return 'low';
    } else { // portfolio
      if (value >= 100_000_000_000) return 'high'; // 100B+
      if (value >= 10_000_000_000) return 'medium';  // 10B+
      return 'low';
    }
  };

  const getImportanceBadge = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700">High Impact</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="outline">Low Impact</Badge>;
    }
  };

  const variableItems = [
    {
      icon: CreditCard,
      label: 'Kopra Transaction',
      value: variables.kopraTransaction,
      formattedValue: formatTransactionCount(variables.kopraTransaction),
      description: 'Corporate payment and transaction volume',
      importance: getImportanceLevel(variables.kopraTransaction, 'transaction'),
      color: 'text-blue-600'
    },
    {
      icon: Smartphone,
      label: 'Livin Transaction',
      value: variables.livinTransaction,
      formattedValue: formatTransactionCount(variables.livinTransaction),
      description: 'Digital banking app transaction activity',
      importance: getImportanceLevel(variables.livinTransaction, 'transaction'),
      color: 'text-purple-600'
    },
    {
      icon: Ship,
      label: 'Trade Finance Transaction',
      value: variables.tradeFinanceTransaction,
      formattedValue: formatTransactionCount(variables.tradeFinanceTransaction),
      description: 'International trade and finance operations',
      importance: getImportanceLevel(variables.tradeFinanceTransaction, 'transaction'),
      color: 'text-emerald-600'
    },
    {
      icon: Store,
      label: 'Livin Merchant Transaction',
      value: variables.livinMerchantTransaction,
      formattedValue: formatTransactionCount(variables.livinMerchantTransaction),
      description: 'Merchant payment processing volume',
      importance: getImportanceLevel(variables.livinMerchantTransaction, 'transaction'),
      color: 'text-orange-600'
    },
    {
      icon: Banknote,
      label: 'Loan Portfolio',
      value: variables.loanPortfolio,
      formattedValue: formatCurrency(variables.loanPortfolio, true),
      description: 'Total outstanding loan portfolio value',
      importance: getImportanceLevel(variables.loanPortfolio, 'portfolio'),
      color: 'text-rose-600'
    }
  ];

  return (
    <TooltipProvider>
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary-600" />
            <CardTitle className="text-base">{title}</CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-neutral-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  These variables are used by our AI model to determine the optimal interest rate recommendation. 
                  Higher transaction volumes and loan portfolios typically indicate stronger customer relationships.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-xs text-neutral-600">
            Key factors influencing the AI recommendation
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {variableItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg bg-white dark:bg-neutral-700 ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {item.label}
                      </span>
                      {getImportanceBadge(item.importance)}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 cursor-help truncate">
                          {item.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {item.formattedValue}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.value.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Summary note */}
          <div className="mt-4 p-3 rounded-lg bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800">
            <div className="flex items-start gap-2">
              <Brain className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-primary-800 dark:text-primary-200">
                <p className="font-medium mb-1">AI Model Insight:</p>
                <p>
                  The recommendation is calculated using advanced machine learning algorithms that analyze 
                  these transaction patterns and portfolio relationships to predict optimal interest rates 
                  while minimizing churn risk.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}