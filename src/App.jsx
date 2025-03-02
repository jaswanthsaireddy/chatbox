import { useSelector, useDispatch } from "react-redux";
import Chat from "./components/Chat";
import { storeConversation } from "./redux/chatSlice"; 
import Sidebar from "./components/SideBar";
import ChatFeedback from "./components/chatFeedback";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <Chatpage />
  );
}

export default App;
