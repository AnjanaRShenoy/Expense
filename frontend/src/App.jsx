import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarWithHeader from "./components/Sidebar";

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({ children }) {
  return (
    <>
      <ToastContainer />
      <div style={{ width: "100%", margin: '0px' }}>
        <div style={{ display: "flex",}}>
          <SidebarWithHeader />
          <div style={{margin:"0px auto" , paddingTop: "20px" , marginTop: "10px" }}>
          <Outlet />
          </div>
        </div>          
      </div>
    </>
  );
}

export default App;
