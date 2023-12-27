import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import {
  CCardBody,
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CContainer,
  CCol,
  CRow,
  CButton,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const StudentDetail = () => {
  const { id } = useParams()
  const [details, setDetails] = useState([])
  const [item, setItem] = useState(null)
  const [activeKey, setActiveKey] = useState(1)
  const usersData = [
    {
      id: 20520406,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 2,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 3,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'In20520544@gm.uit.edu.vn',
    },
    {
      id: 4,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'P20520544@gm.uit.edu.vn',
    },
    {
      id: 5,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 6,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 7,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 8,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'In20520544@gm.uit.edu.vn',
    },
    {
      id: 9,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'P20520544@gm.uit.edu.vn',
    },
    {
      id: 10,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 11,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 12,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
    {
      id: 13,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'In20520544@gm.uit.edu.vn',
    },
    {
      id: 14,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: 'P20520544@gm.uit.edu.vn',
    },
    {
      id: 15,
      code: 20520544,
      name: 'Nguyễn Huỳnh Gia Huy',
      gender: 'Male',
      birth: '1/1/2002',
      hometown: 'Bình Dương',
      address: 'Dĩ An, Bình Dương',
      phonenumber: '0987654321',
      term: 'K15',
      password: '128822195123',
      email: '20520544@gm.uit.edu.vn',
    },
  ]
  const columns = [
    {
      key: 'name',
      _style: { width: '40%', fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'lecturer',
      _style: { fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'student_1',
      _style: { fontSize: 17 },
      filter: false,
      sorter: false,
    },
    {
      key: 'student_2',
      _style: { fontSize: 17 },
      filter: false,
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
  const topic = [
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
  useEffect(() => {
    // Find the item in the array based on the ID
    const selectedItem = usersData.find((item) => item.id === parseInt(id))
    setItem(selectedItem)
  }, [id])

  return (
    <div>
      {item ? (
        <div>
          <br />
          <h1 style={{ fontSize: 20 }}>Student profile</h1>
          <CContainer style={{ fontSize: 18 }}>
            <CRow>
              <CCol xs={3} style={{ paddingLeft: 0 }}>
                <CCard>
                  <CCardBody>
                    <p>{item.name}</p>
                    <p>
                      <strong>Student&apos;s code: </strong>
                      {item.code}
                    </p>
                    <p>
                      <strong>Term: </strong>
                      {item.term}
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      {item.gender}
                    </p>
                    <p>
                      <strong>Birthday: </strong>
                      {item.birth}
                    </p>
                    <p>
                      <strong>Hometown: </strong>
                      {item.hometown}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {item.address}
                    </p>
                    <p>
                      <strong>Phone Number: </strong>
                      {item.phonenumber}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {item.email}
                    </p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={9}>
                <CCard>
                  <CCardBody>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                          Past Projects
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane visible={activeKey === 1}>
                        <CSmartTable
                          columns={columns}
                          items={topic}
                          scopedColumns={{
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
                          }}
                          tableBodyProps={{
                            className: 'align-middle',
                          }}
                        />
                      </CTabPane>
                    </CTabContent>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default StudentDetail
/*  */
