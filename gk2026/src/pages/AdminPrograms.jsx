import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

function AdminPrograms() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    discipline: '',
    meeting_time: '',
    contact: '',
    special_info: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/programs`);
      setPrograms(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      setError('Failed to load programs');
      setPrograms([]);
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
        await axios.put(`${API_BASE_URL}/admin/programs/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Program updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/admin/programs`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Program created successfully');
      }
      setFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', discipline: '', meeting_time: '', contact: '', special_info: '', image: '' });
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save program');
    }
  };

  const handleEdit = (program) => {
    setFormData({
      name: program.name || '',
      discipline: program.discipline || '',
      meeting_time: program.meeting_time || '',
      contact: program.contact || '',
      special_info: program.special_info || '',
      image: program.image || ''
    });
    setEditingId(program.id);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_BASE_URL}/admin/programs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Program deleted successfully');
        fetchPrograms();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete program');
      }
    }
  };

  const resetForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData({ name: '', discipline: '', meeting_time: '', contact: '', special_info: '', image: '' });
  };

  return (
    <Container>
      <div className="flex flex-col w-full gap-0 mb-10">
        <h2>Manage Programs</h2>
        <div className="mx-20 mb-10 bg-[var(--color-gold-dark)] h-0.5" />
      </div>

      {error && <div className="mx-20 p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">{error}</div>}
      {success && <div className="mx-20 p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">{success}</div>}

      <div className="mx-20 mb-6">
        <button
          onClick={() => setFormOpen(true)}
          className="px-6 py-2 bg-[var(--color-gold-dark)] text-white rounded-lg hover:bg-opacity-80"
        >
          Add New Program
        </button>
      </div>

      {formOpen && (
        <div className="mx-20 mb-10 p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Program' : 'Add Program'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Program Name *"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="p-2 border border-gray-300 rounded col-span-2"
            />
            <input
              type="text"
              name="discipline"
              placeholder="Discipline"
              value={formData.discipline}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="meeting_time"
              placeholder="Meeting Time"
              value={formData.meeting_time}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded col-span-2"
            />
            <textarea
              name="special_info"
              placeholder="Special Information"
              value={formData.special_info}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded col-span-2"
              rows="3"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
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

      {loading && <div className="mx-20">Loading programs...</div>}
      {!loading && programs.length === 0 && <div className="mx-20">No programs found.</div>}

      <div className="mx-20 mb-10">
        {programs.map(program => (
          <div key={program.id} className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{program.name}</h4>
                <p><span className="font-semibold">Discipline:</span> {program.discipline}</p>
                <p><span className="font-semibold">Meeting Time:</span> {program.meeting_time}</p>
                <p><span className="font-semibold">Contact:</span> {program.contact}</p>
                {program.special_info && <p><span className="font-semibold">Info:</span> {program.special_info}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(program)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(program.id)}
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

export default AdminPrograms;
