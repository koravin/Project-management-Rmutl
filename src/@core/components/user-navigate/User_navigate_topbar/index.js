// user_navigate_topbar.js
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const UserNavigateTopbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter() // Initialize useRouter

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEmailClick = () => {
    // ทำบางอย่างเมื่อคลิกที่ปุ่ม Email
  }

  const handleNotificationsClick = () => {
    // ทำบางอย่างเมื่อคลิกที่ปุ่ม Notifications
  }

  // รับค่า Role user จาก local storage
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // ดึงค่า jwtToken และ jwtRole จาก localStorage
        const storedJwtToken = localStorage.getItem('jwtToken')
        const storedJwtRole = localStorage.getItem('jwtRole')

        if (storedJwtToken && storedJwtRole) {
          // ส่ง token และ role ไปยัง API
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/verifyauthentication`, {
            token: storedJwtToken,
            tokenRole: storedJwtRole
          })

          setRole(response.data.stateRole)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchMenuItems()
  }, [])

  return (
    <AppBar position='static' style={{ padding: '5px', borderRadius: '15px', margin: '5px' }}>
      <Toolbar>
        {/* Logo  */}
        <Typography
          variant='h6'
          style={{ flexGrow: 1, color: '#FFFFFF', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          onClick={() => {
            router.push('/')
          }}
        >
          <AssignmentIcon style={{ marginRight: '8px' }} /> Project-mgt
        </Typography>

        <Button
          color='inherit'
          onClick={() => {
            router.push('/pages/User/Public_project_data/')
          }}
        >
          ค้นหาโครงงาน
        </Button>
        <Button
          color='inherit'
          onClick={() => {
            if (role === 'project-teacher') {
              router.push('/pages/MainMenu/InstructorMenu')
            } else if (role === 'นักศึกษา') {
              router.push('/pages/MainMenu/StudentMenu')
            } else if (role === 'อาจารย์') {
              router.push('/pages/MainMenu/TeacherMenu')
            }
          }}
          style={{ display: role ? 'inline-block' : 'none' }}
        >
          เมนูหลัก
        </Button>

        {/* Account Button and Menu */}
        <div style={{ marginRight: '20px' }}>
          <IconButton
            edge='end'
            color='inherit'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                router.push('/pages/login/')
                handleMenuClose()
              }}
            >
              {role ? 'Logout' : 'Login'}
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default UserNavigateTopbar
