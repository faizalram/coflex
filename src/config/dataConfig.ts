import type { IDataService } from '../services/dataService';
import { MockDataService } from '../services/mockDataService';
import { APIService } from '../services/apiService';

/**
 * Data source mode type
 */
export type DataMode = 'mock' | 'api';

/**
 * Data configuration class
 * Manages data source selection based on environment variables
 */
class DataConfig {
  private mode: DataMode;
  private dataService: IDataService | null = null;

  constructor() {
    // Read mode from environment variable, default to 'mock'
    const envMode = import.meta.env.VITE_APP_MODE as string;
    this.mode = (envMode === 'api' ? 'api' : 'mock') as DataMode;
    
    // Log configuration in development
    if (import.meta.env.DEV) {
      console.log(`[DataConfig] Initialized with mode: ${this.mode}`);
    }
  }

  /**
   * Get current data mode
   */
  getMode(): DataMode {
    return this.mode;
  }

  /**
   * Check if running in mock mode
   */
  isMockMode(): boolean {
    return this.mode === 'mock';
  }

  /**
   * Check if running in API mode
   */
  isAPIMode(): boolean {
    return this.mode === 'api';
  }

  /**
   * Get the appropriate data service instance based on mode
   */
  getDataService(): IDataService {
    if (!this.dataService) {
      if (this.mode === 'api') {
        const apiBaseURL = import.meta.env.VITE_API_BASE_URL as string;
        this.dataService = new APIService(apiBaseURL);
        
        if (import.meta.env.DEV) {
          console.log(`[DataConfig] Using API service with base URL: ${apiBaseURL || 'default'}`);
        }
      } else {
        this.dataService = new MockDataService();
        
        if (import.meta.env.DEV) {
          console.log('[DataConfig] Using Mock data service');
        }
      }
    }
    
    return this.dataService;
  }

  /**
   * Reset the data service instance (useful for testing or mode switching)
   */
  resetDataService(): void {
    this.dataService = null;
  }

  /**
   * Set mode programmatically (primarily for testing)
   * Note: This won't affect environment variables
   */
  setMode(mode: DataMode): void {
    if (this.mode !== mode) {
      this.mode = mode;
      this.resetDataService();
      
      if (import.meta.env.DEV) {
        console.log(`[DataConfig] Mode changed to: ${mode}`);
      }
    }
  }
}

// Singleton instance
const dataConfig = new DataConfig();

export default dataConfig;
