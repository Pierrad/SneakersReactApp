import React from 'react'

import { history } from '../../App'

import useUser from '../../hooks/useUser'

import UserIcon from '../../assets/images/user.svg'
import SuitCaseIcon from '../../assets/images/suitcase.svg'
import CheckIcon from '../../assets/images/check.svg'
import CloudIcon from '../../assets/images/cloud.svg'

import './styles.css'

function User() {
  const user = useUser()

  const handleGoBack = () => {
    history.back()
  }

  return (
    <div id="container" className="container h-100 d-flex align-items-center justify-content-center h-100">
      <div className="card rounded p-4 d-flex flex-column">
        <img src={UserIcon} alt="Avatar icon" width="40px" heigth="40px" />
        <h2 id="name" className="name mt-3">{user.username}</h2>
        <p id="email" className="text-secondary mb-0"></p>
        <div className="info mt-4 mb-4">
          <div className="infoItem w-100 d-flex align-items-center justify-content-between pt-2 pb-2 mb-2 border-bottom border-secondary">
            <div className="infoItemLeft d-flex align-items-center">
              <img className="infoItemIcon me-2" src={SuitCaseIcon} alt="Company icon" with="20px" height="20px" />
              <p className="infoItemTitle mb-0">Company</p>
            </div>
            <p id="company" className="infoItemText mb-0 text-end">UNS</p>
          </div>
          <div className="infoItem w-100 d-flex align-items-center justify-content-between pt-2 pb-2 mb-2 border-bottom border-secondary">
            <div className="infoItemLeft d-flex align-items-center">
              <img className="infoItemIcon me-2" src={CheckIcon} alt="PublicId icon" with="20px" height="20px" />
              <p className="infoItemTitle mb-0">PublicId</p>
            </div>
            <p id="publicID" className="infoItemText mb-0 text-end text-truncate">{user.publicId}</p>
          </div>
          <div className="infoItem w-100 d-flex align-items-center justify-content-between pt-2 pb-2 mb-2 border-bottom border-secondary">
            <div className="infoItemLeft d-flex align-items-center">
              <img className="infoItemIcon me-2" src={CloudIcon} alt="Role icon" with="20px" height="20px" />
              <p className="infoItemTitle mb-0">Role</p>
            </div>
            <p id="role" className="infoItemText text-end mb-0">{user.role}</p>
          </div>
        </div>
        <button className="d-flex align-items-center justify-content-center border-0 rounded pt-2 pb-2 ps-3 pe-3" onClick={handleGoBack}>Retour</button>
      </div>
    </div>
  )
}

export default User