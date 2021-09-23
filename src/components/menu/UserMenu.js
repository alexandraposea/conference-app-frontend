import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { List, ListItem, Collapse, ListItemText, ListItemIcon, makeStyles} from '@material-ui/core'

import userMenuStyle from 'assets/jss/components/userMenuStyle'
import cx from 'classnames'
import LanguageSelector from './LanguageSelector'
import avatar_default from 'assets/img/default-avatar.png'
import { useTranslation } from 'react-i18next'
import userMenuConfig from 'constants/userMenuConfig'
import UserMenuItem from './UserMenuItem'
import { useLocation } from 'react-router-dom'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'
import {useEmail} from 'hooks/useEmail'

const useStyles = makeStyles(userMenuStyle)

function UserMenu({ drawerOpen, avatar, language, changeLanguage }) {
  const [openAvatar, setOpenAvatar] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation()
  const location = useLocation()


  const activeRoute = useCallback(routeName => location.pathname.indexOf(routeName) > -1, [location.pathname])
  const userMenuItems = userMenuConfig

  const openCollapseAvatar = useCallback(
    e => {
      setOpenAvatar(!openAvatar)
      e.preventDefault()
    },
    [openAvatar]
  )



  const itemText =
    classes.itemText +
    ' ' +
    cx({
      [classes.itemTextMini]: !drawerOpen
    })

  const [email] = useEmail()
  const displayName =  email ? email : t('UserMenu.User')
  //V2: const displayName =  email || t('UserMenu.User')

  return (
    <List className={classes.userMenuContainer}>
      <ListItem className={classes.item + ' ' + classes.userItem}>
        <NavLink to={'/'} className={classes.itemLink} onClick={openCollapseAvatar}>
          <ListItemIcon className={classes.itemIcon}>
            <img src={avatar ? avatar : avatar_default} className={classes.photo} alt='...' />
          </ListItemIcon>
          <ListItemText
            primary={displayName}
            secondary={openAvatar ? <ArrowDropUp className={classes.caret} /> : <ArrowDropDown className={classes.caret} />}
            disableTypography={true}
            className={itemText}
          />
        </NavLink>
        <Collapse in={openAvatar} unmountOnExit classes={{ wrapper: classes.collapseWrapper }}>
          <List className={classes.list + classes.collapseList}>
            {userMenuItems.map((userMenu, key) => {
              return <UserMenuItem key={key} userMenu={userMenu} drawerOpen={drawerOpen} activeRoute={activeRoute} />
            })}
            <ListItem className={classes.selectorItem}>
              <LanguageSelector language={language} changeLanguage={changeLanguage} drawerOpen={drawerOpen} />
            </ListItem>
          </List>
        </Collapse>
      </ListItem>
    </List>
  )
}

UserMenu.propTypes = {
  avatar: PropTypes.string,
  drawerOpen: PropTypes.bool.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
}

export default UserMenu
