import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Feed from "./Pages/Feed";
import Reel from "./Pages/Reel";
import MyPost from "./Pages/MyPost";
import Settings from "./Pages/Settings";
import PrivateRoutes from "./Components/PrivateRoutes";
import Friends from "./Pages/Friends";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />}>
            {/* page par défaut */}
            <Route index element={<Feed />} />

            <Route path="feed" element={<Feed />} />
            <Route path="reel" element={<Reel />} />
            <Route path="my-post" element={<MyPost />} />
            <Route path="setting" element={<Settings />} />
            <Route path="friends" element={<Friends />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
