import { useEffect, useState } from 'react';
import API from '../services/api';

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    quantitySold: ''
  });

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSales = async () => {
    try {
      const { data } = await API.get('/sales');
      setSales(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await API.post('/sales', {
        productId: formData.productId,
        quantitySold: Number(formData.quantitySold)
      });

      setMessage('Sale recorded successfully');
      setFormData({
        productId: '',
        quantitySold: ''
      });

      fetchProducts();
      fetchSales();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sale failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sell Product</h2>
        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            style={styles.input}
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (Stock: {product.stock})
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            type="number"
            name="quantitySold"
            placeholder="Quantity sold"
            value={formData.quantitySold}
            onChange={handleChange}
          />

          <button style={styles.button} type="submit">
            Record Sale
          </button>
        </form>

        <h3 style={styles.subheading}>Recent Sales</h3>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Sold</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.productName}</td>
                  <td>{sale.quantitySold}</td>
                  <td>{sale.totalPrice}</td>
                  <td>{new Date(sale.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eef2f7'
  },
  heading: {
    marginBottom: '16px',
    color: '#111827'
  },
  subheading: {
    marginTop: '24px',
    marginBottom: '12px',
    color: '#111827'
  },
  message: {
    marginBottom: '12px',
    color: '#374151'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr auto',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '11px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px'
  },
  button: {
    padding: '11px 14px',
    border: 'none',
    borderRadius: '8px',
    background: '#111827',
    color: '#fff',
    cursor: 'pointer'
  },
  tableWrap: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  }
};

export default Sales;