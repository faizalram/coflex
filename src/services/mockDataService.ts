import type { IDataService } from './dataService';
import type { WholesaleCustomer } from '../types/customer';
import type { RetailSegment } from '../types/segment';
import type { KPIMetrics } from '../types/metrics';
import type { Recommendation } from '../types/recommendation';
import type { Scenario, SimulationParams, TimeSeriesData } from '../types/scenario';

import { mockWholesaleCustomers } from '../data/mockCustomers';
import { mockRetailSegments } from '../data/mockSegments';
import { mockTBWMetrics, mockRDPSMetrics } from '../data/mockMetrics';
import {
  mockTBWSavingsTrend,
  mockRDPSSavingsTrend,
  mockSensitivityDistribution,
  mockModelPerformance,
} from '../data/mockTimeSeries';

/**
 * Mock data service implementation
 * Provides data from mock files with realistic delays to simulate API calls
 */
export class MockDataService implements IDataService {
  /**
   * Simulate network delay
   * @param min - Minimum delay in ms
   * @param max - Maximum delay in ms
   */
  private async delay(min: number = 100, max: number = 300): Promise<void> {
    const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => setTimeout(resolve, delayTime));
  }

  /**
   * Deep clone data to prevent mutation
   */
  private clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

  async getWholesaleCustomers(segment?: string): Promise<WholesaleCustomer[]> {
    await this.delay();
    
    let customers = this.clone(mockWholesaleCustomers);
    
    // Filter by segment if provided
    if (segment && segment !== 'All') {
      customers = customers.filter((c) => c.segment === segment);
    }
    
    return customers;
  }

  async getRetailSegments(): Promise<RetailSegment[]> {
    await this.delay();
    return this.clone(mockRetailSegments);
  }

  async getKPIMetrics(role: 'TBW' | 'RDPS'): Promise<KPIMetrics> {
    await this.delay();
    return this.clone(role === 'TBW' ? mockTBWMetrics : mockRDPSMetrics);
  }

  async getRecommendations(customerId: string): Promise<Recommendation[]> {
    await this.delay();
    
    // Find the customer
    const customer = mockWholesaleCustomers.find((c) => c.id === customerId);
    
    if (!customer) {
      return [];
    }
    
    // Generate recommendations based on customer data
    const recommendations: Recommendation[] = [];
    
    const rateDiff = customer.currentRate - customer.recommendedRate;
    
    if (rateDiff > 0.5) {
      // Recommend rate decrease (lower rate = customer gets less money = higher churn risk, but bank saves money)
      recommendations.push({
        id: `REC-${customerId}-001`,
        customerId,
        type: 'rate_decrease',
        priority: customer.churnRisk > 30 ? 'High' : 'Medium',
        title: `Reduce interest rate to ${customer.recommendedRate}%`,
        description: `Lower the rate from ${customer.currentRate}% to ${customer.recommendedRate}% to optimize cost of funds`,
        rationale: `Analysis shows this customer has ${customer.sensitivity.toLowerCase()} rate sensitivity with ${customer.churnRisk}% churn risk. Reducing the rate will save ${(customer.projectedSavings / 1_000_000_000).toFixed(2)}B IDR annually for the bank. However, the customer will earn less interest, which may increase churn risk by approximately ${Math.round(rateDiff * 2)}%.`,
        impact: {
          savingsAmount: customer.projectedSavings,
          churnRiskChange: Math.round(rateDiff * 2), // Lower rate = higher churn risk (positive change)
        },
        confidence: customer.confidenceScore > 90 ? 'High' : customer.confidenceScore > 80 ? 'Medium' : 'Low',
      });
    } else if (rateDiff < -0.5) {
      // Recommend rate increase (higher rate = customer gets more money = lower churn risk, but bank pays more)
      recommendations.push({
        id: `REC-${customerId}-001`,
        customerId,
        type: 'rate_increase',
        priority: customer.churnRisk > 40 ? 'High' : 'Low',
        title: `Increase interest rate to ${customer.recommendedRate}%`,
        description: `Raise the rate from ${customer.currentRate}% to ${customer.recommendedRate}% to reduce churn risk`,
        rationale: `Customer shows high churn risk (${customer.churnRisk}%) at current rate. Increasing to recommended rate will improve retention as the customer earns more interest. This will cost the bank approximately ${(Math.abs(customer.projectedSavings) / 1_000_000_000).toFixed(2)}B IDR annually but should reduce churn risk by approximately ${Math.round(Math.abs(rateDiff) * 3)}%.`,
        impact: {
          savingsAmount: -customer.projectedSavings,
          churnRiskChange: -Math.round(Math.abs(rateDiff) * 3), // Higher rate = lower churn risk (negative change)
        },
        confidence: customer.confidenceScore > 90 ? 'High' : customer.confidenceScore > 80 ? 'Medium' : 'Low',
      });
    } else {
      // Maintain current rate
      recommendations.push({
        id: `REC-${customerId}-001`,
        customerId,
        type: 'rate_maintain',
        priority: 'Low',
        title: `Maintain current rate at ${customer.currentRate}%`,
        description: 'Current rate is optimal for this customer',
        rationale: `The current rate is well-aligned with customer expectations and market conditions. Churn risk is manageable at ${customer.churnRisk}%.`,
        impact: {
          savingsAmount: 0,
          churnRiskChange: 0,
        },
        confidence: customer.confidenceScore > 90 ? 'High' : customer.confidenceScore > 80 ? 'Medium' : 'Low',
      });
    }
    
    // Add monitoring recommendation for high-risk customers
    if (customer.churnRisk > 35) {
      recommendations.push({
        id: `REC-${customerId}-002`,
        customerId,
        type: 'rate_maintain',
        priority: 'High',
        title: 'Monitor customer closely',
        description: 'High churn risk detected - consider proactive engagement',
        rationale: `This customer shows elevated churn risk (${customer.churnRisk}%). Recommend regular relationship manager touchpoints and consideration of non-rate retention strategies.`,
        impact: {
          savingsAmount: 0,
          churnRiskChange: -10,
        },
        confidence: 'Medium',
      });
    }
    
    return recommendations;
  }

  async simulateScenario(params: SimulationParams): Promise<Scenario> {
    await this.delay();
    
    // Find the customer or segment
    let baseChurnRisk = 25;
    let baseSavings = 0;
    let baseRetention = 75;
    
    if (params.customerId) {
      const customer = mockWholesaleCustomers.find((c) => c.id === params.customerId);
      if (customer) {
        baseChurnRisk = customer.churnRisk;
        baseSavings = customer.projectedSavings;
        baseRetention = 100 - customer.churnRisk;
      }
    } else if (params.segmentId) {
      const segment = mockRetailSegments.find((s) => s.id === params.segmentId);
      if (segment) {
        baseChurnRisk = segment.churnRisk;
        baseSavings = segment.projectedSavings;
        baseRetention = segment.retentionRate;
      }
    }
    
    // Calculate impact of rate adjustment
    // Negative adjustment (rate decrease) = bank saves more money, but customer gets less = higher churn risk
    // Positive adjustment (rate increase) = bank pays more money, but customer gets more = lower churn risk
    const rateAdjustment = params.rateAdjustment;
    
    // Negative rate adjustment (decrease) = churn risk increases (customer unhappy)
    // Positive rate adjustment (increase) = churn risk decreases (customer happy)
    const churnRiskChange = -rateAdjustment * 3; // 1% rate decrease = 3% churn risk increase
    const savingsChange = -rateAdjustment * 0.15; // 1% rate decrease = 15% more savings for bank
    const retentionChange = rateAdjustment * 2; // 1% rate increase = 2% retention increase
    
    const projectedChurnRisk = Math.max(0, Math.min(100, baseChurnRisk + churnRiskChange));
    const projectedSavings = Math.max(0, baseSavings * (1 + savingsChange));
    const projectedRetention = Math.max(0, Math.min(100, baseRetention + retentionChange));
    
    // Determine scenario type
    let scenarioType: 'baseline' | 'optimistic' | 'pessimistic' | 'custom' = 'custom';
    if (Math.abs(rateAdjustment) < 0.1) {
      scenarioType = 'baseline';
    } else if (rateAdjustment < -0.5) {
      scenarioType = 'optimistic';
    } else if (rateAdjustment > 0.5) {
      scenarioType = 'pessimistic';
    }
    
    return {
      id: `SCENARIO-${Date.now()}`,
      name: scenarioType.charAt(0).toUpperCase() + scenarioType.slice(1),
      type: scenarioType,
      rateAdjustment,
      projectedChurnRisk,
      projectedSavings,
      projectedRetention,
    };
  }

  async getSavingsTrend(role: 'TBW' | 'RDPS'): Promise<TimeSeriesData[]> {
    await this.delay();
    return this.clone(role === 'TBW' ? mockTBWSavingsTrend : mockRDPSSavingsTrend);
  }

  async getSensitivityDistribution(): Promise<Array<{
    sensitivity: string;
    count: number;
    percentage: number;
  }>> {
    await this.delay();
    return this.clone(mockSensitivityDistribution);
  }

  async getModelPerformance(): Promise<Array<{
    month: string;
    accuracy: number;
    precision: number;
    recall: number;
  }>> {
    await this.delay();
    return this.clone(mockModelPerformance);
  }

  /**
   * Analyze a wholesale customer with AI model simulation
   * Simulates ML processing with 1-3 second delay
   * Slightly adjusts recommended rate and updates related metrics
   */
  async analyzeCustomer(customerId: string): Promise<WholesaleCustomer> {
    // Simulate ML model processing time (1-3 seconds)
    await this.delay(1000, 3000);
    
    // Find the customer
    const customer = mockWholesaleCustomers.find((c) => c.id === customerId);
    
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    // Clone the customer data
    const analyzedCustomer = this.clone(customer);
    
    // Simulate AI analysis by slightly adjusting the recommended rate (±0.1-0.3%)
    const adjustment = (Math.random() * 0.4 - 0.2); // Random between -0.2 and +0.2
    analyzedCustomer.recommendedRate = Math.max(
      2.0,
      Math.min(8.0, analyzedCustomer.recommendedRate + adjustment)
    );
    
    // Round to 2 decimal places
    analyzedCustomer.recommendedRate = Math.round(analyzedCustomer.recommendedRate * 100) / 100;
    
    // Update churn risk based on new recommended rate
    // Lower recommended rate = customer gets less money = higher churn risk
    // Higher recommended rate = customer gets more money = lower churn risk
    const rateDiff = analyzedCustomer.currentRate - analyzedCustomer.recommendedRate;
    // If rateDiff is positive (current > recommended), we're lowering rate, so churn risk increases
    // If rateDiff is negative (current < recommended), we're raising rate, so churn risk decreases
    const churnRiskAdjustment = rateDiff * 2; // 1% rate diff = 2% churn risk change
    analyzedCustomer.churnRisk = Math.max(
      5,
      Math.min(95, analyzedCustomer.churnRisk + churnRiskAdjustment)
    );
    analyzedCustomer.churnRisk = Math.round(analyzedCustomer.churnRisk);
    
    // Update projected savings based on rate difference
    // Lower recommended rate = more savings for bank
    const savingsMultiplier = rateDiff * 0.15; // 1% rate diff = 15% savings change
    analyzedCustomer.projectedSavings = Math.max(
      0,
      analyzedCustomer.projectedSavings * (1 + savingsMultiplier)
    );
    analyzedCustomer.projectedSavings = Math.round(analyzedCustomer.projectedSavings);
    
    // Slightly adjust confidence score (simulate model refinement)
    analyzedCustomer.confidenceScore = Math.max(
      75,
      Math.min(99, analyzedCustomer.confidenceScore + (Math.random() * 4 - 2))
    );
    analyzedCustomer.confidenceScore = Math.round(analyzedCustomer.confidenceScore);
    
    // Mark as analyzed
    analyzedCustomer.isAnalyzed = true;
    analyzedCustomer.lastUpdated = new Date();
    
    return analyzedCustomer;
  }

  /**
   * Analyze a retail segment with AI model simulation
   * Simulates ML processing with 1-3 second delay
   * Slightly adjusts recommended rate and updates related metrics
   */
  async analyzeSegment(segmentId: string): Promise<RetailSegment> {
    // Simulate ML model processing time (1-3 seconds)
    await this.delay(1000, 3000);
    
    // Find the segment
    const segment = mockRetailSegments.find((s) => s.id === segmentId);
    
    if (!segment) {
      throw new Error(`Segment with ID ${segmentId} not found`);
    }
    
    // Clone the segment data
    const analyzedSegment = this.clone(segment);
    
    // Simulate AI analysis by slightly adjusting the recommended rate (±0.1-0.3%)
    const adjustment = (Math.random() * 0.4 - 0.2); // Random between -0.2 and +0.2
    analyzedSegment.recommendedRate = Math.max(
      2.0,
      Math.min(8.0, analyzedSegment.recommendedRate + adjustment)
    );
    
    // Round to 2 decimal places
    analyzedSegment.recommendedRate = Math.round(analyzedSegment.recommendedRate * 100) / 100;
    
    // Update churn risk based on new recommended rate
    // Lower recommended rate = customers get less money = higher churn risk
    // Higher recommended rate = customers get more money = lower churn risk
    const rateDiff = analyzedSegment.currentRate - analyzedSegment.recommendedRate;
    // If rateDiff is positive (current > recommended), we're lowering rate, so churn risk increases
    // If rateDiff is negative (current < recommended), we're raising rate, so churn risk decreases
    const churnRiskAdjustment = rateDiff * 2; // 1% rate diff = 2% churn risk change
    analyzedSegment.churnRisk = Math.max(
      5,
      Math.min(95, analyzedSegment.churnRisk + churnRiskAdjustment)
    );
    analyzedSegment.churnRisk = Math.round(analyzedSegment.churnRisk);
    
    // Update retention rate (inverse of churn risk with some variance)
    analyzedSegment.retentionRate = Math.max(
      50,
      Math.min(98, 100 - analyzedSegment.churnRisk + (Math.random() * 4 - 2))
    );
    analyzedSegment.retentionRate = Math.round(analyzedSegment.retentionRate);
    
    // Update projected savings based on rate difference
    const savingsMultiplier = rateDiff * 0.15; // 1% rate diff = 15% savings change
    analyzedSegment.projectedSavings = Math.max(
      0,
      analyzedSegment.projectedSavings * (1 + savingsMultiplier)
    );
    analyzedSegment.projectedSavings = Math.round(analyzedSegment.projectedSavings);
    
    // Mark as analyzed
    analyzedSegment.isAnalyzed = true;
    
    return analyzedSegment;
  }
}
