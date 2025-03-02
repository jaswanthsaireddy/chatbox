
import ChatPage from "./pages/ChatPage";
import FeedbackOverview from "./pages/FeedbackOverviewPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feedback-overview" element={<FeedbackOverview />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
