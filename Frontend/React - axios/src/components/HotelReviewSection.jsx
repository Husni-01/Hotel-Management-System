import { formatRating } from '../utils/formatters';

export default function HotelReviewSection({ reviews }) {
  return (
    <section className="details-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Guest feedback</p>
          <h2>Reviews</h2>
        </div>
        <p>{reviews.length} total</p>
      </div>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="muted">No reviews yet for this hotel.</p>
        ) : (
          reviews.map((review) => (
            <article key={review._id} className="review-card">
              <div className="review-title-row">
                <strong>{review.authorName || 'Anonymous'}</strong>
                <span className="rating-badge">
                  ★ {formatRating(review.rating)}
                </span>
              </div>
              <p>{review.comment || 'No written comment provided.'}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
