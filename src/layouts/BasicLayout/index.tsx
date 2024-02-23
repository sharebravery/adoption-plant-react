import React from 'react'
import Navbar from './Navbar'

interface IProps {
  children: React.ReactNode
}

const BasicLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-cover bg-fixed bg-center bg-no-repeat bg-origin-border">
      <header className="fixed z-110 h100 w-100% bg-#242424 2xl:w-1400 lg:w-1000 xl:w-1200">
        <div className="w-98%">
          <Navbar title="Follow" />
        </div>
      </header>

      <div className="fixed top-100 h1 w-full bg-#070404"></div>

      <div className="h-100"></div>

      <div className="h16 w-full" />

      <main className="h-full w-375 items-center lg:w-800 md:w-400 sm:w-375 xl:w-1200">
        {children}
      </main>

      <div className="h-60 w-full" />
    </div>
  )
}

export default BasicLayout
