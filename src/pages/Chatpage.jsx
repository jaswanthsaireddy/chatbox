import { useSelector} from "react-redux";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  
  const darkMode = useSelector((state) => state.chat.darkMode); // Get dark mode state from Redux
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar />
      <Chat  />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
