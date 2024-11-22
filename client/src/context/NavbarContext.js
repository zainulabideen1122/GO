import React, { createContext, useState } from "react";

export const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [driverStatus, setDriverStatus] = useState("Away");

  return (
    <NavbarContext.Provider value={{ driverStatus, setDriverStatus }}>
      {children}
    </NavbarContext.Provider>
  );
}
