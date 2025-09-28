import React, { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CAvatar,
  CButton,
} from "@coreui/react"
import api from "../api/api"

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ phone: "", photo: "", password: "" })

  // 🔹 ambil profile dari API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        const userId = decoded.sub

        const res = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(res.data)
        setForm({
          phone: res.data.phone || "",
          photo: res.data.photo || "",
          password: "",
        })
      } catch (err) {
        console.error(err)
        alert("❌ Gagal mengambil data profile")
      }
    }

    fetchProfile()
  }, [])

  // 🔹 handle input text
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // 🔹 handle file upload → convert ke base64
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result }) // simpan base64 string
    }
    reader.readAsDataURL(file)
  }

  // 🔹 submit update profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const decoded = jwtDecode(token)
      const userId = decoded.sub

      const payload = {
        id: userId,
        phone: form.phone,
        photo: form.photo, // base64
      }
      if (form.password) payload.password = form.password

      const res = await api.put(`/users`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setProfile(res.data)
      setIsEditing(false)
      alert("✅ Profile berhasil diperbarui")
    } catch (err) {
      console.error(err)
      alert("❌ Gagal update profile")
    }
  }

  if (!profile) return <p>Loading...</p>

  return (
    <div>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader>
          <h5 className="mb-0">Profil Karyawan</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={3} className="text-center">
              <CAvatar
                src={form.photo || "assets/img/avatar5.png"}
                size="xl"
                className="mb-3"
              />
              <h6>{profile.name}</h6>
              <p className="text-muted">{profile.position}</p>
            </CCol>
            <CCol md={9}>
              <CForm>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormInput label="Nama" value={profile.name} disabled />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput label="Posisi" value={profile.position} disabled />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormInput label="Email" value={profile.email} disabled />
                  </CCol>
                  <CCol md={6}>
                    {isEditing ? (
                      <CFormInput
                        label="Telepon"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <CFormInput label="Telepon" value={profile.phone} disabled />
                    )}
                  </CCol>
                </CRow>

                {isEditing && (
                  <>
                    <CRow className="mb-3">
                      <CCol md={6}>
                        <CFormInput
                          type="file"
                          label="Upload Foto"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          type="password"
                          label="Password Baru"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CRow>
                  </>
                )}

                <CRow>
                  <CCol md={12}>
                    <CFormInput
                      label="Status"
                      value={profile.active ? "Aktif" : "Tidak Aktif"}
                      disabled
                    />
                  </CCol>
                </CRow>
              </CForm>

              <div className="mt-3 d-flex gap-2">
                {isEditing ? (
                  <>
                    <CButton color="success" onClick={handleSave}>
                      Simpan
                    </CButton>
                    <CButton color="secondary" onClick={() => setIsEditing(false)}>
                      Batal
                    </CButton>
                  </>
                ) : (
                  <CButton color="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </CButton>
                )}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}
