export default function ReviewForm({ form, onChange, onSubmit, submitting }) {
  return (
    <form className="form-panel compact-panel" onSubmit={onSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Create feedback</p>
          <h2>Add review</h2>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Author name
          <input
            name="authorName"
            value={form.authorName}
            onChange={onChange}
            required
            placeholder="Guest name"
          />
        </label>

        <label>
          Rating
          <select name="rating" value={form.rating} onChange={onChange}>
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Comment
        <textarea
          name="comment"
          rows="4"
          value={form.comment}
          onChange={onChange}
          required
          placeholder="Share the guest experience"
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving review...' : 'Save review'}
        </button>
      </div>
    </form>
  );
}
