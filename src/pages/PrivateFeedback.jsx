import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Backend URL - update REACT_APP_API_URL in .env file when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PrivateFeedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRating = (star) => {
    setFormData(prev => ({
      ...prev,
      rating: star
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Please enter your contact number');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/feedback`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        contact: formData.contact.trim(),
        message: formData.message.trim(),
        rating: formData.rating,
        feedbackType: 'sad'
      });

      if (response.data.success) {
        navigate('/thank-you', {
          state: {
            type: 'private',
            message: 'Thank you for your feedback! Our team will review it within 24 hours.'
          }
        });
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(
        err.response?.data?.message ||
        'Failed to submit feedback. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ede3e2 0%, #9b9292 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>

        {/* Sad Icon */}
        <div style={{
          textAlign: 'center',
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          😔
        </div>

        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>
          We're sorry to hear that!
        </h2>

        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Your feedback helps us improve. Please tell us what went wrong.
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee',
            color: '#c0392b',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #fcc',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50' }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
          />
        </div>

        {/* Contact No Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50' }}>
            Contact No *
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your contact number"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text'
            }}
          />
        </div>



        {/* Message Textarea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50' }}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your experience..."
            disabled={loading}
            style={{
              width: '100%',
              height: '100px',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'text',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: loading
              ? '#95a5a6'
              : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s ease',
            opacity: loading ? 0.7 : 1
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          {loading ? '⏳ Submitting...' : 'Submit Feedback'}
        </button>

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#27ae60',
          background: '#d5f4e6',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          🔒 Your feedback is private and will only be seen by our management team.
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#7f8c8d' }}>
          Powered by <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>Crossroads Inn</span>
        </div>
      </div>
    </div>
  );
};

export default PrivateFeedback;
