import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelForm from '../components/HotelForm';
import HotelList from '../components/HotelList';
import { hotelService } from '../services/hotelService';
import { getApiError } from '../utils/getApiError';

export default function AdminHotelsPage() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingHotel, setEditingHotel] = useState(null);
  const [actionError, setActionError] = useState('');

  function handleSaved() {
    setEditingHotel(null);
    setActionError('');
    setRefreshKey((current) => current + 1);
  }

  async function handleDelete(id) {
    const shouldDelete = window.confirm('Delete this hotel permanently?');

    if (!shouldDelete) {
      return;
    }

    setActionError('');

    try {
      await hotelService.remove(id);
      setRefreshKey((current) => current + 1);
    } catch (err) {
      setActionError(getApiError(err));
    }
  }

  return (
    <section className="page-stack">
      {actionError ? <p className="form-error">{actionError}</p> : null}

      <HotelForm
        key={editingHotel?._id ?? 'new-hotel-form'}
        editingHotel={editingHotel}
        onCancel={() => setEditingHotel(null)}
        onSaved={handleSaved}
      />

      <HotelList
        refreshKey={refreshKey}
        onDelete={handleDelete}
        onEdit={setEditingHotel}
        onViewDetails={(hotelId) => navigate(`/admin/hotels/${hotelId}`)}
      />
    </section>
  );
}
