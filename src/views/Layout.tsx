import React from 'react'
import { Outlet } from 'react-router-dom'
import {NavComponent} from '../general/components/NavComponent'

export const Layout = () => {
  return (
    <>
    <NavComponent/>
    <Outlet/>
    </>
  )
}
