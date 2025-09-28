import React from "react"
import { CCard, CCardBody, CCardHeader, CButton } from "@coreui/react"
import api from "../api/api"

export default function Dashboard() {
  const handleClockIn = async () => {
    try {
      const token = localStorage.getItem("token")
      const payload = { type: "clockin", note: "WFH" }

      await api.post("/attendance", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert("✅ Clock-In berhasil!")
    } catch (err) {
      console.error(err)
      alert("❌ Gagal Clock-In")
    }
  }

  const handleClockOut = async () => {
    try {
      const token = localStorage.getItem("token")
      const payload = { type: "clockout", note: "WFH" }

      await api.post("/attendance", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert("✅ Clock-Out berhasil!")
    } catch (err) {
      console.error(err)
      alert("❌ Gagal Clock-Out")
    }
  }

  return (
    <div>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader>
          <h5 className="mb-0">Dashboard Absensi WFH</h5>
        </CCardHeader>
        <CCardBody>
          <p>Silakan lakukan Clock-In atau Clock-Out:</p>
          <CButton color="success" className="me-2" onClick={handleClockIn}>
            Clock-In
          </CButton>
          <CButton color="danger" onClick={handleClockOut}>
            Clock-Out
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}
