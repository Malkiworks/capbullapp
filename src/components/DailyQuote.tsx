'use client';

import { useEffect, useState } from 'react';

export default function DailyQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // This would be replaced with your actual quotes data
    const quotes = [
      "The market is a device for transferring money from the active to the patient.",
      "Risk comes from not knowing what you're doing.",
      "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
      "In investing, what is comfortable is rarely profitable.",
      "The individual investor should act consistently as an investor and not as a speculator."
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <section id="daily-quote" className="daily-quote-section">
      <div className="container">
        <div className="quote-container">
          <div className="quote-icon">
            <i className="fas fa-quote-left"></i>
          </div>
          <div className="quote-content">
            <p id="quote-text">{quote}</p>
            <p className="quote-attribution">- Daily Wisdom from CapitalBulls</p>
          </div>
        </div>
      </div>
    </section>
  );
} 