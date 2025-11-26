import { useEffect, useState } from 'react';
import { get } from '../../lib/api';

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
  database: string;
}

export const HealthCheck = () => {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const response = await get<HealthCheckResponse>('/health');
        setHealthData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to connect to the server. Please check if the backend is running.');
        console.error('Health check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return <div>Checking connection to backend...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="font-bold">Connection Error</h2>
        <p>{error}</p>
        <p className="mt-2 text-sm">
          Make sure the backend server is running on http://localhost:5000
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      <h2 className="font-bold">Connection Successful!</h2>
      <div className="mt-2">
        <p><strong>Status:</strong> {healthData?.status}</p>
        <p><strong>Database:</strong> {healthData?.database}</p>
        <p><strong>Uptime:</strong> {healthData?.uptime} seconds</p>
        <p><strong>Last Checked:</strong> {new Date(healthData?.timestamp || '').toLocaleString()}</p>
      </div>
    </div>
  );
};

export default HealthCheck;
