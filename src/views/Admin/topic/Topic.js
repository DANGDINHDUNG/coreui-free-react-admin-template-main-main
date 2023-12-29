import React from 'react'
import { useState, useEffect } from 'react'
import { CSmartTable } from '@coreui/react-pro'
import readXlsxFile from 'read-excel-file'
import * as topicServices from '../../../apiServices/topicServices'

import {
  CCardBody,
  CButton,
  CCollapse,
  CRow,
  CCol,
  CContainer,
  CFormCheck,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'

const Topic = () => {
  const [details, setDetails] = useState([])
  const [items, setItems] = useState([])
  const [topic, setTopic] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)

  const columns = [
    {
      key: 'topicId',
      label: 'Id',
      filter: false,
      _style: { width: '5%' },
    },
    {
      key: 'topicName',
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
      key: 'instructorId',
      sorter: false,
      _style: { width: '10%' },
    },
    {
      key: 'subjectId',
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
  const deleteTopic = (index) => {
    const fetchApi = async () => {
      const result = await topicServices.deleteTopic(index)
      const result1 = await topicServices.getTopic()
      setTopic(result1)
    }
    fetchApi()
    
  }
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
        const result = await topicServices.createTopic(items[i])
        const result1 = await topicServices.getTopic()
        promises.push(result)
        setTopic(result1)
      }
      setItems(null)
      Promise.all(promises)
    }
    fetchApi()
  }
  const subjectFilter = (index) => {
    const fetchApi = async () => {
      const result = await topicServices.getTopicbySubject(index)
      setTopic(result)
    }
    getChecked(index)
    fetchApi()
  }
  const getChecked = (index) => {
    if (index === 1) {
      setIsChecked1(!isChecked1)
      setIsChecked2(isChecked1) // Set the second checkbox based on the first checkbox
    } else if (index === 2) {
      setIsChecked2(!isChecked2)
      setIsChecked1(isChecked2) // Set the first checkbox based on the second checkbox
    }
  }
  useEffect(() => {
    const fetchApi = async () => {
      const result = await topicServices.getTopic()
      setTopic(result)
    }
    fetchApi()
  }, [])
  return (
    <div>
      <CContainer>
        <CRow>
          <CCol sm={8}>
            <CFormCheck
              button={{ color: 'success', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="1"
              checked={isChecked1}
              autoComplete="off"
              label="Project 1"
              onChange={() => {
                subjectFilter(1)
              }}
            />
            <CFormCheck
              button={{ color: 'danger', variant: 'outline' }}
              type="radio"
              name="options-outlined"
              id="2"
              checked={isChecked2}
              autoComplete="off"
              label="Project 2"
              onChange={() => {
                subjectFilter(2)
              }}
            />
          </CCol>
          <CCol sm={4}>
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
                                toggleDetails(item.topicId)
                              }}
                            >
                              {details.includes(item.topicId) ? 'Hide' : 'Show'}
                            </CButton>
                          </td>
                        )
                      },
                      details: (item) => {
                        return (
                          <CCollapse visible={details.includes(item.topicId)}>
                            <CCardBody className="p-3">
                              <h4>{item.topicName}</h4>
                              <p className="text-muted">User since: ${item.topicName}</p>
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
          </CCol>
        </CRow>
      </CContainer>
      <CSmartTable
        activePage={2}
        columns={columns}
        columnFilter
        columnSorter
        items={topic}
        itemsPerPageSelect
        itemsPerPage={50}
        pagination
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
                    toggleDetails(item.topicId)
                  }}
                >
                  {details.includes(item.topicId) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.topicId)}>
                <CCardBody className="p-3">
                  <h4>{item.topicName}</h4>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <CButton size="sm" color="info">
                      Topic Settings
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => {
                        deleteTopic(item.topicId)
                      }}
                    >
                      Delete
                    </CButton>
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

export default Topic
