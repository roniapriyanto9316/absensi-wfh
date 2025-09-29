import React, { useState } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import api from "../api/api"
import { jwtDecode } from "jwt-decode"

export default function MyHistory() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [history, setHistory] = useState([])

  const handleFilter = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const decoded = jwtDecode(token)
      const userId = decoded.sub // ambil ID user dari token

      const payload = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        userId: userId, // selalu userId dari token
      }

      const res = await api.post("/attendance/history", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setHistory(res.data)
    } catch (err) {
      console.error(err)
      alert("❌ Gagal mengambil data history")
    }
  }

  return (
    <div>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader>
          <h5 className="mb-0">History Absensi Saya</h5>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 mb-3" onSubmit={handleFilter}>
            <div className="col-md-4">
              <CFormInput
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <CFormInput
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <CButton type="submit" color="primary">
                Tampilkan
              </CButton>
            </div>
          </CForm>

          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Clock In</CTableHeaderCell>
                <CTableHeaderCell>Clock Out</CTableHeaderCell>
                <CTableHeaderCell>Note</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {history.length > 0 ? (
                history.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>
                      {item.clockInAt
                        ? new Date(item.clockInAt).toLocaleString()
                        : "-"}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.clockOutAt
                        ? new Date(item.clockOutAt).toLocaleString()
                        : "-"}
                    </CTableDataCell>
                    <CTableDataCell>{item.note || "-"}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center">
                    Tidak ada data
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
