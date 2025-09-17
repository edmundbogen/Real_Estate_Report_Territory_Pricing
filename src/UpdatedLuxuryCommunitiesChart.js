import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UpdatedLuxuryCommunitiesChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [sortBy, setSortBy] = useState('community');

  const data = [
    { community: 'St. Andrews', active: 11, sold: 26, total: 37, soldRatio: 70.3 },
    { community: 'Addison Reserve', active: 3, sold: 20, total: 23, soldRatio: 87.0 },
    { community: 'The Oaks', active: 17, sold: 24, total: 41, soldRatio: 58.5 },
    { community: 'Delaire', active: 3, sold: 17, total: 20, soldRatio: 85.0 },
    { community: 'Le Lac', active: 0, sold: 0, total: 0, soldRatio: 0 },
    { community: 'Royal Palm Yacht Club', active: 34, sold: 25, total: 59, soldRatio: 42.4 },
    { community: 'Broken Sound', active: 21, sold: 74, total: 95, soldRatio: 77.9 },
    { community: 'Long Lake Estates', active: 7, sold: 3, total: 10, soldRatio: 30.0 },
    { community: 'Mizner Country Club', active: 12, sold: 9, total: 21, soldRatio: 42.9 },
    { community: 'Polo Club', active: 17, sold: 52, total: 69, soldRatio: 75.4 },
    { community: 'The Sanctuary', active: 5, sold: 6, total: 11, soldRatio: 54.5 },
    { community: 'Bocaire Country Club', active: 12, sold: 18, total: 30, soldRatio: 60.0 },
    { community: 'Lotus', active: 19, sold: 32, total: 51, soldRatio: 62.7 },
    { community: 'Boca Bridges', active: 8, sold: 26, total: 34, soldRatio: 76.5 },
    { community: 'Boca West', active: 56, sold: 141, total: 197, soldRatio: 71.6 },
    { community: 'Boca Grove', active: 9, sold: 10, total: 19, soldRatio: 52.6 },
    { community: 'Seven Bridges', active: 12, sold: 27, total: 39, soldRatio: 69.2 },
    { community: 'The Bridges', active: 8, sold: 15, total: 23, soldRatio: 65.2 },
    { community: 'Seasons', active: 7, sold: 7, total: 14, soldRatio: 50.0 },
    { community: 'Woodfield', active: 25, sold: 53, total: 78, soldRatio: 67.9 },
    { community: 'Stonebridge', active: 11, sold: 15, total: 26, soldRatio: 57.7 }
  ].filter(item => item.total > 0);

  const sortedData = [...data].sort((a, b) => {
    switch(sortBy) {
      case 'sold': return b.sold - a.sold;
      case 'active': return b.active - a.active;
      case 'total': return b.total - a.total;
      case 'soldRatio': return b.soldRatio - a.soldRatio;
      default: return a.community.localeCompare(b.community);
    }
  });

  const totalActive = data.reduce((sum, item) => sum + item.active, 0);
  const totalSold = data.reduce((sum, item) => sum + item.sold, 0);

  const pieData = [
    { name: 'Active Listings', value: totalActive, color: '#c4963d' },
    { name: 'Properties Sold', value: totalSold, color: '#2c3e50' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <p className="text-blue-600">Active: {data.active}</p>
          <p className="text-green-600">Sold: {data.sold}</p>
          <p className="text-gray-600">Total Activity: {data.total}</p>
          <p className="text-purple-600">Sold Ratio: {data.soldRatio}%</p>
        </div>
      );
    }
    return null;
  };

  // Calculate key market insights
  const topPerformers = [...data].sort((a, b) => b.soldRatio - a.soldRatio).slice(0, 3);
  const mostActive = [...data].sort((a, b) => b.total - a.total).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-2">South Florida Luxury Communities</h1>
        <p className="text-gray-200 text-lg">Updated Market Analysis & Activity Report</p>

        {/* St. Andrews Price Range Highlight */}
        <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">St. Andrews Country Club</h3>
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-300">Highest Sale</p>
              <p className="text-2xl font-bold text-green-300">$10,500,000</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">Lowest Sale</p>
              <p className="text-2xl font-bold text-blue-300">$2,150,000</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">Market Activity</p>
              <p className="text-lg font-semibold text-white">11 Active / 26 Sold</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">Sold Ratio</p>
              <p className="text-lg font-semibold text-yellow-300">70.3%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Insights Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-3 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base font-medium text-gray-600">Top Sold Ratio</p>
            <p className="text-base sm:text-xl font-bold text-green-600">{topPerformers[0]?.community} ({topPerformers[0]?.soldRatio}%)</p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base font-medium text-gray-600">Most Active Market</p>
            <p className="text-base sm:text-xl font-bold text-blue-600">{mostActive[0]?.community} ({mostActive[0]?.total})</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm sm:text-base font-medium text-gray-600">Market Growth</p>
            <p className="text-base sm:text-xl font-bold text-purple-600">+{totalSold - 490} sold</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="pie">Market Overview</option>
              </select>
            </div>

            {chartType === 'bar' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="community">Community Name</option>
                  <option value="sold">Properties Sold</option>
                  <option value="active">Active Listings</option>
                  <option value="total">Total Activity</option>
                  <option value="soldRatio">Sold Ratio %</option>
                </select>
              </div>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Total Market Activity</p>
            <p className="text-lg font-semibold text-gray-800">{totalActive} Active • {totalSold} Sold</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="community"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sold" fill="#2c3e50" name="Properties Sold" radius={[2, 2, 0, 0]} />
              <Bar dataKey="active" fill="#c4963d" name="Active Listings" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Updated Market Summary</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Active Listings</p>
                  <p className="text-2xl font-bold text-yellow-600">{totalActive}</p>
                  <p className="text-xs text-green-600">+{totalActive - 332} from last period</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Properties Sold</p>
                  <p className="text-2xl font-bold text-gray-800">{totalSold}</p>
                  <p className="text-xs text-green-606">+{totalSold - 490} from last period</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Overall Market Activity</p>
                  <p className="text-2xl font-bold text-blue-600">{totalActive + totalSold}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Communities Tracked</p>
                  <p className="text-2xl font-bold text-green-600">{data.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Performance Highlights */}
      <div className="bg-gray-50 p-6 m-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Market Performance Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Top Performers by Sold Ratio</h4>
            <div className="space-y-2">
              {topPerformers.map((community, index) => (
                <div key={community.community} className="flex justify-between items-center bg-white p-3 rounded">
                  <span className="font-medium">{index + 1}. {community.community}</span>
                  <span className="text-green-600 font-semibold">{community.soldRatio}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Highest Activity Communities</h4>
            <div className="space-y-2">
              {mostActive.map((community, index) => (
                <div key={community.community} className="flex justify-between items-center bg-white p-3 rounded">
                  <span className="font-medium">{index + 1}. {community.community}</span>
                  <span className="text-blue-600 font-semibold">{community.total} properties</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 rounded-b-lg text-center">
        <p className="text-sm text-gray-600">
          Updated market data reflects current activity across South Florida's premier luxury communities
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Generated by The Edmund Bogen Team • Updated Market Analysis Dashboard
        </p>
      </div>
    </div>
  );
};

export default UpdatedLuxuryCommunitiesChart;