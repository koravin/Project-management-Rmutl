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

const ProjectRecommend = () => {
  const wrapperStyles = {
    width: '100%',
    display: 'flex',
    height: '350px',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)'
  }

  const cardStyle = {
    width: '230px',
    height: '200px',
    margin: '30px',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)'
  }

  const imageStyle = {
    width: '100%',
    height: '100%', // Adjust the height of the image section
    objectFit: 'fit',
    borderRadius: '10px'
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* <h3> Project Recommend </h3>
      <Grid sx={wrapperStyles} container spacing={5}>
        <Grid sx={cardStyle}>
          <a href='/'>
            <img
              src='https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg'
              alt='Project Image'
              style={imageStyle}
            />
          </a>
        </Grid>
        <Grid sx={cardStyle}>
          <a href='/'>
            <img
              src='https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg'
              alt='Project Image'
              style={imageStyle}
            />
          </a>
        </Grid>
        <Grid sx={cardStyle}>
          <a href='/'>
            <img
              src='https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg'
              alt='Project Image'
              style={imageStyle}
            />
          </a>
        </Grid>
        <Grid sx={cardStyle}>
          <a href='/'>
            <img
              src='https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg'
              alt='Project Image'
              style={imageStyle}
            />
          </a>
        </Grid>
        <Grid sx={cardStyle}>
          <a href='/'>
            <img
              src='https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg'
              alt='Project Image'
              style={imageStyle}
            />
          </a>
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default ProjectRecommend
