import { useSelector } from "react-redux";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  const darkMode = useSelector((state) => state.chat.darkMode);
  const showSidebar = useSelector((state) => state.chat.showSidebar);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {showSidebar && <SideBar />}
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
