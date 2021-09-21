import React from 'react'
import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"

const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <Dashboard />, text: 'NavBar.Dashboard', path: '/dashboard', name: 'Dashboard' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  
]

export default menuItems
