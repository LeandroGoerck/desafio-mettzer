import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

function RoutesApp() {

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/home" replace /> } />
          <Route
            exact
            path="/home"
            element={
                <Home />
            }
          />
          <Route
            exact
            path="/favorites"
            element={
                <Favorites />
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default RoutesApp;
