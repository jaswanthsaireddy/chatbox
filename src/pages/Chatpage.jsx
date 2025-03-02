import { useSelector, useDispatch } from "react-redux";
import Chat from "../components/Chat";
import { storeConversation } from "../redux/chatSlice"; 
import SideBar from "../components/SideBar";
import ChatFeedback from "../components/chatFeedback";

function Chatpage() {
  const pastConversations = useSelector((state) => state.chat.pastConversations);
  const dispatch = useDispatch();

  const handleLoadConversation = () => {
    dispatch(storeConversation()); 
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <SideBar pastConversations={pastConversations} onLoadConversation={handleLoadConversation} />
      <Chat />
      <ChatFeedback />
    </div>
  );
}

export default Chatpage;
