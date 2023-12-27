import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import * as projectServices from '../../../apiServices/projectServices'
import * as instructorServices from '../../../apiServices/instructorServices'
import * as studentServices from '../../../apiServices/studentServices'
import * as projectProgressServices from '../../../apiServices/projectProgressServices'
import * as projectDetailServices from '../../../apiServices/projectDetailServices'
import * as tagServices from '../../../apiServices/tagServices'
import dateFormat from 'dateformat'

import {
  CCardBody,
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CBadge,
  CListGroup,
  CListGroupItem,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CFormSelect,
  CModalFooter,
} from '@coreui/react'
import { cilCursor } from '@coreui/icons'

const ProjectDetail = () => {
  const [item, setItem] = useState(null)
  const [instructor, setInstructor] = useState()
  const [student1, SetStudent1] = useState()
  const [student2, SetStudent2] = useState()
  const [progress, SetProgress] = useState([])
  const [project, SetProject] = useState()
  const [projectDetail, SetProjectDetail] = useState([])
  const [tag, SetTag] = useState()
  const [selectedOption, setSelectedOption] = useState()
  const [visibleXL, setVisibleXL] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeKey, setActiveKey] = useState(1)
  var account = JSON.parse(sessionStorage.getItem('account'))

  var projectProgress = {
    progressID: 0,
    projectId: 0,
    studentID: 0,
    progressName: '',
    startDate: '',
    endDate: '',
    status: '',
    quality: '',
    note: '',
  }

  var projectDetailInput = {
    detailId: 0,
    projectId: 0,
    tagID: 0,
    note: '',
  }

  const addProgress = () => {

    if (Date.parse(document.getElementById('startDate').value) > Date.parse(document.getElementById('endDate').value)) {
        alert('Ngày kết thúc dự kiến không thể trước ngày tạo dự án');
        return;
    }

    projectProgress.projectId = project.projectId
    projectProgress.studentID = document.getElementById('sID').value
    projectProgress.progressName = document.getElementById('task').value
    projectProgress.startDate = document.getElementById('startDate').value
    projectProgress.endDate = document.getElementById('endDate').value
    

    const fetchApi = async () => {
      const progressResult = await projectProgressServices.createProjectProgress(projectProgress)
      const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      SetProgress(result4)
    }
    fetchApi()
    setVisibleXL(!visibleXL)
  }

  const handleFileUpload = async (event) => {
    // const file = event.target.files[0]
    // const rows = await readXlsxFile(file)
    // const headers = rows[0]
    // const data = rows.slice(1).map((row) => {
    //   return headers.reduce((obj, header, index) => {
    //     obj[header] = row[index]
    //     return obj
    //   }, {})
    // })
    // setItems(data)
  }

  const addTag = () => {

    // if (Date.parse(document.getElementById('startDate').value) > Date.parse(document.getElementById('endDate').value)) {
    //     alert('Ngày kết thúc dự kiến không thể trước ngày tạo dự án');
    //     return;
    // }

    projectDetailInput.tagID = document.getElementById('tagID').value
    projectDetailInput.projectId = project.projectId
    
    const fetchApi = async () => {
      const result = await projectServices.GetCurrentProject(account.email)
      const projectDetailResult = await projectDetailServices.createProjectDetail(projectDetailInput)
      const result5 = await projectDetailServices.getTagByProjectID(result.projectId)
      //const result4 = await projectProgressServices.GetProjectProgressByProjectID(project.projectId)
      //SetProgress(result4)
      SetProjectDetail(result5)
    }
    fetchApi()
    setVisible(!visible)
  }

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    
    const fetchApi = async () => {
      const result = await projectServices.GetCurrentProject(account.email)
      //console.log(result)
      SetProject(result)
      const fetchApi1 = async () => {
        const result1 = await instructorServices.getInstructorbyID(result.instructorId)
        const result2 = await studentServices.getStudentbyID(result.student1Id)
        const result3 = await studentServices.getStudentbyID(result.student2Id)   
        const result4 = await projectProgressServices.GetProjectProgressByProjectID(result.projectId)
        const result5 = await projectDetailServices.getTagByProjectID(result.projectId)
        const result6 = await tagServices.getTag()
        console.log(result5)
        setInstructor(result1.iName)
        SetStudent1(result2)
        SetStudent2(result3)
        SetProgress(result4)
        SetProjectDetail(result5)
        SetTag(result6)
      }
      fetchApi1()      
      setItem(result)
    }
    fetchApi()
    
  }, [])
  const getBadge = (status) => {
    switch (status) {
      case 'Web':
        return 'success'
      case 'Mobile App':
        return 'dark'
      case 'Desktop App':
        return 'warning'
      case 'Game':
        return 'info'
      case 'Tech Research':
        return 'danger'
      case 'button':
        return 'light'
      default:
        return 'info'
    }
  }
  return (
    <div>
      {item ? (
        <div>
          <CCard>
            <CCardBody>
              <h1 style={{ fontSize: 24 }}>{item.projectName}</h1>
              <CContainer>
                <CRow>
                  <CCol xs="1" style={{ paddingLeft: 0 }}>
                    <CBadge color="success" style={{ fontSize: 14 }}>
                      Project {item.subjectId}
                    </CBadge>
                  </CCol>
                  <CCol xs="11">
                    <p>Lecturer: {instructor}</p>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          </CCard>
          <br />
          <h1 style={{ fontSize: 20 }}>Students participate</h1>
          <CContainer style={{ fontSize: 18 }}>
            <CRow>
              <CCol xs={6} style={{ paddingLeft: 0 }}>
                <CCard>
                    {student1 ? (                  <CCardBody>
                    <p>Student 1: {student1.sName}</p>
                  </CCardBody>): (                  <CCardBody>
                    <p>Student 1: </p>
                  </CCardBody>)}

                </CCard>
              </CCol>
              <CCol xs={6}>
                <CCard>
                {student2 ? (                  
                <CCardBody>
                    <p>Student 2: {student2.sName}</p>
                  </CCardBody>): 
                  (                  
                  <CCardBody>
                    <p>Student 2: </p>
                  </CCardBody>)}
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
          <br />
          <CCard>
            <CCardBody>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                    Description
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                    Progress Task
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                    Technology
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
                    File
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane visible={activeKey === 1}>
                    <CInputGroup className="mb-3">
                        <CFormTextarea  type="textArea" id="basic-addonurl" aria-describedby="basic-addon3" defaultValue={'tro beo'} plainText/>
                    </CInputGroup>
                    <CButton>Save</CButton>
                </CTabPane>
                <CTabPane visible={activeKey === 2}>
                  <CListGroup accent="success">
                    {progress.map((item)=>(
                        <CListGroupItem key={item.progressId}>
                        <div className="d-flex flex-row">

                            <div>{item.studentId} - {item.progressName}</div>

                        </div>
                            <div className="d-flex flex-row">
                            <small>{dateFormat(item.startDate, 'dd/mm/yyyy')} - {dateFormat(item.endDate, 'dd/mm/yyyy')}</small>
                        </div>
                    </CListGroupItem>
                    ))}       
                  </CListGroup>
                  <br/>
                  <div className="gap-2 d-md-flex justify-content-md-start mb-2">
                    <CButton onClick={() => setVisibleXL(!visibleXL)}>Add progress</CButton>
                    <CModal
                        size="lg"
                        visible={visibleXL}
                        onClose={() => setVisibleXL(false)}
                        aria-labelledby="OptionalSizesExample1"
                    >
                        <CModalHeader>
                        <CModalTitle id="OptionalSizesExample1">Add progress</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="basic-addon3">Task</CInputGroupText>
                                <CFormInput  type="text" id="task" aria-describedby="basic-addon3"/>
                                <CInputGroupText id="basic-addon3">Participate</CInputGroupText>
                                <CFormSelect  onChange={handleChange} type="text" id="sID" aria-describedby="basic-addon3">
                                    <option value="">Please select</option>
                                    {student1 && !student2 ? (
                                        <option value={student1.studentId}>{student1.sName}</option>
                                    ) : 
                                    student2 ? (
                                        <><option value={student1.studentId}>{student1.sName}</option>
                                        <option value={student2.studentId}>{student2.sName}</option>
                                    </>

                                    ) : (123)}
                                </CFormSelect>
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText id="start">Start date</CInputGroupText>
                                <CFormInput type="date" id="startDate"/>
                                <CInputGroupText id="end">End date</CInputGroupText>
                                <CFormInput type="date" id="endDate"/>
                            </CInputGroup>
                        <div className="gap-2 d-md-flex justify-content-md-end">
                            <CButton color="info" onClick={() => addProgress()}>
                            Add
                            </CButton>
                        </div>
                        </CModalBody>
                    </CModal>
                  </div>
                </CTabPane>
                <CTabPane visible={activeKey === 3}>
                  <CListGroup accent="success" className="d-flex flex-row mt-2 p-1">
                    {projectDetail.map((item)=>(
                      <div className="d-flex flex-row m-1" key={item.tagId}>
                        <h5> <CBadge color={getBadge(item.tagName)}>{item.tagName}</CBadge></h5>
                      </div>
                    ))}
                    <div className="d-flex flex-row m-1">
                        <h5> <CBadge onClick={() => setVisible(!visible)} color={getBadge('button')}>+</CBadge></h5>
                        <CModal
                          alignment="center"
                          visible={visible}
                          onClose={() => setVisible(false)}
                          aria-labelledby="VerticallyCenteredExample"
                          >
                          <CModalHeader>
                              <CModalTitle id="VerticallyCenteredExample">Add tag</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CFormSelect  onChange={handleChange} type="text" id="tagID" aria-describedby="basic-addon3">
                              <option value="">Please select</option>
                              {tag && tag.map((item)=>(
                                <option value={item.tagId} key={item.tagId}>{item.tagName}</option>
                              ))}
                            </CFormSelect>
                          </CModalBody>
                          <CModalFooter>
                              <CButton color="secondary" onClick={() => setVisible(false)}>
                              Close
                              </CButton>
                              <CButton color="primary" onClick={() => addTag()}>Add</CButton>
                          </CModalFooter>
                        </CModal>
                      </div>       
                  </CListGroup>
                </CTabPane>
                <CTabPane visible={activeKey === 4}>
                  <div className="gap-2 d-md-flex justify-content-md-start m-3">
                    <div className="d-flex w-100">
                      <CFormInput type="file" onChange={handleFileUpload} />
                      <CButton className="" color='light' type="file" onChange={handleFileUpload} >Add</CButton>
                    </div>
                  </div>
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProjectDetail
/*  */
