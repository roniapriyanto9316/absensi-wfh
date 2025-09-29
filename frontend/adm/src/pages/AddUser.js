import React, { useState } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react"
import api from "../api/api"

export default function AddUser() {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")

      const payload = {
        name,
        position,
        email,
        password,
        phone,
      }

      const res = await api.post("/users", payload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      alert("✅ User berhasil ditambahkan")
      // reset form
      setName("")
      setPosition("")
      setEmail("")
      setPassword("")
      setPhone("")
    } catch (err) {
      console.error(err)
      alert("❌ Gagal menambahkan user")
    }
  }

  return (
    <div>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader>
          <h5 className="mb-0">Tambah User Baru</h5>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <CFormInput
                label="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <CFormInput
                label="Posisi"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <CFormInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <CFormInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <CFormInput
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <CButton type="submit" color="success">
                Tambah User
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}
