export interface PerformanceData { date: string; value: number }

export const calculateCAGR = (d: PerformanceData[]) => {
  if (d.length < 2) return 0;
  const years = (new Date(d[d.length-1].date).getTime() - new Date(d[0].date).getTime()) / 3.15576e10;
  return (Math.pow(d[d.length-1].value / d[0].value, 1/years) - 1) * 100;
};

export const calculateMaxDrawdown = (d: PerformanceData[]) => {
  let peak = -Infinity, maxDD = 0;
  d.forEach(p => { peak = Math.max(peak, p.value); maxDD = Math.min(maxDD, (p.value-peak)/peak); });
  return maxDD * 100;
};

export const calculateSharpeRatio = (d: PerformanceData[], rf = 0.01) => {
  if (d.length < 2) return 0;
  const rets: number[] = [];
  for (let i=1;i<d.length;i++) rets.push(d[i].value/d[i-1].value-1);
  const mean = rets.reduce((a,b)=>a+b,0)/rets.length;
  const std = Math.sqrt(rets.reduce((s,r)=>s+(r-mean)**2,0)/rets.length);
  if (!std) return Infinity;
  const annRet = (1+mean)**12-1;
  return (annRet-rf)/(std*Math.sqrt(12));
}; 