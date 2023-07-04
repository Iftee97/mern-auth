import { Link } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import Cookies from 'js-cookie'

export default function Hero() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { token } = useSelector(state => state.auth)
  console.log({ userInfo, token })
  const [logoutApiCall] = useLogoutMutation()

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
            <div className='d-flex flex-column align-items-center justify-content-center'>
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
