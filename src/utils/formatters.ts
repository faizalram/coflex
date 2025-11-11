/**
 * Format a number as Indonesian Rupiah currency
 * @param amount - Amount in IDR
 * @param compact - Use compact notation (e.g., 1.5T instead of 1,500,000,000,000)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, compact: boolean = false): string {
  if (compact) {
    // Use compact notation for large numbers
    if (amount >= 1_000_000_000_000) {
      return `Rp ${(amount / 1_000_000_000_000).toFixed(2)}T`;
    } else if (amount >= 1_000_000_000) {
      return `Rp ${(amount / 1_000_000_000).toFixed(2)}M`;
    } else if (amount >= 1_000_000) {
      return `Rp ${(amount / 1_000_000).toFixed(2)}Jt`;
    }
  }

  // Standard formatting with thousand separators
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number as percentage
 * @param value - Percentage value (e.g., 5.5 for 5.5%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a large number with compact notation
 * @param value - Number to format
 * @returns Formatted string (e.g., "1.5K", "2.3M", "5.7B")
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)}T`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Format a date to Indonesian locale string
 * @param date - Date to format
 * @param format - Format type ('short', 'medium', 'long')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    medium: { day: 'numeric', month: 'long', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };

  return new Intl.DateTimeFormat('id-ID', formatOptions[format]).format(dateObj);
}

/**
 * Format a number with thousand separators
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a relative time string (e.g., "2 days ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Hari ini';
  } else if (diffDays === 1) {
    return 'Kemarin';
  } else if (diffDays < 7) {
    return `${diffDays} hari yang lalu`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} minggu yang lalu`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} bulan yang lalu`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} tahun yang lalu`;
  }
}
