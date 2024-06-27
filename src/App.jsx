import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NewProfile from "./components/NewProfile";
import SignIn from "./components/SignIn";
import { Dashboard } from "@mui/icons-material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/newprofile" element={<NewProfile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
