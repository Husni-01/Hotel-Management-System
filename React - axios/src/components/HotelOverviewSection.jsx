import { formatCurrency, formatRating } from '../utils/formatters';

function getAvailabilitySummary(rooms) {
  return rooms.reduce(
    (total, room) => total + Number(room.availableRooms || 0),
    0,
  );
}

function formatDate(value) {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-LK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function HotelOverviewSection({ hotel, reviewCount }) {
  const rooms = hotel.rooms ?? [];
  const totalAvailable = getAvailabilitySummary(rooms);

  return (
    <section className="details-panel detail-hero">
      <div className="details-header">
        <div>
          <p className="eyebrow">Single hotel view</p>
          <h1>{hotel.name}</h1>
          <p className="hotel-meta">
            {hotel.location?.city || 'Unknown city'},{' '}
            {hotel.location?.district || 'Unknown district'} ·{' '}
            {hotel.location?.country || 'Unknown country'}
          </p>
        </div>

        <div className="detail-badge-row">
          <span className="rating-badge">★ {formatRating(hotel.rating)}</span>
          <span className="chip">{reviewCount} review(s)</span>
          <span className="chip">{hotel.category || 'Uncategorized'}</span>
        </div>
      </div>

      {hotel.description ? (
        <p className="details-copy">{hotel.description}</p>
      ) : null}

      <div className="detail-grid">
        <article className="detail-card">
          <p className="detail-label">Starting price</p>
          <strong>
            {hotel.minimumRoomPrice == null
              ? 'N/A'
              : formatCurrency(hotel.minimumRoomPrice)}
          </strong>
        </article>

        <article className="detail-card">
          <p className="detail-label">Available rooms</p>
          <strong>{totalAvailable}</strong>
        </article>

        <article className="detail-card">
          <p className="detail-label">Slug</p>
          <strong>{hotel.slug || 'Not available'}</strong>
        </article>

        <article className="detail-card">
          <p className="detail-label">Hotel ID</p>
          <strong>{hotel._id || 'Not available'}</strong>
        </article>
      </div>

      <div className="section-heading">
        <h3>Amenities</h3>
        <p className="muted">{(hotel.amenities ?? []).length} listed</p>
      </div>

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

      <div className="meta-grid">
        <article className="detail-card">
          <p className="detail-label">Created</p>
          <strong>{formatDate(hotel.createdAt)}</strong>
        </article>

        <article className="detail-card">
          <p className="detail-label">Last updated</p>
          <strong>{formatDate(hotel.updatedAt)}</strong>
        </article>
      </div>
    </section>
  );
}
