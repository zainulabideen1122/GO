import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./app.css"
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/register"
import Home from "./Pages/Home/home";
import Navbar from "./component/navbar";
import Profile from "./Pages/Profile/profile";

function App() {
  
  const currentUrl = window.location.pathname

  return (<>
    <Router>
      <AppContent/>
    </Router>
  </>
  );
}


function AppContent(){
  const location = useLocation()
  const isNavbar = location.pathname === '/auth/login' || location.pathname === '/auth/register' || location.pathname === '/auth/register/driver'
  return(<>
  {!isNavbar && <Navbar/>}
    <Routes>
        <Route path="/auth/login" Component={Login}/>
        <Route path="/auth/register" Component={Register}/>
        <Route path="/auth/register/driver" Component={Register}/>

        <Route path="/" Component={Home}/>   
        <Route path="/profile" Component={Profile} />
    </Routes>
  </>)
}

export default App;
