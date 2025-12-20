import { useState, useMemo } from 'react';
import type { RetailSegment } from '@/types/segment';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Search, ArrowUpDown, Users, TrendingDown, AlertTriangle, Star } from 'lucide-react';

interface RetailSegmentListProps {
  segments: RetailSegment[];
  onSelectSegment: (segment: RetailSegment) => void;
  selectedSegmentId?: string;
}

type SortField = 'name' | 'customerCount' | 'totalBalance' | 'currentRate' | 'retentionRate';
type SortDirection = 'asc' | 'desc';

// Balance tier categories for filtering
const BALANCE_TIERS = [
  { value: 'All', label: 'All Tiers' },
  { value: '<10M', label: '<10M' },
  { value: '10M-50M', label: '10M-50M' },
  { value: '50M-100M', label: '50M-100M' },
  { value: '>100M', label: '>100M' },
];

export function RetailSegmentList({
  segments,
  onSelectSegment,
  selectedSegmentId,
}: RetailSegmentListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('totalBalance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filter and sort segments
  const filteredAndSortedSegments = useMemo(() => {
    let filtered = segments;

    // Filter by tier
    if (selectedTier !== 'All') {
      filtered = filtered.filter((s) => {
        // Match tier patterns
        if (selectedTier === '<10M') {
          return s.balanceTier.includes('<') && (s.balanceTier.includes('10M') || s.balanceTier.includes('5M'));
        }
        if (selectedTier === '10M-50M') {
          return s.balanceTier.includes('10M') && s.balanceTier.includes('50M');
        }
        if (selectedTier === '50M-100M') {
          return s.balanceTier.includes('50M') && s.balanceTier.includes('100M');
        }
        if (selectedTier === '>100M') {
          return s.balanceTier.includes('>') && (s.balanceTier.includes('100M') || s.balanceTier.includes('500M'));
        }
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(query) ||
        s.balanceTier.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'customerCount':
          aValue = a.customerCount;
          bValue = b.customerCount;
          break;
        case 'totalBalance':
          aValue = a.totalBalance;
          bValue = b.totalBalance;
          break;
        case 'currentRate':
          aValue = a.currentRate;
          bValue = b.currentRate;
          break;
        case 'retentionRate':
          aValue = a.retentionRate;
          bValue = b.retentionRate;
          break;
        default:
          aValue = a.totalBalance;
          bValue = b.totalBalance;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return sorted;
  }, [segments, selectedTier, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending for numbers
    }
  };

  // Calculate rate difference for visual indicator
  const getRateDifference = (segment: RetailSegment) => {
    return segment.currentRate - segment.recommendedRate;
  };

  // Determine if segment is high priority (large customer base + low retention)
  const isHighPriority = (segment: RetailSegment) => {
    return segment.customerCount > 5000 && segment.retentionRate < 85;
  };

  return (
    <TooltipProvider>
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Search segments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Balance Tier Filter */}
        <Tabs value={selectedTier} onValueChange={setSelectedTier}>
          <TabsList>
            {BALANCE_TIERS.map((tier) => (
              <TabsTrigger key={tier.value} value={tier.value}>
                {tier.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="text-sm text-neutral-600">
        Showing {filteredAndSortedSegments.length} of {segments.length} segments
      </div>

      {/* Table */}
      <div className="rounded-md border border-neutral-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Segment Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Balance Tier</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('customerCount')}
              >
                <div className="flex items-center gap-2">
                  Customers
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('totalBalance')}
              >
                <div className="flex items-center gap-2">
                  Total Balance
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('currentRate')}
              >
                <div className="flex items-center gap-2">
                  Current Rate
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Recommended Rate</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('retentionRate')}
              >
                <div className="flex items-center gap-2">
                  Retention Rate
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedSegments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No segments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedSegments.map((segment) => {
                const rateDiff = getRateDifference(segment);
                const isRateDecrease = rateDiff > 0;
                const highPriority = isHighPriority(segment);

                return (
                  <TableRow
                    key={segment.id}
                    className={`cursor-pointer ${highPriority ? 'bg-orange-50/50' : ''}`}
                    data-state={
                      selectedSegmentId === segment.id ? 'selected' : undefined
                    }
                    onClick={() => onSelectSegment(segment)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectSegment(segment);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select segment ${segment.name}`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {segment.name}
                        {highPriority && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>High Priority: Large segment with low retention rate</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {segment.retentionRate < 80 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Critical: Very low retention rate - immediate attention needed</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{segment.balanceTier}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-neutral-500" />
                        <span>{segment.customerCount.toLocaleString('id-ID')}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(segment.totalBalance, true)}</TableCell>
                    <TableCell>{formatPercentage(segment.currentRate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary-600">
                          {formatPercentage(segment.recommendedRate)}
                        </span>
                        {isRateDecrease && (
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingDown className="h-3 w-3" />
                            <span className="text-xs">
                              {formatPercentage(Math.abs(rateDiff))}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            segment.retentionRate > 90
                              ? 'text-green-600'
                              : segment.retentionRate > 85
                              ? 'text-orange-600'
                              : 'text-red-600'
                          }`}
                        >
                          {formatPercentage(segment.retentionRate, 0)}
                        </span>
                        {segment.retentionRate < 85 && (
                          <div className={`h-2 w-2 rounded-full ${segment.retentionRate < 80 ? 'bg-red-600' : 'bg-orange-600'} animate-pulse`} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
    </TooltipProvider>
  );
}
