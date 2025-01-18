export interface Pulse {
  id: string;
  description: string;
  pair: string;
}

export interface Statistics {
  totalTrades: number;
  wins: number;
  losses: number;
  strikeRate: number;
  profitGainLoss?: number;
}

export interface Trade {
  id?: string;
  date: string;
  profitLossPct: number;
  outcome: "Win" | "Loss" | "Break-even";
  riskPct: number;
}
