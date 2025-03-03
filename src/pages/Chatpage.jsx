import { useSelector, useDispatch } from "react-redux";
import Chat from "../components/Chat";
import { storeConversation } from "../redux/chatSlice"; 
import Sidebar from "../components/Sidebar";
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar/>
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
