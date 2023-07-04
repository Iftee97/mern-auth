import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation, useGetAllUsersQuery } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import Cookies from 'js-cookie'

export default function Hero() {
  const [skip, setSkip] = useState(true)

  const dispatch = useDispatch()
  const { userInfo, token } = useSelector(state => state.auth)
  // console.log({ userInfo, token })
  const [logoutApiCall] = useLogoutMutation()
  // console.log('useGetAllUsersQuery() >>>>>>>>>>>', useGetAllUsersQuery())
  const { data: allUsers, isLoading } = useGetAllUsersQuery(undefined, {
    skip: skip
  })

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      Cookies.remove('jwt')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>
            MERN Authentication
          </h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          {userInfo && (
            <>
              <div className='d-flex flex-column align-items-center justify-content-center mb-4'>
                <p className='text-center'>
                  Welcome back,{' '}
                  <Link to='/profile' style={{ color: '#333', textDecoration: 'none' }}>
                    <strong>{userInfo.name}!</strong>
                  </Link>
                </p>
                <Button variant='danger' onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
              <Button variant='success' onClick={() => setSkip(false)}>
                Fetch All Users
              </Button>
              {isLoading && (
                <div className='d-flex justify-content-center mt-4'>
                  <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              {!isLoading && allUsers && (
                <div className='mt-4'>
                  <h5 className='text-center mb-4'>
                    All Users
                  </h5>
                  <ul className='list-group'>
                    {allUsers.map(user => (
                      <li key={user._id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <span className='me-4'>
                          {user.name}
                        </span>
                        <span className='badge bg-primary rounded-pill'>
                          {user.email}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {!userInfo && (
            <div className='d-flex align-items-center'>
              <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Button variant='dark'>
                  Register
                </Button>
              </LinkContainer>
            </div>
          )}
        </Card>
      </Container>
    </div>
  )
}
