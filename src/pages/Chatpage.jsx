import { useSelector, useDispatch } from "react-redux";
import Chat from "../components/Chat";
import { storeConversation } from "../redux/chatSlice"; 
import Sidebar from "../components/Sidebar";
import ChatFeedback from "../components/ChatFeedback";

function Chatpage() {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const dispatch = useDispatch();

  const handleLoadConversation = () => {
    dispatch(storeConversation()); 
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar pastConversations={pastConversations} onLoadConversation={handleLoadConversation} />
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
