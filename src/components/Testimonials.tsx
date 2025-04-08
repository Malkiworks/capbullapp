'use client';

import { useState } from 'react';

type Testimonial = {
  id: number;
  text: string;
  author: string;
  title: string;
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "CapitalBulls changed my trading career. Learning to trade LIVE with professionals who actually know what they're doing is priceless.",
      author: "Michael T.",
      title: "Member since 2022"
    },
    {
      id: 2,
      text: "The daily LIVE trading sessions have transformed my understanding of the markets. I'm now consistently profitable thanks to the team's guidance.",
      author: "Sarah K.",
      title: "Member since 2021"
    },
    {
      id: 3,
      text: "The community support is incredible. Having access to experienced traders 24/7 has been a game-changer for my trading journey.",
      author: "David M.",
      title: "Member since 2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Community Says</h2>
        <div className="testimonials-slider">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>{testimonials[currentIndex].text}</p>
              <div className="testimonial-author">
                <span className="author-name">{testimonials[currentIndex].author}</span>
                <span className="author-title">{testimonials[currentIndex].title}</span>
              </div>
            </div>
          </div>
          <div className="testimonials-arrows">
            <button className="arrow" onClick={prevTestimonial}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="arrow" onClick={nextTestimonial}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 