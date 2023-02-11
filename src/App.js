import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
