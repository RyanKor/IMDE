import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface DatabaseStatus {
  name: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  connections: number;
}

const initialData: DatabaseStatus[] = [
  { name: 'RDBMS', status: 'online', responseTime: 20, connections: 100 },
  { name: 'NoSQL', status: 'online', responseTime: 15, connections: 80 },
  { name: 'VectorDB', status: 'online', responseTime: 25, connections: 50 },
];

const DatabaseMonitoring: React.FC = () => {
  const [data, setData] = useState<DatabaseStatus[]>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    const fetchData = () => {
      setTimeout(() => {
        setData(initialData.map(db => ({
          ...db,
          responseTime: Math.floor(Math.random() * 50) + 10,
          connections: Math.floor(Math.random() * 150) + 50,
          status: Math.random() > 0.9 ? 'warning' : 'online',
        })));
        setLoading(false);
      }, 1000);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Monitoring Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((db) => (
          <div key={db.name} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{db.name}</h2>
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                db.status === 'online' ? 'bg-green-500' :
                db.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="capitalize">{db.status}</span>
            </div>
            <p>Response Time: {db.responseTime} ms</p>
            <p>Active Connections: {db.connections}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="responseTime" fill="#8884d8" name="Response Time (ms)" />
            <Bar yAxisId="right" dataKey="connections" fill="#82ca9d" name="Connections" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DatabaseMonitoring;