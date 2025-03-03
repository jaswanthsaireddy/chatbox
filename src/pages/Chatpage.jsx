import { useSelector, useDispatch } from "react-redux";
import Chat from "../components/Chat";
import { storeConversation, toggleDarkMode } from "../redux/chatSlice"; 
import Sidebar from "../components/Sidebar";
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.chat.darkMode); // Get dark mode state from Redux

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar />
      <Chat  />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
