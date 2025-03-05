import { useSelector } from "react-redux";
import Chat from "../components/Chat";
import NavigationPanel from "../components/NavigationPanel"; // Updated import statement
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  const darkMode = useSelector((state) => state.chat.darkMode);
  const showSidebar = useSelector((state) => state.chat.showSidebar);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {showSidebar && <NavigationPanel />}
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
