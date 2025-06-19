import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails.jsx";
import ApplyJob from "./pages/ApplyJob";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jobs" element={<JobListings />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/apply/:id" element={<ApplyJob />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
