import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ValueLab from './ValueLab';

// Mock the API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 'test-investor',
        name: 'Test Investor',
        performance: [
          { date: '2020-01-01', value: 100 },
          { date: '2021-01-01', value: 110 }
        ]
      }
    ]),
  })
) as jest.Mock;

describe('ValueLab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<ValueLab />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  test('renders data after loading', async () => {
    render(<ValueLab />);
    
    await waitFor(() => {
      expect(screen.getByText('Value-Investor Performance Lab')).toBeInTheDocument();
      expect(screen.getByText('Test Investor')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    ) as jest.Mock;

    render(<ValueLab />);
    
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });
}); 