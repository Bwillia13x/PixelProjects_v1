"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData { date: string; [key: string]: number | string; }
interface Props { data: PerformanceData[]; investors: { id: string; name: string }[]; }

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

export default function HistoricalPerformanceChart({ data, investors }: Props) {
  if (!data.length)
    return <div className="h-60 flex items-center justify-center text-gray-500">No data</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {investors.map((inv, idx) => (
          <Line key={inv.id} type="monotone" dataKey={inv.id} name={inv.name} stroke={COLORS[idx % COLORS.length]} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
} 