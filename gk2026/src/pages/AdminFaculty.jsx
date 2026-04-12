import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

function AdminFaculty() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    department: '',
    office: '',
    phone: '',
    email: '',
    headshot: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/faculty`);
      setFaculty(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      setError('Failed to load faculty');
      setFaculty([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingId) {
        await axios.put(`${API_BASE_URL}/admin/faculty/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Faculty member updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/admin/faculty`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Faculty member created successfully');
      }
      setFormOpen(false);
      setEditingId(null);
      setFormData({ first_name: '', last_name: '', department: '', office: '', phone: '', email: '', headshot: '' });
      fetchFaculty();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save faculty member');
    }
  };

  const handleEdit = (member) => {
    setFormData({
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      department: member.department || '',
      office: member.office || '',
      phone: member.phone || '',
      email: member.email || '',
      headshot: member.headshot || ''
    });
    setEditingId(member.id);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_BASE_URL}/admin/faculty/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Faculty member deleted successfully');
        fetchFaculty();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete faculty member');
      }
    }
  };

  const resetForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData({ first_name: '', last_name: '', department: '', office: '', phone: '', email: '', headshot: '' });
  };

  return (
    <Container>
      <div className="flex flex-col w-full gap-0 mb-10">
        <h2>Manage Faculty</h2>
        <div className="mx-20 mb-10 bg-[var(--color-gold-dark)] h-0.5" />
      </div>

      {error && <div className="mx-20 p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">{error}</div>}
      {success && <div className="mx-20 p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">{success}</div>}

      <div className="mx-20 mb-6">
        <button
          onClick={() => setFormOpen(true)}
          className="px-6 py-2 bg-[var(--color-gold-dark)] text-white rounded-lg hover:bg-opacity-80"
        >
          Add New Faculty Member
        </button>
      </div>

      {formOpen && (
        <div className="mx-20 mb-10 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Faculty Member' : 'Add Faculty Member'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name *"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name *"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="office"
              placeholder="Office"
              value={formData.office}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="headshot"
              placeholder="Image URL"
              value={formData.headshot}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded col-span-2"
            />
            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="mx-20">Loading faculty...</div>}
      {!loading && faculty.length === 0 && <div className="mx-20">No faculty members found.</div>}

      <div className="mx-20 mb-10">
        {faculty.map(member => (
          <div key={member.id} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{member.first_name} {member.last_name}</h4>
                <p><span className="font-semibold">Department:</span> {member.department}</p>
                <p><span className="font-semibold">Office:</span> {member.office}</p>
                <p><span className="font-semibold">Phone:</span> {member.phone}</p>
                <p><span className="font-semibold">Email:</span> {member.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-20 mb-10 flex gap-3">
        <button
          onClick={() => navigate('/admin')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </Container>
  );
}

export default AdminFaculty;
