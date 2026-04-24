import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';
import hotelLogo from '../assest/logo.jpg';

const FeedbackForm = () => {
  const [userRating, setUserRating] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const googleReviewURL =
    'https://www.google.com/travel/hotels/entity/CgsIm5Cjvd7fn8rSARAB/reviews?q=crossroads%20inn&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72887412%2C72958624%2C73059275%2C73064764&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaSQorEicyJTB4M2JhZTE1MTJjMTU2NzBjNzoweGQyOTQ3ZWZkZTdhOGM4MWIaABIaEhQKBwjqDxADGBQSBwjqDxADGBUYATICEAAqCQoFOgNJTlIaAA&qs=CAE4AkIJCRvIqOf9fpTSQgkJG8io5_1-lNI&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls';

  const tripAdvisorURL =
    'https://www.tripadvisor.com/Hotel_Review-g297628-d622777-Reviews-Cross_Roads_Inn-Bengaluru_Bangalore_District_Karnataka.html?m=19905';

  const submitFeedback = (ratingValue) => {
    setUserRating(ratingValue);
    setShowLoader(true);

    setTimeout(() => {
      if (ratingValue === 'positive') {
        navigate('/ReviewRedirect', {
          state: {
            googleLink: googleReviewURL,
            tripAdvisorLink: tripAdvisorURL,
          },
        });
      } else {
        navigate('/PrivateFeedback');
      }
    }, 1200);
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">

        {/* Header */}
        <div className="feedback-header">
          <div className="logo-container">
            <img
              className="logo-img"
              src={hotelLogo}
              alt="CrossRoad Inn Hotel Logo"
            />
          </div>

        </div>

        {/* Body */}
        <div className="feedback-content">
          <p className="question-text">How was your stay?</p>

          <div className="feedback-options">
            <button
              type="button"
              aria-label="Great experience"
              className={`feedback-btn ${userRating === 'positive' ? 'selected' : ''}`}
              onClick={() => window.open('https://www.google.com/travel/hotels/entity/CgoIm8ewyPDBoJlaEAE?q=crossroads%20inn%20fort%20pierce&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764&hl=en-US&gl=us&ssta=1&ts=CAEaSQorEicyJTB4ODhkZWYzNGRiMjAwNzRhMToweDVhMzI4MjBmMDkwYzIzOWIaABIaEhQKBwjqDxAEGBcSBwjqDxAEGBgYATICEAAqCQoFOgNVU0QaAA&qs=CAE4AkIJCZsjDAkPgjJaQgkJmyMMCQ-CMlo&ved=0CAAQ5JsGahcKEwiI0ojqhISUAxUAAAAAHQAAAAAQAw&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls', '_blank')}
              disabled={showLoader}
            >
              <div className="feedback-icon positive-feedback">
                <span className="emoji-icon">😊</span>
              </div>
              <span className="feedback-text">Happy</span>
            </button>

            <button
              type="button"
              aria-label="Not good experience"
              className={`feedback-btn ${userRating === 'negative' ? 'selected' : ''}`}
              onClick={() => submitFeedback('negative')}
              disabled={showLoader}
            >
              <div className="feedback-icon negative-feedback">
                <span className="emoji-icon">😞</span>
              </div>
              <span className="feedback-text">Sad</span>
            </button>
          </div>

          <p className="description-text">
            We appreciate your business and would love to hear about your recent experience with us.
          </p>


          {/* Footer */}




          {/* Footer with Contact Info (No Logo) */}
          <div className="feedback-footer">
            <div className="card-footer1">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="footer-hotel-tagline1">7050 Okeechobee Rd, Fort Pierce, FL 34945, USA</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="footer-hotel-tagline1">+17724658600</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a
                  href="mailto:crossroadsinnflorida@gmail.com"
                  className="footer-hotel-tagline1 footer-link"
                >
                  crossroadsinnflorida@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a
                  href="https://crossroadsinnfl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-hotel-tagline1 footer-link"
                >
                  crossroadsinnfl.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {showLoader && (
          <div className="loading-screen">
            <div className="spinner" />
            <p>Thank you for your feedback...</p>
          </div>

        )}

      </div>
    </div>
  );
};

export default FeedbackForm;