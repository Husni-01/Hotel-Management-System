import { useState } from 'react';
import { hotelService } from '../services/hotelService';
import { getApiError } from '../utils/getApiError';

const blankRoom = () => ({
  type: 'double',
  pricePerNight: '',
  capacity: '',
  availableRooms: '',
});

const emptyForm = {
  name: '',
  slug: '',
  city: '',
  district: '',
  category: 'mid-range',
  description: '',
  amenities: '',
  rooms: [blankRoom()],
};

function toFormState(hotel) {
  if (!hotel) {
    return { ...emptyForm, rooms: [blankRoom()] };
  }

  return {
    name: hotel.name ?? '',
    slug: hotel.slug ?? '',
    city: hotel.location?.city ?? '',
    district: hotel.location?.district ?? '',
    category: hotel.category ?? 'mid-range',
    description: hotel.description ?? '',
    amenities: hotel.amenities?.join(', ') ?? '',
    rooms:
      hotel.rooms?.length > 0
        ? hotel.rooms.map((room) => ({
            type: room.type ?? 'double',
            pricePerNight: room.pricePerNight ?? '',
            capacity: room.capacity ?? '',
            availableRooms: room.availableRooms ?? '',
          }))
        : [blankRoom()],
  };
}

function buildPayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim(),
    category: form.category,
    description: form.description.trim(),
    location: {
      city: form.city.trim(),
      district: form.district.trim(),
      country: 'Sri Lanka',
    },
    amenities: form.amenities
      .split(',')
      .map((amenity) => amenity.trim())
      .filter(Boolean),
    rooms: form.rooms.map((room) => ({
      type: room.type.trim(),
      pricePerNight: Number(room.pricePerNight),
      capacity: Number(room.capacity),
      availableRooms: Number(room.availableRooms),
    })),
  };
}

export default function HotelForm({ editingHotel, onCancel, onSaved }) {
  const [form, setForm] = useState(() => toFormState(editingHotel));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function changeRoom(index, field, value) {
    setForm((current) => ({
      ...current,
      rooms: current.rooms.map((room, roomIndex) =>
        roomIndex === index ? { ...room, [field]: value } : room,
      ),
    }));
  }

  function addRoom() {
    setForm((current) => ({
      ...current,
      rooms: [...current.rooms, blankRoom()],
    }));
  }

  function removeRoom(index) {
    setForm((current) => ({
      ...current,
      rooms:
        current.rooms.length === 1
          ? [blankRoom()]
          : current.rooms.filter((_, roomIndex) => roomIndex !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = buildPayload(form);

      if (editingHotel?._id) {
        await hotelService.update(editingHotel._id, payload);
      } else {
        await hotelService.create(payload);
      }

      setForm({ ...emptyForm, rooms: [blankRoom()] });
      onSaved();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setForm({ ...emptyForm, rooms: [blankRoom()] });
    setError('');
    onCancel();
  }

  return (
    <section className="form-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Hotel editor</p>
          <h2>{editingHotel ? 'Update hotel' : 'Create hotel'}</h2>
        </div>
        {editingHotel ? (
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancel}
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Hotel name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Slug
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            City
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            District
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="budget">Budget</option>
              <option value="mid-range">Mid-range</option>
              <option value="luxury">Luxury</option>
              <option value="boutique">Boutique</option>
              <option value="villa">Villa</option>
            </select>
          </label>

          <label>
            Amenities
            <input
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="WiFi, Pool, Breakfast"
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell guests what makes this property special"
          />
        </label>

        <div className="section-heading room-section-heading">
          <h3>Rooms</h3>
          <button type="button" className="secondary-button" onClick={addRoom}>
            Add room type
          </button>
        </div>

        {form.rooms.map((room, index) => (
          <div key={`room-${index}`} className="room-editor">
            <div className="form-grid">
              <label>
                Type
                <input
                  value={room.type}
                  onChange={(event) =>
                    changeRoom(index, 'type', event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Price per night
                <input
                  type="number"
                  min="0"
                  value={room.pricePerNight}
                  onChange={(event) =>
                    changeRoom(index, 'pricePerNight', event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Capacity
                <input
                  type="number"
                  min="1"
                  value={room.capacity}
                  onChange={(event) =>
                    changeRoom(index, 'capacity', event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Available rooms
                <input
                  type="number"
                  min="0"
                  value={room.availableRooms}
                  onChange={(event) =>
                    changeRoom(index, 'availableRooms', event.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="danger-button"
                onClick={() => removeRoom(index)}
              >
                Remove room type
              </button>
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving
              ? 'Saving...'
              : editingHotel
                ? 'Update hotel'
                : 'Create hotel'}
          </button>
        </div>
      </form>
    </section>
  );
}
