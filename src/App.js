import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import 'react-phone-number-input/style.css';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './views/Layout'
import Home from './views/home/Home';
import Apply from './views/apply/Apply';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<Apply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;