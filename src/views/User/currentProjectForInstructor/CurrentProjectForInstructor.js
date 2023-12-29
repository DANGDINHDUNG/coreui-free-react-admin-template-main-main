import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import * as projectServices from '../../../apiServices/projectServices'
import * as instructorServices from '../../../apiServices/instructorServices'
import { Link } from 'react-router-dom'

import {
  CCardBody,
  CButton,
  CCollapse,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CInputGroupText,
  CCol,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CBadge,
} from '@coreui/react'

const CurrentProjectForInstructor = () => {
  const [project, SetProject] = useState()
  const [details, setDetails] = useState([])
  const [semester, setSemester] = useState('')
  const [year, setYear] = useState('')
  const [message, SetMessage] = useState('')
  const [status, setStatus] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const columns = [
    {
      key: 'projectId',
      label: 'Id',
      filter: false,
      sorter: false,
      _style: { width: '5%' },
    },
    {
      key: 'projectName',
      label: 'Project Name',
      _style: { width: '40%' },
    },
    {
      key: 'student1Id',
      label: 'Student 1',
      filter: false,
      sorter: false,
    },
    {
      key: 'student2Id',
      label: 'Student 2',
      sorter: false,
      filter: false,
    },
    {
      key: 'subjectName',
      label: 'Subject',
      sorter: false,
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]
  var account = JSON.parse(sessionStorage.getItem('account'));
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  useEffect(() => { 
    setYear(currentYear)
    if (currentMonth < 1 || currentMonth > 8) {
        setSemester('1')
    }
    else if (currentMonth >= 1 && currentMonth <= 7 ) {
        setSemester('2')
    } 
    else setSemester('3')
    const fetchApi = async () => {
      const result = await instructorServices.GetInstructorByAccount(account.accountId)
      const fetchApi1 = async () => {
        const result1 = await projectServices.GetProjectForInstructor(semester, year, result.instructorId)
        SetProject(result1)
      }
      fetchApi1()
    }
    fetchApi()
  }) 
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
  const markPoint = () => {
    setStatus('Success')
    SetMessage("Mark point successful!") 
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Warning':
        return 'warning'
      case 'Error':
        return 'danger'
      case 'Notification':
        return 'info'
      default:
        return 'success'
    }
  }
  const exampleToast = (
    <CToast>
      <CToastHeader closeButton>
        <div className="fw-bold me-auto">
          <CBadge color={getBadge(status)} style={{ fontSize: 16 }}>
            {status}
          </CBadge>  
        </div>
      </CToastHeader>
      <CToastBody>
        {message}
      </CToastBody>
    </CToast>
  )
  useEffect(()=>{if(message){
    addToast(exampleToast);
  }}, [message])
  return (
    <div>
      <CSmartTable
        columns={columns}
        columnFilter
        columnSorter
        items={project}
        itemsPerPageSelect
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
                    toggleDetails(item.projectId)
                  }}
                >
                  {details.includes(item.projectId) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.projectId)}>
                <CCardBody className="p-3">
                  <CCol sm="3">
                    <CFormLabel htmlFor="basic-url">Details</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText id="basic-addon1">Point</CInputGroupText>
                      <CFormInput
                        placeholder="10"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        defaultValue={item.point}
                      />
                      <CButton color="light" onClick={() => {markPoint()}}>Mark point</CButton>
                    </CInputGroup>
                  </CCol>
                  <CFormLabel htmlFor="basic-url">Project</CFormLabel>
                  <CInputGroup className="mb-3">
                    <Link to={`/projectDetail/${item.projectId}`}>
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
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default CurrentProjectForInstructor
/*  */
