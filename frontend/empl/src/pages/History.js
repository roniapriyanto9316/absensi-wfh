import React, { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import api from "../api/api"

export default function History() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [userId, setUserId] = useState("")
  const [history, setHistory] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUsers(res.data)
      } catch (err) {
        console.error("❌ Gagal ambil user:", err)
      }
    }
    fetchUsers()
  }, [])
  const handleFilter = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")

      const payload = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        userId: userId || undefined,
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
          <h5 className="mb-0">History Absensi</h5>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 mb-3" onSubmit={handleFilter}>
            <div className="col-md-3">
              <CFormInput
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <CFormInput
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <CFormSelect
                label="User"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">-- Semua User --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <CButton type="submit" color="primary">
                Filter
              </CButton>
            </div>
          </CForm>

          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>User ID</CTableHeaderCell>
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
                    <CTableDataCell>{item.userId}</CTableDataCell>
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
                  <CTableDataCell colSpan={5} className="text-center">
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
