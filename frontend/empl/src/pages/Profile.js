import React, { useEffect, useState } from "react"
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(res.data)
      } catch (err) {
        console.error(err)
        alert("❌ Gagal mengambil data profile")
      }
    }

    fetchProfile()
  }, [])

  if (!profile) {
    return <p>Loading...</p>
  }

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
                src={profile.photo || "/default-avatar.png"}
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
                    <CFormInput label="Telepon" value={profile.phone} disabled />
                  </CCol>
                </CRow>
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
              <div className="mt-3">
                <CButton color="primary" disabled>
                  Edit Profile (Coming Soon)
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}
