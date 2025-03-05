import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import Chat from "../components/Chat";
import ChatFeedback from "../components/ChatFeedback";

const NavigationPanel = React.lazy(() => import("../components/NavigationPanel"));

function Chatpage() {
  const darkMode = useSelector((state) => state.chat.darkMode);
  const showSidebar = useSelector((state) => state.chat.showSidebar);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {showSidebar && (
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationPanel />
        </Suspense>
      )}
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
