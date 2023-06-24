import { useEffect, useState } from 'react'
// import WithAuthorization from '../../Context/Authorization/Authorization'
// import * as ROLES from '../../constants/roles'
import { withFirebase } from '../../Context/Firebase/context'
import UserList from './UserList'
const style = {textAlign:"center",margin:"2rem auto"}
function AdminPage({ firebase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
    const unsubscribe =   await firebase.getUsersValues((snapshot) => {
      const usersObject = snapshot.val()
      const users = Object.entries(usersObject).map(list => {
        const [key, user] = list
        return { ...user, uid: key }
      })
      setUsers(users),
      setLoading(false)
    })
    return unsubscribe;
          
    } catch (error) {
      setLoading(false)
      setError({ ...error.message })

    }

    
  }
  useEffect(() => {
    let unsubscribe;
    const fetchData = async () => {
      unsubscribe = await fetchUsers();
    };
    fetchData();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
 
  useEffect(() => {
  }, [users]);
  if (error) {
    return <h2 style={style}>{error}</h2> 
}
  return <>
    {
      
    loading ? <h2 style={style}>Loading ...</h2> : <>
    
  <div>
    <h1 style={style}>Admin</h1>
          <UserList users={users} />
  </div>
    </> 
  }
  </>
}
// const isAdmin = (authUser) => authUser && authUser.roles.includes(ROLES.ADMIN)
// const Admin = WithAuthorization(isAdmin)(AdminPage)
export default withFirebase(AdminPage)