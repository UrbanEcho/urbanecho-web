import Footer from '../footer'
// import PageHeader from '../header'
import { Outlet } from 'react-router-dom'
import Header from '../header'
import ScrollRestorationProvider from '../../providers/scroll-restoration-provider'

export default function BaseLayout() {
  return (
    <ScrollRestorationProvider>
      <Header />
      <Outlet />
      <Footer />
    </ScrollRestorationProvider>
  )
}

