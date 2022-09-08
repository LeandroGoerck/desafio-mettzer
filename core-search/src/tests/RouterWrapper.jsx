import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export default function RouterWrapper({ children }) {
  return (
    <MemoryRouter>
      {
        children
      }
    </MemoryRouter>
  )
}