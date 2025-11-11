/**
 * Example usage of dataConfig
 * This file demonstrates how to use the data configuration module
 */

import dataConfig from './dataConfig';

// Example 1: Check current mode
console.log('Current mode:', dataConfig.getMode());
console.log('Is mock mode?', dataConfig.isMockMode());
console.log('Is API mode?', dataConfig.isAPIMode());

// Example 2: Get data service instance
const dataService = dataConfig.getDataService();
console.log('Data service instance:', dataService.constructor.name);

// Example 3: Use the data service
async function fetchData() {
  try {
    const customers = await dataService.getWholesaleCustomers();
    console.log(`Fetched ${customers.length} wholesale customers`);
    
    const segments = await dataService.getRetailSegments();
    console.log(`Fetched ${segments.length} retail segments`);
    
    const metrics = await dataService.getKPIMetrics('TBW');
    console.log('TBW Metrics:', {
      totalDPK: metrics.totalDPK,
      averageRate: metrics.averageRate,
      projectedSavings: metrics.projectedSavings,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Example 4: Switch modes programmatically (for testing)
function switchMode() {
  const currentMode = dataConfig.getMode();
  const newMode = currentMode === 'mock' ? 'api' : 'mock';
  
  console.log(`Switching from ${currentMode} to ${newMode}`);
  dataConfig.setMode(newMode);
  
  const newService = dataConfig.getDataService();
  console.log('New data service:', newService.constructor.name);
  
  // Switch back
  dataConfig.setMode(currentMode);
}

// Uncomment to run examples:
// fetchData();
// switchMode();

export { fetchData, switchMode };
