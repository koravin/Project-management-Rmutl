// ** React Imports
import { useState } from 'react'

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

import themeConfig from 'src/configs/themeConfig'
import { Grid } from '@mui/material'

const Header = () => {

  const wrapperStyles = {
    width: '100%', 
    display: 'flex', 
    alignItems: 'center',
    height: '100px', 
    justifyContent: 'space-between', 
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)' 
  }

  return (
    <Box sx={wrapperStyles}>

      <Grid sx={{ display: 'flex', height: '100%', width: '300px', padding: '10px', marginLeft: '20px', gap: '10px' }}>
        {/* <img src='https://webs.rmutl.ac.th/assets/upload/gallery/2016/06/gallery_20160623151701_6936157.jpg' alt="BigCo Inc. logo" /> */}
        <h1 sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Project-MGT</h1>
      </Grid>
      
      <Grid sx={{ height: '100%', width: '300px', padding: '10px', marginRight: '20px', display:'flex', justifyContent:'center', alignItems:'center' }} >
        <Button variant='contained'>
            Login
        </Button>
      </Grid>

    </Box>
  )
}


export default Header
