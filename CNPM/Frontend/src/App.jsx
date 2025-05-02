import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SeatList from "./pages/SeatList.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import RoomList from './pages/room_list.jsx';
import ClassListPage from './pages/ClassListPage.jsx';


// Component để bảo vệ route
const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("authToken");
  return token ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dat-cho-hoc" element={<PrivateRoute element={<SeatList />} />} />
          <Route path="/booking" element={<PrivateRoute element={<BookingForm />} />} />
          <Route path="/xem-ds-phong" element={<PrivateRoute element={<RoomList />} />} />
          <Route path="/lich-su-dat-cho" element={<PrivateRoute element={<ClassListPage />} />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;