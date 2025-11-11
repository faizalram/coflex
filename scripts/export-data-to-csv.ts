/**
 * Export mock data to CSV format for pandas/ML training
 * Run with: npx tsx scripts/export-data-to-csv.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { mockWholesaleCustomers } from '../src/data/mockCustomers';
import { mockRetailSegments } from '../src/data/mockSegments';

// Create exports directory
try {
  mkdirSync('exports', { recursive: true });
} catch (err) {
  // Directory already exists
}

// Convert wholesale customers to CSV
function exportWholesaleCustomers() {
  const headers = [
    'id',
    'name',
    'segment',
    'currentBalance',
    'currentRate',
    'recommendedRate',
    'sensitivity',
    'churnRisk',
    'confidenceScore',
    'projectedSavings',
    'lastUpdated'
  ];

  const rows = mockWholesaleCustomers.map(customer => [
    customer.id,
    `"${customer.name}"`, // Quote names with commas
    customer.segment,
    customer.currentBalance,
    customer.currentRate,
    customer.recommendedRate,
    customer.sensitivity,
    customer.churnRisk,
    customer.confidenceScore,
    customer.projectedSavings,
    customer.lastUpdated.toISOString().split('T')[0]
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  writeFileSync('exports/wholesale_customers.csv', csv);
  console.log('✓ Exported wholesale_customers.csv');
}

// Convert retail segments to CSV
function exportRetailSegments() {
  const headers = [
    'id',
    'name',
    'balanceTier',
    'customerCount',
    'totalBalance',
    'currentRate',
    'recommendedRate',
    'avgSensitivity',
    'churnRisk',
    'retentionRate',
    'projectedSavings'
  ];

  const rows = mockRetailSegments.map(segment => [
    segment.id,
    `"${segment.name}"`,
    segment.balanceTier,
    segment.customerCount,
    segment.totalBalance,
    segment.currentRate,
    segment.recommendedRate,
    segment.avgSensitivity,
    segment.churnRisk,
    segment.retentionRate,
    segment.projectedSavings
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  writeFileSync('exports/retail_segments.csv', csv);
  console.log('✓ Exported retail_segments.csv');
}

// Run exports
console.log('Exporting mock data to CSV...\n');
exportWholesaleCustomers();
exportRetailSegments();
console.log('\nExport complete! Files saved to exports/ directory');
console.log('\nYou can now use these files with pandas:');
console.log('  import pandas as pd');
console.log('  df = pd.read_csv("exports/wholesale_customers.csv")');
