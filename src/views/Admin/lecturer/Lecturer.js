import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CInputGroup,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import * as instructorService from '../../../apiServices/instructorServices'

const Lecturer = () => {
  const [details, setDetails] = useState([])
  const [lecturer, setLecturer] = useState([])
  const [items, setItems] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const columns = [
    {
      key: 'instructorId',
      label: '',
      filter: false,
      sorter: true,
      _style: { width: '3%' },
    },
    {
      key: 'iName',
      label: 'Name',
      _style: { width: '20%' },
      sorter: false,
    },
    {
      key: 'gender',
      _style: { width: '5%' },
      filter: false,
    },
    {
      key: 'email',
      _style: { width: '7%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'phoneNumber',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'degree',
      _style: { width: '8%' },
    },
    {
      key: 'accountId',
      _style: { width: '8%' },
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
  useEffect(() => {
    const fetchApi = async () => {
      const result = await instructorService.getInstructor()
      setLecturer(result)
    }
    fetchApi()
  }, [])
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const rows = await readXlsxFile(file)
    const headers = rows[0]
    const data = rows.slice(1).map((row) => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index]
        return obj
      }, {})
    })
    setItems(data)
  }
  const addTopics = () => {
    const fetchApi = async () => {
      var promises = []
      for (var i = 0; i < items.length; i++) {
        const result = await instructorService.createInstructor(items[i])
        const result1 = await instructorService.getInstructor()
        promises.push(result)
        setLecturer(result1)
      }
      setItems(null)
      Promise.all(promises)
    }
    fetchApi()
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
  return (
    <div>
      <div className="gap-2 d-md-flex justify-content-md-end">
        <CButton onClick={() => setVisibleXL(!visibleXL)}>Add from Excel</CButton>
        <CModal
          size="xl"
          visible={visibleXL}
          onClose={() => setVisibleXL(false)}
          aria-labelledby="OptionalSizesExample1"
        >
          <CModalHeader>
            <CModalTitle id="OptionalSizesExample1">List of topics</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CRow>
                <CCol sm={12}>
                  <CFormInput type="file" onChange={handleFileUpload} />
                </CCol>
              </CRow>
            </div>
            <CSmartTable
              columns={columns}
              columnFilter
              columnSorter
              items={items}
              itemsPerPageSelect
              onFilteredItemsChange={(items) => {}}
              onSelectedItemsChange={(items) => {}}
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
                          toggleDetails(item.instructorId)
                        }}
                      >
                        {details.includes(item.instructorId) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
                details: (item) => {
                  return (
                    <CCollapse visible={details.includes(item.instructorId)}>
                      <CCardBody className="p-3">
                        <CButton size="sm" color="info">
                          User Settings
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                          Delete
                        </CButton>
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
            <div className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info" onClick={addTopics}>
                Save
              </CButton>
            </div>
          </CModalBody>
        </CModal>
      </div>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={lecturer}
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
          show_details: (item) => {
            return (
              <td className="py-2">
                <Link to={`/lecturerDetail/${item.instructorId}`}>
                  {/* Use the CoreUI button component */}
                  <CButton color="primary">Detail</CButton>
                </Link>
              </td>
            )
          },
        }}
        sorterValue={{ column: 'status', state: 'asc' }}
        tableProps={{
          className: 'add-this-class',
          responsive: true,
          striped: true,
          hover: true,
        }}
        tableBodyProps={{
          className: 'align-middle',
        }}
      />
    </div>
  )
}

export default Lecturer
