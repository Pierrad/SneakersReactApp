const useUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user === null) return null

  return {
    ...user
  }
}


export default useUser