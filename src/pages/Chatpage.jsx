import React from "react";
import { useSelector } from "react-redux";
import Chat from "../components/Chat";
import ChatFeedback from "../components/ChatFeedback";
import NavigationPanel from "../components/NavigationPanel"; 

const Chatpage = () => {
  const darkMode = useSelector((state) => state.chat.darkMode);
  const showSidebar = useSelector((state) => state.chat.showSidebar);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {showSidebar && <NavigationPanel />}
      <Chat />
      <ChatFeedback />
    </div>
  );
};

export default Chatpage;
