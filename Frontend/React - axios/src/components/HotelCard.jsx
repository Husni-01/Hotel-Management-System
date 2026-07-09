import { Link } from 'react-router-dom';
import { formatCurrency, formatRating } from '../utils/formatters';

// screen -> /admin
export default function HotelCard({ hotel, onDelete, onEdit, onViewDetails }) {
  const rooms = hotel.rooms ?? [];
  const totalAvailable = rooms.reduce(
    (total, room) => total + Number(room.availableRooms || 0),
    0,
  );

  return (
    <article className="hotel-card">
      <Link
        className="hotel-card-link hotel-main"
        to={`/admin/hotels/${hotel._id}`}
      >
        <div className="hotel-title-row">
          <h3>{hotel.name}</h3>
          <span className="rating-badge">
            ★ {formatRating(hotel.rating)} ({hotel.reviewCount ?? 0})
          </span>
        </div>

        <p className="hotel-meta">
          {hotel.location?.city || 'Unknown city'},{' '}
          {hotel.location?.district || 'Unknown district'} ·{' '}
          {hotel.category || 'Uncategorized'}
        </p>

        {hotel.description ? (
          <p className="muted">{hotel.description}</p>
        ) : null}

        <div className="amenity-list">
          {(hotel.amenities ?? []).length > 0 ? (
            hotel.amenities.map((amenity) => (
              <span key={amenity} className="chip">
                {amenity}
              </span>
            ))
          ) : (
            <span className="muted">No amenities listed.</span>
          )}
        </div>

        <h4>Available room types</h4>
        {rooms.length === 0 ? (
          <p className="muted">No room information has been added.</p>
        ) : (
          <ul className="room-summary">
            {rooms.map((room, index) => (
              <li key={`${hotel._id}-${room.type}-${index}`}>
                <strong>{room.type}</strong> ·{' '}
                {formatCurrency(room.pricePerNight)}/night · capacity{' '}
                {room.capacity ?? 0} · {room.availableRooms ?? 0} available
              </li>
            ))}
          </ul>
        )}

        <p>
          <strong>
            From{' '}
            {hotel.minimumRoomPrice == null
              ? 'N/A'
              : formatCurrency(hotel.minimumRoomPrice)}
          </strong>
          {rooms.length > 0
            ? ` · ${totalAvailable} rooms currently available`
            : ''}
        </p>
      </Link>

      <div className="card-actions">
        <button type="button" onClick={() => onViewDetails(hotel._id)}>
          Open
        </button>
        <button type="button" onClick={() => onEdit(hotel)}>
          Edit
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(hotel._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
