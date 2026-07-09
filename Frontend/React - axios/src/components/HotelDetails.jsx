import { useCallback, useEffect, useState } from 'react';
import { hotelService } from '../services/hotelService';
import { reviewService } from '../services/reviewService';
import { getApiError } from '../utils/getApiError';
import ErrorMessage from './ErrorMessage';
import HotelOverviewSection from './HotelOverviewSection';
import HotelReviewSection from './HotelReviewSection';
import HotelRoomSection from './HotelRoomSection';
import ReviewForm from './ReviewForm';
import Spinner from './Spinner';

const initialReviewForm = {
  authorName: '',
  rating: 5,
  comment: '',
};

export default function HotelDetails({ hotelId, onReviewCreated }) {
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialReviewForm);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [hotelData, reviewData] = await Promise.all([
        hotelService.getById(hotelId),
        reviewService.getForHotel(hotelId),
      ]);

      setHotel(hotelData);
      setReviews(
        Array.isArray(reviewData) ? reviewData : reviewData.items || [],
      );
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  function handleReviewChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await reviewService.create({
        hotel: hotelId,
        authorName: form.authorName,
        rating: Number(form.rating),
        comment: form.comment,
      });

      setForm(initialReviewForm);
      await loadDetails();
      onReviewCreated?.();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Spinner label="Loading hotel details..." />;
  }

  if (error && !hotel) {
    return <ErrorMessage message={error} onRetry={loadDetails} />;
  }

  return (
    <section className="details-layout">
      {error ? <p className="form-error">{error}</p> : null}

      <HotelOverviewSection hotel={hotel} reviewCount={reviews.length} />
      <HotelRoomSection hotel={hotel} />
      <HotelReviewSection reviews={reviews} />
      <ReviewForm
        form={form}
        onChange={handleReviewChange}
        onSubmit={handleReviewSubmit}
        submitting={submitting}
      />
    </section>
  );
}
