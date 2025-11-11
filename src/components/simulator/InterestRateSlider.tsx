import { useState, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { formatPercentage } from '@/utils/formatters';

interface InterestRateSliderProps {
  currentRate: number;
  recommendedRate: number;
  onRateChange: (adjustment: number) => void;
  minRate?: number;
  maxRate?: number;
  step?: number;
}

export function InterestRateSlider({
  currentRate,
  recommendedRate,
  onRateChange,
  minRate = -3,
  maxRate = 3,
  step = 0.1,
}: InterestRateSliderProps) {
  const [adjustment, setAdjustment] = useState(0);
  const [inputValue, setInputValue] = useState('0.0');
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Calculate the new rate based on adjustment
  const newRate = recommendedRate + adjustment;
  const adjustmentPercentage = currentRate !== 0 
    ? ((newRate - currentRate) / currentRate) * 100 
    : 0;

  // Debounced callback to parent
  const debouncedOnRateChange = useCallback(
    (value: number) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        onRateChange(value);
      }, 300);

      setDebounceTimer(timer);
    },
    [onRateChange, debounceTimer]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const handleSliderChange = (values: number[]) => {
    const value = values[0];
    setAdjustment(value);
    setInputValue(value.toFixed(1));
    debouncedOnRateChange(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= minRate && numValue <= maxRate) {
      setAdjustment(numValue);
      debouncedOnRateChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < minRate || numValue > maxRate) {
      setInputValue(adjustment.toFixed(1));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Adjust Interest Rate</h3>
          <p className="text-sm text-muted-foreground">
            Move the slider to simulate different interest rate scenarios
          </p>
        </div>

        <div className="space-y-4">
          {/* Current and New Rate Display */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Rate</p>
              <p className="text-2xl font-bold">{formatPercentage(currentRate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommended</p>
              <p className="text-2xl font-bold text-primary">
                {formatPercentage(recommendedRate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Simulated Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatPercentage(newRate)}
              </p>
            </div>
          </div>

          {/* Adjustment Display */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rate Adjustment</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-bold ${
                    adjustment > 0
                      ? 'text-rose-600'
                      : adjustment < 0
                      ? 'text-emerald-700'
                      : 'text-muted-foreground'
                  }`}
                >
                  {adjustment > 0 ? '+' : ''}
                  {formatPercentage(adjustment)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({adjustmentPercentage > 0 ? '+' : ''}
                  {adjustmentPercentage.toFixed(1)}% from current)
                </span>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <Slider
              value={[adjustment]}
              onValueChange={handleSliderChange}
              min={minRate}
              max={maxRate}
              step={step}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatPercentage(minRate)}</span>
              <span>0%</span>
              <span>{formatPercentage(maxRate)}</span>
            </div>
          </div>

          {/* Input Field */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Fine-tune:
            </label>
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              min={minRate}
              max={maxRate}
              step={step}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">percentage points</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
