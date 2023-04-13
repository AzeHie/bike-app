import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Journeys from "./pages/Journeys";
import Stations from "./pages/Stations";
import StationDetail from "./pages/StationDetail";
import MainHeader from "./navigation/MainHeader";
import NewStation from "./pages/NewStation";

function App() {
  let routes: any;

  routes = (
    <Routes>
      <Route path="/" element={<Journeys />} />
      <Route path="/newstation" element={<NewStation />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="/stations/:stationId" element={<StationDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <Fragment>
      <MainHeader />
      <main>{routes}</main>
    </Fragment>
  );
}

export default App;
