import { useCallback, useEffect, useState } from 'react';
import { hotelService } from '../services/hotelService';
import { getApiError } from '../utils/getApiError';
import ErrorMessage from './ErrorMessage';
import HotelCard from './HotelCard';
import Spinner from './Spinner';

export default function HotelList({
  onDelete,
  onEdit,
  onViewDetails,
  refreshKey,
}) {
  const [hotels, setHotels] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await hotelService.getAll({
        sort: '-rating',
        page: 1,
        limit: 20,
      });

      setHotels(data.items || []);
      setPageInfo(data);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchHotels();
  }, [fetchHotels, refreshKey]);

  if (loading) {
    return <Spinner label="Fetching hotels from Express..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchHotels} />;
  }

  return (
    <section className="list-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>Available hotels</h2>
        </div>
        <p>{pageInfo?.total ?? hotels.length} hotel(s) found</p>
      </div>

      {hotels.length === 0 ? (
        <div className="status">
          <p>No active hotels found.</p>
        </div>
      ) : (
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onDelete={onDelete}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </section>
  );
}
