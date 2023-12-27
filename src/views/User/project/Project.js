import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import * as topicRegisterServices from '../../../apiServices/topicRegisterServices'
import * as topicServices from '../../../apiServices/topicServices'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectServices from '../../../apiServices/projectServices'

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CModalFooter,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'

var topicRegister = {
  registerId: '0',
  topicId: '',
  student1Id: '',
  student2Id: '',
  status: '',
};

var project = {
  projectId: 0,
  projectName: '',
  request: '',
  description: '',
  point: '',
  semester: '',
  year: '',
  student1Id: '',
  student2Id: '',
  instructorId: '',
  subjectId: '',
  status: ''
}

var mailData = {
  EmailToName: '',
  EmailSubject: '',
  EmailBody: '',
};

const Project = () => {
  const [details, setDetails] = useState([])
  const [toast, addToast] = useState(0)
  const [topic, setTopic] = useState([])
  const [subject, setSubject] = useState()
  const [checkTopic, setCheckTopic] = useState()
  const [code1, setInputValue1] = useState('')
  const [code2, setInputValue2] = useState('')
  const toaster = useRef()

  var account = JSON.parse(sessionStorage.getItem('account'))

  const addTopicRegister = (topicID, topicName, request, description, instructorId, subjectId) => {
    
    topicRegister.student1Id = document.getElementById('studentCode1').value
    topicRegister.topicId = topicID

    project.projectName = topicName
    project.request = request
    project.description = description
    project.point = 0
    project.student1Id = document.getElementById('studentCode1').value 
    project.instructorId = instructorId
    project.subjectId = subjectId
    project.status = 'In progress'
    const day = new Date();
    project.year = day.getFullYear()
    
    if (day.getMonth() < 1 || day.getMonth() > 8) {
      project.semester = '1'
    }
    else if (day.getMonth() >= 1 && day.getMonth() <= 7 ) {
      project.semester = '2'
    } 
    else project.semester = '3'

    //console.log(topicID)
    const fetchApi = async () => {
      if (document.getElementById('studentCode2').value === '') {
        topicRegister.student2Id = null
        project.student2Id = null
      } else {
        const checkStudent2 = await studentServices.CheckStudentID(document.getElementById('studentCode2').value)

      if (checkStudent2 === false) {
        alert("Student's code 2 doesn't exist");
        return;
      }

      topicRegister.student2Id = document.getElementById('studentCode2').value
      project.student2Id = document.getElementById('studentCode2').value
      }

      topicRegister.status = await topicRegisterServices.GetTopicStatus(topicID)
      console.log(topicRegister)
      const result = await topicRegisterServices.createTopicRegister(topicRegister)
      // console.log(result)

      //getMailData(topicName, topicRegister.student1Id, topicRegister.status);
      //console.log(mailData)
      //const result1 = await topicRegisterServices.sendStatusMail(mailData)
      //console.log(result1)

      if (document.getElementById('studentCode2').value != '') {
        //getMailData(topicName, topicRegister.student2Id, topicRegister.status);
        //console.log(mailData)
        //const result2 = await topicRegisterServices.sendStatusMail(mailData)
        //console.log(result2)
      }
      
      
      if (topicRegister.status === 'approved')
      {
        console.log(project)
        const projectResult = await projectServices.createProject(project)
        //console.log(projectResult)
      }
    }
    fetchApi()
    console.log(topicRegister);
  }

  const getMailData = (topicName, studentID, status) => {
    mailData.EmailToName = studentID + '@gm.uit.edu.vn'
    mailData.EmailSubject = 'Topic registrant ' + status + '!';
    mailData.EmailBody = '<b>Your registrant to topic [ ' + topicName + ' ] has been ' + status + '!</b>';
  }

  const columns = [
    {
      key: 'topicId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'topicName',
      label: 'Topic Name',
      _style: { width: '40%' },
    },
    {
      key: 'request',
      label: 'Request',
      filter: false,
      sorter: false,
    },
    {
      key: 'iName',
      label: 'Instructor',
      sorter: false,
      _style: { width: '20%' },
    },
    {
      key: 'subjectName',
      label: 'Subject',
      sorter: false,
      filter: false,
      _style: { width: '10%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  useEffect(() => {
    const fetchApi = async () => {
      const result = await studentServices.GetCurrentSubject(account.email);
      console.log(result)
      setSubject(result)
      const fetchApi1 = async () => {
        console.log(subject)
        const result1 = await topicServices.getTopicbySubject(result)
        setTopic(result1)
      }
      fetchApi1()
    }
    fetchApi()

    
  }, [])

  // Quy định số chữ số của Student's code
  const handleChange1 = (e) => {
    const value = e.target.value
    // Limiting to 10 characters in this example
    if (value.length <= 8) {
      setInputValue1(value)
    }
  }
  const handleChange2 = (e) => {
    const value = e.target.value
    // Limiting to 10 characters in this example
    if (value.length <= 8) {
      setInputValue2(value)
    }
  }
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
  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">Notifications</div>
      </CToastHeader>
      <CToastBody>
        Đồ án đã được chuyển sang danh sách chờ được xét duyệt. Kiểm tra danh sách đồ án chờ được
        xét duyệt để tránh trường hợp có người đã đăng ký trước.
      </CToastBody>
    </CToast>
  )
  return (
    <div>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={topic}
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
              1==1 ? (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(item.topicId)
                    }}
                  >
                    {details.includes(item.topicId) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              ) : (
                <></>
              )              
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.topicId)}>
                <CCardBody className="p-3">
                  <CFormLabel htmlFor="basic-url">Student&apos;s informations</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1">Student&apos;s code 1:</CInputGroupText>
                    <CFormInput
                      placeholder="Student 1"
                      type="number"
                      //value={code1}
                      onChange={handleChange1}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="studentCode1"
                      value = {account.email}
                      disabled = {true}
                    />
                    <CInputGroupText id="basic-addon1">Student&apos;s code 2:</CInputGroupText>
                    <CFormInput
                      placeholder="Student 2"
                      type="number"
                      value={code2}
                      onChange={handleChange2}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      id="studentCode2"
                    />
                  </CInputGroup>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CButton size="sm" color="info" onClick={() => addTopicRegister(item.topicId, item.topicName, item.request, item.description, item.instructorId, item.subjectId)}>
                      Register
                    </CButton>
                    <CToaster ref={toaster} push={toast} placement="top-end" />
                  </div>
                </CCardBody>
              </CCollapse>
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

export default Project
