import { useState } from 'react';
import type { WholesaleCustomer } from '@/types/customer';
import { useCustomers } from '@/hooks/useCustomers';
import { useRecommendations } from '@/hooks/useRecommendations';
import { WholesaleCustomerList } from '@/components/tbw/WholesaleCustomerList';
import { CustomerDetailCard } from '@/components/tbw/CustomerDetailCard';
import { RecommendationCard } from '@/components/tbw/RecommendationCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { AlertCircle } from 'lucide-react';

export function TBWPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<WholesaleCustomer | null>(null);
  
  const { customers, loading: customersLoading, error: customersError } = useCustomers();
  const { 
    recommendations, 
    loading: recommendationsLoading, 
    error: recommendationsError 
  } = useRecommendations(selectedCustomer?.id || null);

  const handleSelectCustomer = (customer: WholesaleCustomer) => {
    setSelectedCustomer(customer);
  };

  if (customersError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 dark:text-red-400" />
          <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Error Loading Customers
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {customersError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Transaction Banking Wholesale
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Manage interest rate recommendations for wholesale customers
        </p>
      </div>

      {/* Customer List */}
      <div>
        {customersLoading ? (
          <LoadingState />
        ) : (
          <WholesaleCustomerList
            customers={customers}
            onSelectCustomer={handleSelectCustomer}
            selectedCustomerId={selectedCustomer?.id}
          />
        )}
      </div>

      {/* Customer Detail and Recommendations */}
      {selectedCustomer && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Customer Detail */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Customer Details
            </h2>
            <CustomerDetailCard customer={selectedCustomer} />
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Recommendations
            </h2>
            {recommendationsLoading ? (
              <LoadingState />
            ) : recommendationsError ? (
              <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Failed to load recommendations
                  </span>
                </div>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  No recommendations available for this customer
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCustomer && !customersLoading && (
        <div className="rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-12 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Select a Customer
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Choose a customer from the list above to view details and recommendations
          </p>
        </div>
      )}
    </div>
  );
}
