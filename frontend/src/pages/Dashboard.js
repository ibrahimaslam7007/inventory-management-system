import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalStock: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/stats');
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Dashboard</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Products</h3>
          <p style={styles.value}>{stats.totalProducts}</p>
        </div>
        <div style={styles.card}>
          <h3>Low Stock Items</h3>
          <p style={styles.value}>{stats.lowStockProducts}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Stock</h3>
          <p style={styles.value}>{stats.totalStock}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '24px',
    background: '#f4f6f8',
    minHeight: '100vh'
  },
  heading: {
    marginBottom: '20px',
    color: '#111827'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px'
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eef2f7'
  },
  value: {
    fontSize: '2rem',
    fontWeight: '700',
    marginTop: '10px',
    color: '#111827'
  }
};

export default Dashboard;