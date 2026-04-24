import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './happy.css';
import { FaHandPointDown } from "react-icons/fa";

// Backend URL - update REACT_APP_API_URL in .env file when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ReviewRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [countdown, setCountdown] = useState(8);

  const googleLink = 'https://www.google.com/travel/hotels/entity/CgoIm8ewyPDBoJlaEAE?q=crossroads%20inn%20fort%20pierce&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764&hl=en-US&gl=us&ssta=1&ts=CAEaSQorEicyJTB4ODhkZWYzNGRiMjAwNzRhMToweDVhMzI4MjBmMDkwYzIzOWIaABIaEhQKBwjqDxAEGBcSBwjqDxAEGBgYATICEAAqCQoFOgNVU0QaAA&qs=CAE4AkIJCZsjDAkPgjJaQgkJmyMMCQ-CMlo&ved=0CAAQ5JsGahcKEwiI0ojqhISUAxUAAAAAHQAAAAAQAw&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls';

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoogleReview = () => {
    setSelectedPlatform('google');
    saveFeedback('google');
    window.open(googleLink, '_blank');

    setTimeout(() => {
      navigate('/thank-you', {
        state: {
          type: 'review',
          message: 'Thank you for leaving a Google review! Your feedback helps other travelers.'
        }
      });
    }, 1500);
  };

  const saveFeedback = async (platform) => {
    const feedbackData = {
      name: 'Happy Guest',
      email: 'guest@crossroadsinnfl.com',
      contact: 'N/A',
      message: `Guest left a ${platform} review after a happy stay.`,
      feedbackType: 'happy',
      platform: platform,
      rating: 5,
    };

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
        console.error('Failed to save feedback');
      } else {
        console.log('✅ Happy feedback saved to database');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      // Don't block the user flow if API fails
    }
  };

  return (
    <div className="review-redirect-container">
      <div className="review-redirect-card">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          <div className="success-ripple"></div>
        </div>

        {/* Main Content */}
        <h2>Thank You!</h2>
        <p className="subtitle">We're thrilled you had a great stay! 🎉</p>

        <p className="description">
          Would you mind sharing your experience? Your review helps us improve and helps other travelers make informed decisions.
        </p>
        <p style={{ fontSize: "50px", color: "#FFD700" }}><FaHandPointDown /></p>

        {/* Review Options */}
        <div className="review-options">
          <button
            className={`review-btn google-btn ${selectedPlatform === 'google' ? 'clicked' : ''}`}
            onClick={handleGoogleReview}
            disabled={selectedPlatform !== null}
          >
            <div className="btn-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <div className="btn-content">
              <div className="btn-title">Google Reviews</div>
              <div className="btn-subtitle">Share on Google Maps</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
        </div>

        {/* Loading State */}
        {selectedPlatform && (
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Opening Google Reviews...</p>
          </div>
        )}

        {/* Auto redirect timer */}
        {!selectedPlatform && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '13px' }}>
            Auto redirect in {countdown}s
          </div>
        )}

        {/* Footer */}
        <div className="contact-info">
          <div>📍 7050 Okeechobee Rd, Fort Pierce, FL 34945, USA</div>
          <div>🌐 crossroadsinnfl.com</div>
        </div>

        <div className="powered-b">
          Powered by <span className="guesttouch">Crossroads Inn</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewRedirect;
