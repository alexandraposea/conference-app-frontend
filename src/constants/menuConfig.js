import React from 'react'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import { Event, EventNote } from '@material-ui/icons'


const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu' },
  { icon: <HomeIcon/>, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Event/>, text: 'NavBar.ConferenceList', path: '/conferenceList', name: 'ConferenceList' },
  { icon: <EventNote />, text: 'NavBar.MyConferences' , path: '/myConferencesList', name: 'MyConferences' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' }
]

export default menuItems
