import Footer from '../footer'
// import PageHeader from '../header'
import { Outlet } from 'react-router-dom'
import NewHeader from '../new-header'

export default function BaseLayout() {
  return (
    <>
      <NewHeader />
      <Outlet />
      <Footer />
    </>
  )
}

