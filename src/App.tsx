import "./App.css";
import AdminHome from "./Components/Admin/AdminHome";
import AdminLogin from "./Components/Admin/AdminLogin";
import CreateMenu from "./Components/Admin/CreateMenu";
import DeleteMenu from "./Components/Admin/DeletMenu";
import EditMenu from "./Components/Admin/EditMenu";
import BreakFast from "./Components/BreakFast";
import Dinner from "./Components/Dinner";
import Drink from "./Components/Drink";
import HomePage from "./Components/HomePage";
import Lunch from "./Components/Lunch";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/breakfast" element={<BreakFast></BreakFast>}></Route>
            <Route path="/lunch" element={<Lunch></Lunch>}></Route>
            <Route path="/dinner" element={<Dinner></Dinner>}></Route>
            <Route path="/drink" element={<Drink></Drink>}></Route>
            <Route
              path="/adminlogin"
              element={<AdminLogin></AdminLogin>}
            ></Route>
            <Route path="/admin" element={<AdminHome></AdminHome>}></Route>
            <Route
              path="/admin/createmenu"
              element={<CreateMenu></CreateMenu>}
            ></Route>
            <Route
              path="/admin/deletemenu"
              element={<DeleteMenu></DeleteMenu>}
            ></Route>
            <Route
              path="/admin/editmenu"
              element={<EditMenu></EditMenu>}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
