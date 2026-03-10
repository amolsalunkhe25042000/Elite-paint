import './Services.css';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Interior Painting',
      description: 'Transform your interior spaces with premium quality paints and expert finishing.',
      icon: '🏠',
      image: 'https://via.placeholder.com/300x200?text=Interior+Painting'
    },
    {
      id: 2,
      title: 'Exterior Painting',
      description: 'Enhance your home exterior with weather-resistant, durable paint solutions.',
      icon: '🏘️',
      image: 'https://via.placeholder.com/300x200?text=Exterior+Painting'
    },
    {
      id: 3,
      title: 'Wall Texture',
      description: 'Add depth and character to your walls with decorative texture finishes.',
      icon: '🎨',
      image: 'https://via.placeholder.com/300x200?text=Wall+Texture'
    },
    {
      id: 4,
      title: 'Waterproofing',
      description: 'Protect your walls from moisture and weather with advanced waterproofing solutions.',
      icon: '💧',
      image: 'https://via.placeholder.com/300x200?text=Waterproofing'
    },
    {
      id: 5,
      title: 'House Renovation Paint',
      description: 'Complete painting solutions for your entire home renovation project.',
      icon: '🔨',
      image: 'https://via.placeholder.com/300x200?text=Renovation+Paint'
    },
    {
      id: 6,
      title: 'Commercial Painting',
      description: 'Professional painting services for offices, stores, and commercial buildings.',
      icon: '🏢',
      image: 'https://via.placeholder.com/300x200?text=Commercial+Painting'
    }
  ];

  return (
    <main className="services-page">
      <section className="page-header">
        <h1>Our Services</h1>
        <p>Professional painting solutions for every need</p>
      </section>

      <section className="services-container">
        <div className="container">
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="/contact" className="service-link">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}