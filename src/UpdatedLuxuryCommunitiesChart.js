import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UpdatedLuxuryCommunitiesChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [sortBy, setSortBy] = useState('community');

  const data = [
    { community: 'St. Andrews', active: 14, sold: 27, total: 41, soldRatio: 65.9 },
    { community: 'Addison Reserve', active: 9, sold: 22, total: 31, soldRatio: 71.0 },
    { community: 'The Oaks', active: 13, sold: 28, total: 41, soldRatio: 68.3 },
    { community: 'Delaire', active: 2, sold: 17, total: 19, soldRatio: 89.5 },
    { community: 'Le Lac', active: 0, sold: 0, total: 0, soldRatio: 0 },
    { community: 'Royal Palm Yacht Club', active: 34, sold: 28, total: 62, soldRatio: 45.2 },
    { community: 'Broken Sound', active: 25, sold: 82, total: 107, soldRatio: 76.6 },
    { community: 'Long Lake Estates', active: 7, sold: 3, total: 10, soldRatio: 30.0 },
    { community: 'Mizner Country Club', active: 9, sold: 10, total: 19, soldRatio: 52.6 },
    { community: 'Polo Club', active: 13, sold: 51, total: 64, soldRatio: 79.7 },
    { community: 'The Sanctuary', active: 6, sold: 6, total: 12, soldRatio: 50.0 },
    { community: 'Bocaire Country Club', active: 13, sold: 18, total: 31, soldRatio: 58.1 },
    { community: 'Lotus', active: 19, sold: 33, total: 52, soldRatio: 63.5 },
    { community: 'Boca Bridges', active: 9, sold: 25, total: 34, soldRatio: 73.5 },
    { community: 'Boca West', active: 51, sold: 152, total: 203, soldRatio: 74.9 },
    { community: 'Boca Grove', active: 7, sold: 13, total: 20, soldRatio: 65.0 },
    { community: 'Seven Bridges', active: 11, sold: 27, total: 38, soldRatio: 71.1 },
    { community: 'The Bridges', active: 10, sold: 18, total: 28, soldRatio: 64.3 },
    { community: 'Seasons', active: 8, sold: 8, total: 16, soldRatio: 50.0 },
    { community: 'Woodfield', active: 19, sold: 48, total: 67, soldRatio: 71.6 },
    { community: 'Stonebridge', active: 13, sold: 16, total: 29, soldRatio: 55.2 }
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
              <p className="text-lg font-semibold text-white">14 Active / 27 Sold</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">Sold Ratio</p>
              <p className="text-lg font-semibold text-yellow-300">65.9%</p>
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