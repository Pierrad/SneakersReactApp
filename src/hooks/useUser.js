import React from 'react'

const useUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return {
    ...user
  }
}


export default useUser