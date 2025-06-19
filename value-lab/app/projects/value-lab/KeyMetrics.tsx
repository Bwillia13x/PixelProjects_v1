"use client";
import React from 'react';

interface Props { metrics: { cagr: number; maxDrawdown: number; sharpeRatio: number } | null; investorName: string; }
const Item = ({ label, value, unit='' }: { label: string; value: string; unit?: string }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded text-center">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}{unit}</p>
  </div>
);

export default function KeyMetrics({ metrics, investorName }: Props) {
  if (!metrics) return null;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Metrics: <span className="text-blue-500">{investorName}</span></h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Item label="CAGR" value={metrics.cagr.toFixed(2)} unit="%" />
        <Item label="Max Drawdown" value={metrics.maxDrawdown.toFixed(2)} unit="%" />
        <Item label="Sharpe Ratio" value={metrics.sharpeRatio.toFixed(2)} />
      </div>
    </div>
  );
} 