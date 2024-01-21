import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CardHeader from '@mui/material/CardHeader'
import PersonIcon from '@mui/icons-material/Person'
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { styled } from '@mui/system'

const HeaderTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'url("https://webs.rmutl.ac.th/assets/upload/logo/website_logo_th_20230602105958.png")',
  backgroundSize: 'cover',
  height: '300px',
  display: 'flex',
  color: 'white',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // สีดำแบบจางๆ
    zIndex: 1 // ให้ pseudo-element อยู่ด้านหลัง
  },

  '& > *': {
    position: 'relative',
    zIndex: 2,
    color: 'white'
  },

  '& h4': {
    color: 'white',
    fontWeight: 'bold'
  },
  '& h5': {
    color: 'white',
    fontWeight: 'bold'
  }
}))

function Headercard() {
  const router = useRouter() // router สร้าง path

  return (
    <div>
      <Grid>
        <HeaderTypography variant='h5' sx={{ m: 5, fontWeight: 'bold' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            ระบบค้นหาโครงการ
          </Typography>

          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            Project Searching System
          </Typography>
        </HeaderTypography>
      </Grid>
    </div>
  )
}

export default Headercard
