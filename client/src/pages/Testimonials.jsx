import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      review: 'Excellent work! The painters were professional and finished on time. Highly recommended!',
      city: 'Mumbai'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      review: 'Best painting service I\'ve used. The quality is outstanding and price is very reasonable.',
      city: 'Pune'
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 4,
      review: 'Great service and professional team. Will definitely use them again for future projects.',
      city: 'Bangalore'
    },
    {
      id: 4,
      name: 'Neha Desai',
      rating: 5,
      review: 'Transformed our home beautifully. The attention to detail is impressive!',
      city: 'Delhi'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      rating: 5,
      review: 'Professional painters with great communication. Exceeded my expectations!',
      city: 'Hyderabad'
    },
    {
      id: 6,
      name: 'Anjali Reddy',
      rating: 4,
      review: 'Good quality work. The team was punctual and kept the site clean.',
      city: 'Chennai'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
        ))}
      </div>
    );
  };

  return (
    <main>
      <section className="page-header">
        <h1>Customer Testimonials</h1>
        <p>What our clients say about us</p>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <h3>{testimonial.name}</h3>
                  <p className="city">{testimonial.city}</p>
                </div>
                {renderStars(testimonial.rating)}
                <p className="review">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}