import { calculateCAGR, calculateMaxDrawdown, calculateSharpeRatio, PerformanceData } from './finance-utils';

const sampleData: PerformanceData[] = [
  { date: '2020-01-01', value: 100 },
  { date: '2021-01-01', value: 110 },
  { date: '2022-01-01', value: 121 },
  { date: '2023-01-01', value: 133.1 }
];

describe('Finance Utils', () => {
  test('calculateCAGR returns correct compound annual growth rate', () => {
    const cagr = calculateCAGR(sampleData);
    expect(cagr).toBeCloseTo(10, 1); // ~10% CAGR
  });

  test('calculateMaxDrawdown returns correct maximum drawdown', () => {
    const drawdownData: PerformanceData[] = [
      { date: '2020-01-01', value: 100 },
      { date: '2020-02-01', value: 120 },
      { date: '2020-03-01', value: 90 }, // 25% drawdown from peak
      { date: '2020-04-01', value: 110 }
    ];
    const maxDrawdown = calculateMaxDrawdown(drawdownData);
    expect(maxDrawdown).toBeCloseTo(-25, 1);
  });

  test('calculateSharpeRatio returns reasonable value', () => {
    const sharpe = calculateSharpeRatio(sampleData);
    expect(sharpe).toBeGreaterThan(0);
    expect(sharpe).toBeLessThan(10); // Reasonable range
  });

  test('handles edge cases gracefully', () => {
    const emptyData: PerformanceData[] = [];
    const singlePoint: PerformanceData[] = [{ date: '2020-01-01', value: 100 }];
    
    expect(calculateCAGR(emptyData)).toBe(0);
    expect(calculateCAGR(singlePoint)).toBe(0);
    expect(calculateSharpeRatio(emptyData)).toBe(0);
    expect(calculateSharpeRatio(singlePoint)).toBe(0);
  });
}); 