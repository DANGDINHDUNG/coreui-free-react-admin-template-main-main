import React from 'react'
import { useState } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormCheck,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const ProjectRegistered = () => {
  const [details, setDetails] = useState([])
  const columns = [
    {
      key: 'id',
      label: '',
      filter: false,
      _style: { width: '3%' },
    },
    {
      key: 'name',
      _style: { width: '40%' },
    },
    {
      key: 'description',
      filter: false,
      sorter: false,
    },
    {
      key: 'lecturer',
      sorter: false,
    },
    {
      key: 'student_1',
      sorter: false,
    },
    {
      key: 'student_2',
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
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 2,
      name: 'Ứng dụng đi chợ trực tuyến',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 3,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      avatar: '3.jpg',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 4,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ănus',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Unregistered',
    },
    {
      id: 5,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 6,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ănu',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 7,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Đinh Nguyễn Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 8,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 9,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 10,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ănš',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 11,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 12,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăns',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 13,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 14,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ănlius',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
    {
      id: 15,
      name: 'Ứng dụng đi chợ trực tuyến tích hợp gợi ý món ăn',
      request: 'Yêu thích lập trình Web',
      lecturer: 'Trần Anh Dũng',
      description: 'Project 1',
      student_1: 'Nguyễn Huỳnh Gia Huy',
      student_2: 'Nguyễn Gia Bảo',
      semester: 1,
      year: 2023,
      point: 10,
      status: 'Registered',
    },
  ]
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  return (
    <div>
      <CContainer>
        <CRow>
          <CCol sm={8}>
            <CFormCheck
              button={{ color: 'success', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="success-outlined"
              autoComplete="off"
              label="Project 1"
              defaultChecked
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="danger-outlined"
              autoComplete="off"
              label="Project 2"
            />
          </CCol>
        </CRow>
      </CContainer>
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
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.id)
                  }}
                >
                  {details.includes(item.id) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody className="p-3">
                  <CFormLabel htmlFor="basic-url">Details</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">Semester</CInputGroupText>
                    <CFormInput
                      placeholder="Student 1"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      defaultValue={item.semester}
                      readOnly
                    />
                    <CInputGroupText id="basic-addon1">Year</CInputGroupText>
                    <CFormInput
                      placeholder="Student 2"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      defaultValue={item.year}
                      readOnly
                    />
                    <CInputGroupText id="basic-addon1">Point</CInputGroupText>
                    <CFormInput
                      placeholder="Student 2"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      defaultValue={item.point}
                      readOnly
                    />
                  </CInputGroup>

                  <CFormLabel htmlFor="basic-url">Project</CFormLabel>
                  <CInputGroup className="mb-3">
                    <Link to={`/projectDetail/${item.id}`}>
                      {/* Use the CoreUI button component */}
                      <CButton color="primary">More detail</CButton>
                    </Link>
                  </CInputGroup>
                </CCardBody>
              </CCollapse>
            )
          },
        }}
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

export default ProjectRegistered
