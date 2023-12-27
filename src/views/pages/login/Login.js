import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as accountServices from '../../../apiServices/accountServices'
import { CBadge } from '@coreui/react-pro'

var account = {
  accountId: 0,
  email: '',
  pwd: '',
  accountTypeId: 0,
};

const Login = () => {
  const [user, setUser] = useState([])
  const [showMessage, setShowMessage] = useState()
  const [status, setStatus] = useState()
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.getAccount()
      // console.log(result)
      setUser(result)
    }
    fetchApi()
  }, [])
  const getBadge = (status) => {
    switch (status) {
      case 'Warning':
        return 'warning'
      case 'Error':
        return 'danger'
      default:
        return 'success'
    }
  }
  const login = () => {
    if (document.getElementById('Username').value === '' || document.getElementById('Password').value === '') {
      setVisible(!visible)
      setShowMessage('Please fill all the blank')
      setStatus('Warning')
      return
    }

    account.email = document.getElementById('Username').value
    account.pwd = document.getElementById('Password').value
    //account.accountId

    const fetchApi = async () => {
      //console.log(accountServices.checkAccount(account));
      const userResult = await accountServices.checkAccount(account);
      // console.log(userResult);
      //setUser(userResult);
      if (userResult === false) {
        //setText('Tài khoản không tồn tại');
        setVisible(!visible)
        setShowMessage('Account or password is incorrect')
        setStatus('Error')        
        //setIsError(!isError);
        //alert('Tai khoan co ton tai deo dau');
      } else {
        const fullAccount = await accountServices.GetAccountByEmail(account.email);
        sessionStorage.setItem('account', JSON.stringify(fullAccount))
        // console.log(fullAccount)
        const fetchApi1 = async () => {
            {fullAccount.accountTypeId == 1 ? (navigate('/Topic')):
            fullAccount.accountTypeId == 2 ? (navigate('/LecturerInfoPage')) : 
            fullAccount.accountTypeId == 3 ? (navigate('/Project')) :(<></>)}   
          }
          fetchApi1();
        }
      }
      fetchApi()
    }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" id="Username"/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={() => {login()}}>
                          Login
                        </CButton>
                        <CModal
                          alignment="center"
                          visible={visible}
                          onClose={() => setVisible(false)}
                          aria-labelledby="VerticallyCenteredExample"
                        >
                          <CModalHeader>
                            <CBadge color={getBadge(status)} style={{ fontSize: 16 }}>
                              {status}
                            </CBadge>                            
                          </CModalHeader>
                          <CModalBody>
                            <h6>{showMessage}</h6>
                          </CModalBody>
                        </CModal>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng ký đồ án</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
