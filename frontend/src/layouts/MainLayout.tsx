// import React from 'react'
import { Outlet } from 'react-router-dom'

// Import components
import Header from 'src/components/header/Header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="p-4 m-auto w-full">
        <Outlet />
      </div>
    </>
  )
}