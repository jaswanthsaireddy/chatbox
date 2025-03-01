import Chat from "./components/Chat";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
