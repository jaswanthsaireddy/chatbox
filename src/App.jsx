import { useSelector, useDispatch } from "react-redux";
import Chat from "./components/Chat";
import { storeConversation } from "./redux/chatSlice"; 
import Sidebar from "./components/SideBar";
import ChatFeedback from "./components/chatFeedback";
import Chatpage from "./pages/Chatpage";
import FeedbackOverview from "./pages/FeedbackOverviewPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feedback-overview" element={<FeedbackOverview />} />
        <Route path="/" element={<Chatpage />} />
      </Routes>
    </Router>
  );
}

export default App;
