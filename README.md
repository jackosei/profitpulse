# ProfitPulse

A modern forex trading results tracking application built with React, TypeScript, and Firebase. ProfitPulse helps traders analyze their performance with detailed metrics and visualizations.

## Features

- User authentication with Firebase
- Track trades and performance for multiple currency pairs
- Visualize profit/loss trends with charts
- Generate reports and key statistics:
  - Total trades
  - Win/loss ratio
  - Strike rate
  - Average win/loss
  - Maximum consecutive wins/losses
  - Total profit/loss

## Technologies

- **Frontend**: React, TypeScript, Material UI, Tailwind CSS
- **Backend**: Firebase Authentication and Firestore
- **Charts**: Chart.js or Recharts
- **Build Tool**: Vite

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v16 or higher)
- npm (or yarn)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jackosei/profitpulse.git
   cd profitpulse
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Usage

- **Sign Up**: Create a new account to start tracking your trades.
- **Dashboard**: View your trading statistics and insights.
- **Add Trades**: Log individual trades with details like date, profit/loss, and outcome.
- **Reports**: Generate detailed performance reports for any date range.

## License

This project is licensed under the MIT License
