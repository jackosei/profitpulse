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
