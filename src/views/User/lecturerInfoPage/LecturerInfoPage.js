import React, { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import * as instructorServices from '../../../apiServices/instructorServices'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

const LecturerInfoPage = () => {
  const [lecturer, setLecturer] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await instructorServices.GetInstructorByAccount(account.accountId)
      // const pj = await projectServices.getProject()
      // const selectedItem = result.find((item) => item.studentId === parseInt())
      // const selectedPj = pj.find((item) => item.student1Id === parseInt(account.email))
      setLecturer(result)
      console.log(account.accountId)
    }
    fetchApi()
  }, [])
  const columns = [
    {
      key: 'id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'topic',
      _style: { width: '40%' },
    },
    {
      key: 'request',
      filter: false,
      sorter: false,
    },
    {
      key: 'description',
      filter: false,
      sorter: false,
    },
    {
      key: 'instructor',
      sorter: false,
    },
    {
      key: 'subject',
      sorter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  const usersData = [
    {
      id: 1,
      topic: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      description: 'Project 1',
      instructor: 1,
      subject: 1,
    },
    {
      id: 2,
      topic: 'Ứng dụng đi chợ trực tuyến',
      request: 'Yêu thích lập trình Web',
      description: 'Project 1',
      instructor: 1,
      subject: 1,
    },
  ]

  var account = JSON.parse(sessionStorage.getItem('account'));

  return (
    <div>
      {lecturer ? (
        <CCard>
          <CCardHeader>Thông tin cá nhân</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Họ và tên
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="staticEmail" value={lecturer.iName || ''} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="text" className="col-sm-2 col-form-label">
                  Giới tính
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.gender || ''} />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Ngày sinh
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="dateTime-local" id="staticEmail" value={lecturer.birth || ''} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Địa chỉ
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.address || ''} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Quê quán
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.homeTown || ''} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="inputPassword" value={lecturer.email || ''} />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Số điện thoại
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="number" id="staticEmail" value={lecturer.phoneNumber || ''} />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="degree" className="col-sm-2 col-form-label">
                  Học vị
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="degree" value={lecturer.degree || ''} />
                </CCol>
              </CRow>

              <CButton color="primary" type="submit">
                Lưu thông tin
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <h1 style={{ fontSize: 20 }}>Guide project</h1>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={usersData}
        itemsPerPageSelect
        itemsPerPage={20}
        pagination
        onFilteredItemsChange={(items) => {
          console.log(items)
        }}
        onSelectedItemsChange={(items) => {
          console.log(items)
        }}
        scopedColumns={{
          name: (item) => <td style={{ fontWeight: 'bold' }}>{item.name}</td>,
          show_details: (item) => {
            return (
              <td className="py-2">
                <CInputGroup className="mb-3">
                  <Link to={`/projectDetail/${item.id}`}>
                    <CButton color="primary">More</CButton>
                  </Link>
                </CInputGroup>
              </td>
            )
          },
        }}
        selectable
        sorterValue={{ column: 'status', state: 'asc' }}
        tableProps={{
          className: 'add-this-class',
          responsive: true,
          striped: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default LecturerInfoPage
