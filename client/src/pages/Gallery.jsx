import './Gallery.css';

export default function Gallery() {
  const galleryImages = [
    { id: 1, title: 'Living Room - Before & After', image: 'https://via.placeholder.com/400x300?text=Gallery+1' },
    { id: 2, title: 'Bedroom Transformation', image: 'https://via.placeholder.com/400x300?text=Gallery+2' },
    { id: 3, title: 'Exterior Painting', image: 'https://via.placeholder.com/400x300?text=Gallery+3' },
    { id: 4, title: 'Office Space', image: 'https://via.placeholder.com/400x300?text=Gallery+4' },
    { id: 5, title: 'Wall Texture Design', image: 'https://via.placeholder.com/400x300?text=Gallery+5' },
    { id: 6, title: 'Commercial Project', image: 'https://via.placeholder.com/400x300?text=Gallery+6' },
    { id: 7, title: 'Kitchen Makeover', image: 'https://via.placeholder.com/400x300?text=Gallery+7' },
    { id: 8, title: 'Modern Interior', image: 'https://via.placeholder.com/400x300?text=Gallery+8' },
  ];

  return (
    <main>
      <section className="page-header">
        <h1>Gallery</h1>
        <p>Showcase of our recent painting projects</p>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map(image => (
              <div key={image.id} className="gallery-item">
                <img src={image.image} alt={image.title} />
                <div className="gallery-overlay">
                  <p>{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}