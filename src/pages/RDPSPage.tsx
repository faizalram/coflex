import { useState } from 'react';
import type { RetailSegment } from '@/types/segment';
import { useSegments } from '@/hooks/useSegments';
import { RetailSegmentList } from '@/components/rdps/RetailSegmentList';
import { SegmentDetailCard } from '@/components/rdps/SegmentDetailCard';
import { ChurnHeatmap } from '@/components/rdps/ChurnHeatmap';
import { LoadingState } from '@/components/shared/LoadingState';
import { AlertCircle } from 'lucide-react';

export function RDPSPage() {
  const [selectedSegment, setSelectedSegment] = useState<RetailSegment | null>(null);
  
  const { segments, loading: segmentsLoading, error: segmentsError } = useSegments();

  const handleSelectSegment = (segment: RetailSegment) => {
    setSelectedSegment(segment);
  };

  if (segmentsError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 dark:text-red-400" />
          <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Error Loading Segments
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {segmentsError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header with RDPS-specific color theme */}
      <div className="border-b border-purple-200 dark:border-purple-900 pb-4">
        <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-400">
          Retail Deposit Product & Solution
        </h1>
        <p className="mt-2 text-purple-700 dark:text-purple-300">
          Manage adaptive interest rate strategies for retail customer segments
        </p>
      </div>

      {/* Segment List */}
      <div>
        {segmentsLoading ? (
          <LoadingState />
        ) : (
          <RetailSegmentList
            segments={segments}
            onSelectSegment={handleSelectSegment}
            selectedSegmentId={selectedSegment?.id}
          />
        )}
      </div>

      {/* Segment Detail and Analysis */}
      {selectedSegment && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Segment Detail */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-400">
              Segment Details
            </h2>
            <SegmentDetailCard segment={selectedSegment} />
          </div>

          {/* Churn Analysis */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-400">
              Churn Risk Analysis
            </h2>
            {segmentsLoading ? (
              <LoadingState />
            ) : (
              <ChurnHeatmap segments={segments} />
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedSegment && !segmentsLoading && (
        <div className="rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 p-12 text-center">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-400">
            Select a Segment
          </h3>
          <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
            Choose a retail segment from the list above to view details and churn analysis
          </p>
        </div>
      )}
    </div>
  );
}
