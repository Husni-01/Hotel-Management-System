import { formatCurrency } from '../utils/formatters';

export default function HotelRoomSection({ hotel }) {
  const rooms = hotel.rooms ?? [];

  return (
    <section className="details-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inventory details</p>
          <h2>Rooms</h2>
        </div>
        <p>{rooms.length} type(s)</p>
      </div>

      {rooms.length === 0 ? (
        <p className="muted">No room information has been added.</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room, index) => (
            <article key={`${room.type}-${index}`} className="room-card">
              <h3>{room.type}</h3>
              <p>{formatCurrency(room.pricePerNight)}/night</p>
              <p>Capacity: {room.capacity ?? 0}</p>
              <p>Available: {room.availableRooms ?? 0}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
