import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Inventory App</div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {userInfo && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
        {userInfo && <Link to="/products" style={styles.link}>Products</Link>}
        {userInfo && <Link to="/sales" style={styles.link}>Sales</Link>}
        {!userInfo ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 24px',
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  brand: {
    fontWeight: 700,
    fontSize: '1.05rem',
    color: '#111827'
  },
  links: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  link: {
    color: '#374151',
    textDecoration: 'none'
  },
  logoutBtn: {
    padding: '8px 14px',
    border: 'none',
    borderRadius: '8px',
    background: '#111827',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default Navbar;