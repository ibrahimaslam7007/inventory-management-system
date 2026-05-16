import { useEffect, useState } from 'react';
import API from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (categoryFilter) params.category = categoryFilter;
      if (lowStockOnly) params.lowStock = true;

      const { data } = await API.get('/products', { params });
      setProducts(data);
    } catch (error) {
      setMessage('Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter, lowStockOnly]);

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
      if (editingId) {
        await API.put(`/products/${editingId}`, {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });
        setMessage('Product updated successfully');
        setEditingId(null);
      } else {
        await API.post('/products', {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });
        setMessage('Product added successfully');
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: ''
      });

      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      await API.delete(`/products/${id}`);
      setMessage('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      setMessage('Delete failed');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setLowStockOnly(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Products</h2>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.filterBar}>
          <input
            style={styles.filterInput}
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            style={styles.filterInput}
            type="text"
            placeholder="Filter by category..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
          <label style={styles.checkboxWrap}>
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
            />
            <span>Low stock only</span>
          </label>
          <button type="button" style={styles.clearBtn} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <button style={styles.button} type="submit">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td style={{ color: product.stock <= 5 ? '#dc2626' : 'inherit' }}>
                      {product.stock}
                    </td>
                    <td>
                      <button
                        style={styles.actionBtn}
                        onClick={() => handleEdit(product)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(product._id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.emptyRow}>
                    No products found
                  </td>
                </tr>
              )}
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
  message: {
    marginBottom: '12px',
    color: '#374151'
  },
  filterBar: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr auto',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center'
  },
  filterInput: {
    padding: '11px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px'
  },
  checkboxWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#374151'
  },
  clearBtn: {
    padding: '11px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    background: '#fff',
    cursor: 'pointer'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
  },
  actionBtn: {
    marginRight: '8px',
    padding: '7px 11px',
    border: 'none',
    borderRadius: '6px',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer'
  },
  deleteBtn: {
    padding: '7px 11px',
    border: 'none',
    borderRadius: '6px',
    background: '#dc2626',
    color: '#fff',
    cursor: 'pointer'
  },
  emptyRow: {
    textAlign: 'center',
    padding: '16px',
    color: '#6b7280'
  }
};

export default Products;