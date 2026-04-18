import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // More realistic earnings data for the past 6 months
  const monthlyEarningsData = [
    { month: 'Aug', amount: 6000, trips: 28 },
    { month: 'Sep', amount: 3800, trips: 25 },
    { month: 'Oct', amount: 5100, trips: 34 },
    { month: 'Nov', amount: 4650, trips: 31 },
    { month: 'Dec', amount: 5400, trips: 36 },
    { month: 'Jan', amount: 4900, trips: 32 }
  ];

  // Weekly earnings for current month
  const weeklyEarningsData = [
    { week: 'Week 1', amount: 1200, trips: 8 },
    { week: 'Week 2', amount: 1350, trips: 9 },
    { week: 'Week 3', amount: 1100, trips: 7 },
    { week: 'Week 4', amount: 1250, trips: 8 }
  ];

  // Calculate current month stats
  const currentMonthEarnings = monthlyEarningsData[monthlyEarningsData.length - 1]?.amount || 0;
  const totalTripsThisMonth = monthlyEarningsData[monthlyEarningsData.length - 1]?.trips || 0;
  const averagePerTrip = currentMonthEarnings / totalTripsThisMonth;

  // Custom tooltip for better data display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-green-600">
            Earnings: ₹{payload[0].value.toLocaleString()}
          </p>
          {payload[0].payload.trips && (
            <p className="text-blue-600">
              Trips: {payload[0].payload.trips}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const currentData = selectedPeriod === 'monthly' ? monthlyEarningsData : weeklyEarningsData;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600 mt-2">Track your income, trips, and performance metrics</p>
        </div>
        <button className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-3 py-4 rounded-lg font-medium transition-colors flex items-center space-x-2 min-h-[3rem]">
          <span></span>
          <span>Export Statement</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* This Month Earnings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">This Month</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{currentMonthEarnings.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        {/* Completed Trips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed Orders</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalTripsThisMonth}</p>
              <p className="text-sm text-blue-500 mt-1">+5 from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-500 text-xl">🚗</span>
            </div>
          </div>
        </div>

        {/* Average Per Trip */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Per Trip</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{Math.round(averagePerTrip)}</p>
              <p className="text-sm text-purple-600 mt-1">+₹8 from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
        </div>

        {/* Driver Rating */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Average Rating</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">4.8 ⭐</p>
              <p className="text-sm text-yellow-600 mt-1"></p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Monthly Summary</h3>

          {/* Period Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedPeriod('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === 'weekly'
                ? 'bg-white text-blue-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === 'monthly'
                ? 'bg-white text-blue-500 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey={selectedPeriod === 'monthly' ? 'month' : 'week'}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="amount"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h3>

        <div className="space-y-4">
          {[
            { id: 'ORD-2042', date: 'Today, 2:30 PM', amount: 1800, status: 'Completed', customer: 'Naman Chaudhary' },
            { id: 'ORD-2041', date: 'Today, 11:15 AM', amount: 2200, status: 'Completed', customer: 'Shruti Sharma' },
            { id: 'ORD-2040', date: 'Yesterday, 6:45 PM', amount: 1500, status: 'Completed', customer: 'Amitansh Patel' },
            { id: 'ORD-2039', date: 'Yesterday, 3:20 PM', amount: 2800, status: 'Completed', customer: 'Sneha Joshil' }
          ].map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">₹</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.id}</p>
                  <p className="text-sm text-gray-500">{transaction.customer} • {transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{transaction.amount}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            View All Transactions →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;