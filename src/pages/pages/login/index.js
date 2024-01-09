// ** React Imports
import * as React from 'react'
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// component Import
import Login_Teacher from './Login_Teacher'
import Login_Teacher_Project from './Login_Teacher_Project'
import Login_Student from './Login_Student'

const LoginPage = () => {
  // Tabpanel Control
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // ทำลายค่า jwtToken และ jwtRole ใน localStorage เมื่อมีการเข้ามาที่หน้า Login
  useEffect(() => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('jwtRole')
  }, [])

  return (
    <Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='auto'
        marginTop='5vh'
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Login Teacher' value='1' />
              <Tab label='Login Teacher Project' value='2' />
              <Tab label='Login Student' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Login_Teacher />
          </TabPanel>
          <TabPanel value='2'>
            <Login_Teacher_Project />
          </TabPanel>
          <TabPanel value='3'>
            <Login_Student />
          </TabPanel>
        </TabContext>
        <FooterIllustrationsV1 />
      </Box>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
