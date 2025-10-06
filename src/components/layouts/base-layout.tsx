import Footer from '../footer'
// import PageHeader from '../header'
import { Outlet } from 'react-router-dom'
import Header from '../header'

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

