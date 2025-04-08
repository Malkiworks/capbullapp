'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type GalleryItem = {
  id: number;
  image: string;
  category: 'results' | 'testimonials' | 'other';
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  // This would be replaced with your actual gallery data
  const galleryItems: GalleryItem[] = [
    { id: 1, image: '/images/result1.jpg', category: 'results' },
    { id: 2, image: '/images/result2.jpg', category: 'results' },
    { id: 3, image: '/images/result3.jpg', category: 'results' },
    { id: 4, image: '/images/test1.jpg', category: 'testimonials' },
    { id: 5, image: '/images/test2.jpg', category: 'testimonials' },
    { id: 6, image: '/images/test3.jpg', category: 'testimonials' },
    { id: 7, image: '/images/other1.jpg', category: 'other' },
    { id: 8, image: '/images/other2.jpg', category: 'other' },
    { id: 9, image: '/images/other3.jpg', category: 'other' },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2>Trading Insights That Hit Different</h2>
        <div className="gallery-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'results' ? 'active' : ''}`}
            onClick={() => setActiveFilter('results')}
          >
            Results
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveFilter('testimonials')}
          >
            Testimonials
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'other' ? 'active' : ''}`}
            onClick={() => setActiveFilter('other')}
          >
            Other
          </button>
        </div>
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <Image
                src={item.image}
                alt={`Gallery item ${item.id}`}
                width={300}
                height={300}
                className="gallery-image"
              />
              <div className="gallery-icon">
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-more">
          <Link 
            href="https://www.instagram.com/capitalbulls_za" 
            target="_blank" 
            className="outline-btn"
          >
            <span>See More on Instagram</span>
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
    </section>
  );
} 