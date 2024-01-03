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

const Greeting = () => {

    const wrapperStyles = {
        width: '100%',
        display: 'flex',
        height: '400px',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
        padding: '120px',
    }

    const cardStyles1 = {
        width: '50%',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        margin: '30px',
    }

    const cardStyles2 = {
        width: '50%',
        height: '300px',
        display: 'flex',  
        backgroundImage: `url('https://blog.arduino.cc/wp-content/uploads/2023/01/Phase2-Project-Hub_Blogpost-Cover-1024x549.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '30px',
        borderRadius: '10px',
    }

    return (
        <Box sx={wrapperStyles}>
            <Grid sx={cardStyles1}>
                <h1>Project MGT <br /> Management System</h1>
                <p>
                    Welcome to CE reform project management system. This project is a system to help organize the teaching
                    and learning of preproject and project subjects. And it is a place to publicize information
                    about subjects projects. Created by the Faculty of Engineering Computer RMUTL.
                </p>
            </Grid>

            <Grid sx={cardStyles2}></Grid>
        </Box>
    )
}


export default Greeting
