import React from "react";
import { CHeader, CHeaderNav, CNavItem, CNavLink, CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // redirect ke login
  };

  return (
    <CHeader position="sticky" className="mb-4 bg-light shadow-sm">
      <CHeaderNav className="me-auto">
        <CNavItem>
          <CNavLink href="/">Dashboard</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/history">History</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/profile">Profile</CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav>
        <CButton color="danger" variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </CButton>
      </CHeaderNav>
    </CHeader>
  );
}
