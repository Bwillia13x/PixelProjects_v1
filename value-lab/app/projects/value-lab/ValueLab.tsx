"use client";

import React, { useState, useEffect } from 'react';
import HistoricalPerformanceChart from './HistoricalPerformanceChart';
import KeyMetrics from './KeyMetrics';
import { calculateCAGR, calculateMaxDrawdown, calculateSharpeRatio } from '../../lib/finance-utils';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
    {children}
  </div>
);

interface InvestorPerformance {
  date: string;
  value: number;
}

interface Investor {
  id: string;
  name: string;
  performance: InvestorPerformance[];
}

interface CalculatedMetrics {
  cagr: number;
  maxDrawdown: number;
  sharpeRatio: number;
}

const ValueLab = () => {
  const [investorData, setInvestorData] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvestorId, setSelectedInvestorId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<CalculatedMetrics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/value-investors');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data: Investor[] = await response.json();
        setInvestorData(data);
        if (data.length > 0) setSelectedInvestorId(data[0].id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedInvestorId) return;
    const investor = investorData.find(i => i.id === selectedInvestorId);
    if (investor) {
      setMetrics({
        cagr: calculateCAGR(investor.performance),
        maxDrawdown: calculateMaxDrawdown(investor.performance),
        sharpeRatio: calculateSharpeRatio(investor.performance)
      });
    }
  }, [selectedInvestorId, investorData]);

  const chartData = React.useMemo(() => {
    const map: Record<string, any> = {};
    investorData.forEach(inv => {
      inv.performance.forEach(p => {
        if (!map[p.date]) map[p.date] = { date: p.date };
        map[p.date][inv.id] = p.value;
      });
    });
    return Object.values(map).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [investorData]);

  const investors = investorData.map(({ id, name }) => ({ id, name }));
  const investorName = investors.find(i => i.id === selectedInvestorId)?.name || '';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Value-Investor Performance Lab</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Uncover risk-adjusted returns of legendary value investors.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Controls</h2>
            <label className="block text-sm font-medium mb-2" htmlFor="inv-select">Select Investor</label>
            <select
              id="inv-select"
              className="w-full p-2 rounded border dark:bg-gray-700"
              value={selectedInvestorId || ''}
              onChange={e => setSelectedInvestorId(e.target.value)}
              disabled={loading}
            >
              {investors.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </Card>
        </aside>

        <main className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Historical Performance</h2>
            {loading ? (
              <div className="h-60 flex items-center justify-center">Loading…</div>
            ) : error ? (
              <div className="h-60 flex items-center justify-center text-red-500">{error}</div>
            ) : (
              <>
                <HistoricalPerformanceChart data={chartData} investors={investors} />
                <div className="mt-6"><KeyMetrics metrics={metrics} investorName={investorName} /></div>
              </>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ValueLab; 