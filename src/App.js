import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import FeedbackSurvey from './pages/FeedbackSurvey';
import ReviewRedirect from './pages/ReviewRedirect';
import PrivateFeedback from './pages/PrivateFeedback';
import ThankYou from './pages/thank-you';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FeedbackSurvey" element={<FeedbackSurvey />} />
        <Route path="/ReviewRedirect" element={<ReviewRedirect />} />
        <Route path="/PrivateFeedback" element={<PrivateFeedback />} />
        <Route path="/thank-you" element={<ThankYou  />} />
      </Routes>
    </Router>
  );
}
export default App;