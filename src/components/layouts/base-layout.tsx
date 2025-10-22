import Footer from '../footer'
// import PageHeader from '../header'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../header'
import { useEffect, useCallback } from 'react'
import { useSmoothScroll } from '../../lib/hooks/use-smooth-scroll'

export default function BaseLayout() {
  const pathName = useLocation().pathname
  const { scrollToTop } = useSmoothScroll()

  const handleScrollToTop = useCallback(() => {
    scrollToTop({ duration: 100 })
  }, [scrollToTop])

  useEffect(() => {
    handleScrollToTop()
  }, [pathName, handleScrollToTop])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

