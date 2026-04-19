/**
 * Light Mode Verification Script
 * 
 * This script provides utilities to verify light mode functionality.
 * Run this in the browser console to test light mode features.
 */

interface VerificationResult {
  test: string;
  passed: boolean;
  message: string;
}

/**
 * Verify theme context is properly initialized
 */
function verifyThemeContext(): VerificationResult {
  try {
    // Check if theme class is applied to document root
    const root = document.documentElement;
    const hasThemeClass = root.classList.contains('light') || root.classList.contains('dark');
    
    if (!hasThemeClass) {
      return {
        test: 'Theme Context',
        passed: false,
        message: 'No theme class found on document root'
      };
    }

    // Check if theme toggle exists
    const themeToggle = document.querySelector('[aria-label*="mode"]');
    if (!themeToggle) {
      return {
        test: 'Theme Context',
        passed: false,
        message: 'Theme toggle button not found'
      };
    }

    return {
      test: 'Theme Context',
      passed: true,
      message: `Theme system initialized with ${root.classList.contains('light') ? 'light' : 'dark'} mode`
    };
  } catch (error) {
    return {
      test: 'Theme Context',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Verify light mode CSS variables are properly set
 */
function verifyLightModeVariables(): VerificationResult {
  try {
    const root = document.documentElement;
    
    // Force light mode for testing
    root.classList.remove('dark');
    root.classList.add('light');
    
    const computedStyle = getComputedStyle(root);
    
    // Check key CSS variables
    const background = computedStyle.getPropertyValue('--background').trim();
    const foreground = computedStyle.getPropertyValue('--foreground').trim();
    const card = computedStyle.getPropertyValue('--card').trim();
    
    if (!background || !foreground || !card) {
      return {
        test: 'Light Mode Variables',
        passed: false,
        message: 'Missing CSS custom properties for light mode'
      };
    }

    // Verify light mode values (should be light backgrounds, dark text)
    const bgValues = background.split(' ').map(v => parseInt(v.trim()));
    const fgValues = foreground.split(' ').map(v => parseInt(v.trim()));
    
    // Light mode should have high background values (light) and low foreground values (dark)
    const isLightBackground = bgValues.every(v => v > 200);
    const isDarkForeground = fgValues.every(v => v < 100);
    
    if (!isLightBackground || !isDarkForeground) {
      return {
        test: 'Light Mode Variables',
        passed: false,
        message: `Invalid light mode colors - bg: ${background}, fg: ${foreground}`
      };
    }

    return {
      test: 'Light Mode Variables',
      passed: true,
      message: 'Light mode CSS variables properly configured'
    };
  } catch (error) {
    return {
      test: 'Light Mode Variables',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Verify theme switching functionality
 */
function verifyThemeSwitching(): VerificationResult {
  try {
    const root = document.documentElement;
    const themeToggle = document.querySelector('[aria-label*="mode"]') as HTMLButtonElement;
    
    if (!themeToggle) {
      return {
        test: 'Theme Switching',
        passed: false,
        message: 'Theme toggle button not found'
      };
    }

    // Record initial state
    const initialTheme = root.classList.contains('light') ? 'light' : 'dark';
    
    // Simulate click
    themeToggle.click();
    
    // Check if theme changed
    const newTheme = root.classList.contains('light') ? 'light' : 'dark';
    
    if (initialTheme === newTheme) {
      return {
        test: 'Theme Switching',
        passed: false,
        message: 'Theme did not change after toggle click'
      };
    }

    // Switch back
    themeToggle.click();
    const finalTheme = root.classList.contains('light') ? 'light' : 'dark';
    
    if (finalTheme !== initialTheme) {
      return {
        test: 'Theme Switching',
        passed: false,
        message: 'Theme did not return to initial state'
      };
    }

    return {
      test: 'Theme Switching',
      passed: true,
      message: 'Theme switching works correctly'
    };
  } catch (error) {
    return {
      test: 'Theme Switching',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Verify localStorage persistence
 */
function verifyThemePersistence(): VerificationResult {
  try {
    const root = document.documentElement;
    
    // Set to light mode
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Trigger storage (simulate theme change)
    const themeToggle = document.querySelector('[aria-label*="mode"]') as HTMLButtonElement;
    if (themeToggle) {
      themeToggle.click(); // Switch to dark
      themeToggle.click(); // Switch back to light
    }
    
    // Check localStorage
    const storedTheme = localStorage.getItem('theme-preference');
    
    if (!storedTheme) {
      return {
        test: 'Theme Persistence',
        passed: false,
        message: 'No theme preference found in localStorage'
      };
    }

    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      return {
        test: 'Theme Persistence',
        passed: false,
        message: `Invalid theme value in localStorage: ${storedTheme}`
      };
    }

    return {
      test: 'Theme Persistence',
      passed: true,
      message: `Theme persistence working - stored: ${storedTheme}`
    };
  } catch (error) {
    return {
      test: 'Theme Persistence',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Verify light mode component styling
 */
function verifyLightModeComponents(): VerificationResult {
  try {
    const root = document.documentElement;
    
    // Force light mode
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Check body background
    const bodyStyle = getComputedStyle(document.body);
    const bodyBg = bodyStyle.backgroundColor;
    
    // Check if body has light background (should be rgb values > 200)
    const rgbMatch = bodyBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(v => parseInt(v));
      const isLightBackground = r > 200 && g > 200 && b > 200;
      
      if (!isLightBackground) {
        return {
          test: 'Light Mode Components',
          passed: false,
          message: `Body background not light enough: ${bodyBg}`
        };
      }
    }

    // Check for light mode specific elements
    const cards = document.querySelectorAll('[class*="bg-white"], [class*="bg-neutral-50"]');
    const buttons = document.querySelectorAll('button');
    
    if (cards.length === 0) {
      return {
        test: 'Light Mode Components',
        passed: false,
        message: 'No light-themed cards found'
      };
    }

    if (buttons.length === 0) {
      return {
        test: 'Light Mode Components',
        passed: false,
        message: 'No buttons found for testing'
      };
    }

    return {
      test: 'Light Mode Components',
      passed: true,
      message: `Light mode components rendered - ${cards.length} cards, ${buttons.length} buttons`
    };
  } catch (error) {
    return {
      test: 'Light Mode Components',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Run all light mode verification tests
 */
export function runLightModeVerification(): void {
  console.log('🌞 Light Mode Verification Tests\n');
  console.log('Running comprehensive light mode functionality tests...\n');
  
  const tests = [
    verifyThemeContext,
    verifyLightModeVariables,
    verifyThemeSwitching,
    verifyThemePersistence,
    verifyLightModeComponents
  ];
  
  const results: VerificationResult[] = [];
  
  tests.forEach(test => {
    const result = test();
    results.push(result);
    
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.test}`);
    console.log(`   ${result.message}\n`);
  });
  
  const passCount = results.filter(r => r.passed).length;
  const failCount = results.filter(r => !r.passed).length;
  
  console.log('─'.repeat(50));
  console.log(`\n📊 Results: ${passCount} passed, ${failCount} failed`);
  
  if (failCount === 0) {
    console.log('✅ All light mode functionality tests passed!');
  } else {
    console.warn('⚠️  Some tests failed. Light mode may not be fully functional.');
  }
  
  return results;
}

/**
 * Quick light mode test - just verify basic functionality
 */
export function quickLightModeTest(): boolean {
  try {
    const root = document.documentElement;
    
    // Test theme switching
    const initialTheme = root.classList.contains('light') ? 'light' : 'dark';
    
    // Switch to light mode
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Check if light mode CSS is applied
    const bodyStyle = getComputedStyle(document.body);
    const bodyBg = bodyStyle.backgroundColor;
    
    // Light mode should have light background
    const rgbMatch = bodyBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(v => parseInt(v));
      const isLightBackground = r > 200 && g > 200 && b > 200;
      
      console.log(`🌞 Quick Light Mode Test: ${isLightBackground ? 'PASS' : 'FAIL'}`);
      console.log(`   Body background: ${bodyBg}`);
      
      return isLightBackground;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Quick light mode test failed:', error);
    return false;
  }
}

// Make functions available in browser console
if (typeof window !== 'undefined') {
  (window as any).runLightModeVerification = runLightModeVerification;
  (window as any).quickLightModeTest = quickLightModeTest;
  
  console.log('🌞 Light Mode Verification loaded!');
  console.log('Run these commands in the console:');
  console.log('  - runLightModeVerification() - Full test suite');
  console.log('  - quickLightModeTest() - Quick verification');
}