import { Link, useNavigate, useParams } from 'react-router-dom';
import HotelDetails from '../components/HotelDetails';

export default function HotelDetailsPage() {
  const navigate = useNavigate();
  const { hotelId } = useParams();

  return (
    <section className="page-stack">
      <div className="details-toolbar">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate('/admin')}
        >
          Back to admin
        </button>
        <Link className="inline-link" to="/admin">
          Return to hotel inventory
        </Link>
      </div>

      <HotelDetails hotelId={hotelId} />
    </section>
  );
}
