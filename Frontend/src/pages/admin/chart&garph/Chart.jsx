import React, { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { getChartDeatilsAPI } from '../../../Server/allAPI';

const Chart = () => {
  const [chartData, setChartData] = useState({
    totalUsers: 0,
    totalStations: 0,
    weeklyData: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getChartDeatilsAPI();
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-t from-gray-700 to-black p-4 md:p-6 rounded-xl">
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">User and Station Trends</h2>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /> {/* Add grid lines */}
                <XAxis dataKey="day" stroke="#EDEFEF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#F0EFE7" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="New Users"
                />
                <Area
                  type="monotone"
                  dataKey="newStations"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="New Stations"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gradient-to-t from-gray-700 to-black p-4 md:p-6 rounded-xl">
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Station Usage</h2>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="day" stroke="#EDEFEF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#EDEFEF" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="newStations" fill="#10B981" name="New Stations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;