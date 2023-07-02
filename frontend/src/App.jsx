import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  )
}
