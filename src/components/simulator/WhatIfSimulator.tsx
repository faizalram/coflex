import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InterestRateSlider } from './InterestRateSlider';
import { ScenarioComparison } from './ScenarioComparison';
import { useSimulator } from '@/hooks/useSimulator';
import { useCustomers } from '@/hooks/useCustomers';
import { LoadingState } from '@/components/shared/LoadingState';
import { RotateCcw, Save } from 'lucide-react';
import type { WholesaleCustomer } from '@/types/customer';

export function WhatIfSimulator() {
  const { customers, loading: customersLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<WholesaleCustomer | undefined>();

  const {
    scenarios,
    loading: simulatorLoading,
    currentRate,
    recommendedRate,
    generateScenarios,
    resetScenarios,
  } = useSimulator({ customer: selectedCustomer });

  // Select first customer by default
  useEffect(() => {
    if (customers.length > 0 && !selectedCustomer) {
      setSelectedCustomer(customers[0]);
    }
  }, [customers, selectedCustomer]);

  // Generate initial scenarios when customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      generateScenarios(0);
    }
  }, [selectedCustomer, generateScenarios]);

  const handleRateChange = (adjustment: number) => {
    generateScenarios(adjustment);
  };

  const handleReset = () => {
    resetScenarios();
  };

  const handleSave = () => {
    // In a real app, this would save the scenario to backend
    alert('Scenario saved! (This is a demo feature)');
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer);
  };

  if (customersLoading) {
    return <LoadingState />;
  }

  if (!selectedCustomer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No customers available for simulation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">What-If Scenario Simulator</h2>
          <p className="text-muted-foreground">
            Simulate different interest rate scenarios and analyze their impact on cost of funds and customer retention
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={simulatorLoading}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={simulatorLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Scenario
          </Button>
        </div>
      </div>

      {/* Customer Selection */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Customer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose a customer to simulate interest rate scenarios
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedCustomer.id} onValueChange={handleCustomerChange}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline">{selectedCustomer.segment}</Badge>
            <Badge
              variant={
                selectedCustomer.sensitivity === 'High'
                  ? 'destructive'
                  : selectedCustomer.sensitivity === 'Medium'
                  ? 'default'
                  : 'secondary'
              }
            >
              {selectedCustomer.sensitivity} Sensitivity
            </Badge>
          </div>
        </div>
      </Card>

      {/* Interest Rate Slider */}
      <InterestRateSlider
        currentRate={currentRate}
        recommendedRate={recommendedRate}
        onRateChange={handleRateChange}
      />

      {/* Scenario Comparison */}
      {simulatorLoading ? (
        <LoadingState />
      ) : (
        <ScenarioComparison scenarios={scenarios} currentRate={currentRate} />
      )}

      {/* Enhanced Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-300 dark:border-blue-800 shadow-md">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">How to Use This Simulator</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-900 dark:text-blue-200">
            <div className="space-y-2">
              <p><strong className="text-blue-950 dark:text-blue-100">Step 1:</strong> Select a customer from the dropdown above</p>
              <p><strong className="text-blue-950 dark:text-blue-100">Step 2:</strong> Use the slider below to adjust their interest rate</p>
              <p><strong className="text-blue-950 dark:text-blue-100">Step 3:</strong> Compare the three scenarios that appear</p>
            </div>
            <div className="space-y-2">
              <p><strong className="text-blue-950 dark:text-blue-100">💡 Tip:</strong> The first scenario shows our AI recommendation</p>
              <p><strong className="text-blue-950 dark:text-blue-100">⚖️ Remember:</strong> Lower rates save money but may reduce customer satisfaction</p>
              <p><strong className="text-blue-950 dark:text-blue-100">🎯 Goal:</strong> Find the best balance for your strategy</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
