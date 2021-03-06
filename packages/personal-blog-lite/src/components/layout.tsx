import React from "react"
import ScrollToTop from "react-scroll-up"
import Sticky from "react-stickynode"
import { ThemeProvider } from "styled-components"
import { theme } from "../theme"
import Footer from "./Footer/Footer"
import GlobalCSS from "./globalCSS"
import Navbar from "./Navbar/Navbar"
import ResetCss from "./resetCSS"
import ScrollUpButton from "./ScrollUpButton/ScrollUpButton"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <ResetCss />
        <GlobalCSS />
        <Sticky innerZ={9999} activeClass="nav-sticky">
          <Navbar />
        </Sticky>

        {children}

        <Footer>
          Copyright &copy; {new Date().getFullYear()}
          <a href="https://redq.io/"> RedQ, Inc.</a>
        </Footer>
        <ScrollToTop
          showUnder={300}
          duration={700}
          easing="easeInOutCubic"
          style={{ bottom: 30, right: 20 }}
        >
          <ScrollUpButton />
        </ScrollToTop>
      </>
    </ThemeProvider>
  )
}

export default Layout
