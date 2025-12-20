import { useState, useMemo } from 'react';
import type { WholesaleCustomer } from '@/types/customer';
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
import { Search, ArrowUpDown, AlertTriangle, Star } from 'lucide-react';

interface WholesaleCustomerListProps {
  customers: WholesaleCustomer[];
  onSelectCustomer: (customer: WholesaleCustomer) => void;
  selectedCustomerId?: string;
}

type SortField = 'name' | 'balance' | 'currentRate' | 'projectedSavings';
type SortDirection = 'asc' | 'desc';

export function WholesaleCustomerList({
  customers,
  onSelectCustomer,
  selectedCustomerId,
}: WholesaleCustomerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers;

    // Filter by segment
    if (selectedSegment !== 'All') {
      filtered = filtered.filter((c) => c.segment === selectedSegment);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(query)
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
        case 'balance':
          aValue = a.currentBalance;
          bValue = b.currentBalance;
          break;
        case 'currentRate':
          aValue = a.currentRate;
          bValue = b.currentRate;
          break;
        case 'projectedSavings':
          aValue = a.projectedSavings;
          bValue = b.projectedSavings;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
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
  }, [customers, selectedSegment, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSensitivityBadgeVariant = (
    sensitivity: 'Low' | 'Medium' | 'High'
  ): 'default' | 'secondary' | 'destructive' => {
    switch (sensitivity) {
      case 'Low':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'High':
        return 'destructive';
    }
  };

  // Determine if customer is high priority (high balance + high sensitivity)
  const isHighPriority = (customer: WholesaleCustomer) => {
    return customer.currentBalance > 1_000_000_000_000 && customer.sensitivity === 'High';
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
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Segment Filter */}
        <Tabs value={selectedSegment} onValueChange={setSelectedSegment}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Corporate">Corporate</TabsTrigger>
            <TabsTrigger value="Commercial">Commercial</TabsTrigger>
            <TabsTrigger value="GVI">GVI</TabsTrigger>
            <TabsTrigger value="SME">SME</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results count */}
      <div className="text-sm text-neutral-600">
        Showing {filteredAndSortedCustomers.length} of {customers.length}{' '}
        customers
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
                  Customer Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Segment</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('balance')}
              >
                <div className="flex items-center gap-2">
                  Balance
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
              <TableHead>Sensitivity</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort('projectedSavings')}
              >
                <div className="flex items-center gap-2">
                  Projected Savings
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedCustomers.map((customer) => {
                const highPriority = isHighPriority(customer);
                return (
                <TableRow
                  key={customer.id}
                  className={`cursor-pointer ${highPriority ? 'bg-orange-50/50 dark:bg-orange-950/30' : ''}`}
                  data-state={
                    selectedCustomerId === customer.id ? 'selected' : undefined
                  }
                  onClick={() => onSelectCustomer(customer)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCustomer(customer);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select customer ${customer.name}`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {customer.name}
                      {highPriority && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>High Priority: Large balance with high rate sensitivity</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {customer.sensitivity === 'High' && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>High Sensitivity: Customer is very responsive to rate changes</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.segment}</Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(customer.currentBalance, true)}</TableCell>
                  <TableCell>{formatPercentage(customer.currentRate)}</TableCell>
                  <TableCell className="font-medium text-primary-600">
                    {formatPercentage(customer.recommendedRate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSensitivityBadgeVariant(customer.sensitivity)}>
                      {customer.sensitivity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-emerald-600">
                        {formatCurrency(customer.projectedSavings, true)}
                      </span>
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
