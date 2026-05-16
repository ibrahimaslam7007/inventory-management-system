import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Inventory Management System</h1>
        <p style={styles.subtitle}>
          Manage products, track stock, and keep your business organized.
        </p>
        <div style={styles.actions}>
          <Link to="/dashboard" style={styles.primaryBtn}>Go to Dashboard</Link>
          <Link to="/products" style={styles.secondaryBtn}>View Products</Link>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>Simple</h3>
          <p>Clean interface for easy daily use.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Fast</h3>
          <p>Track products and stock without manual work.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Useful</h3>
          <p>Search, filter, and monitor low-stock items.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f6f8',
    padding: '40px 20px'
  },
  hero: {
    maxWidth: '900px',
    margin: '0 auto',
    background: '#fff',
    padding: '40px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eef2f7',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: '2.2rem',
    color: '#111827'
  },
  subtitle: {
    marginTop: '12px',
    fontSize: '1.05rem',
    color: '#4b5563'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '24px',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    background: '#111827',
    color: '#fff',
    textDecoration: 'none'
  },
  secondaryBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#111827',
    textDecoration: 'none'
  },
  features: {
    maxWidth: '900px',
    margin: '24px auto 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  },
  featureCard: {
    background: '#fff',
    padding: '20px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eef2f7'
  }
};

export default Home;