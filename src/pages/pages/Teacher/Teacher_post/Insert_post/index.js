import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// MUI Import
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import DialogContentText from '@mui/material/DialogContentText'
import { Box, TextareaAutosize } from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function Insert_post({ open, handleClose }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [topic, setTopic] = useState('')
  const [postdata, setPostData] = useState('')
  const addEmoji = emoji => () => setPostData(`${postdata}${emoji}`)

  // รับค่า id instructor จาก local storage
  const [instructor_id, setInstructor_Id] = useState([])

  useEffect(() => {
    // Check for CSR
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('jwtUser_id')
      setInstructor_Id(userID)
    }
  }, [])

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setTopic('')
      setPostData('')
      setSubmitted(false)
    }
  }, [open])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Input
  const handleTopicNameChange = event => {
    setTopic(event.target.value)
  }

  const handlePostDataChange = event => {
    setPostData(event.target.value)
  }

  // ฟังชันส่งค่าเข้า Api
  const handleInsertTopicClick = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!topic) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })
      handleClose()

      return
    }

    const data = {
      instructor_id: instructor_id,
      topicname: topic,
      description: postdata
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/post_interest`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'Update Status Complete'
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Post detail
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* <DialogContentText id='alert-dialog-slide-description' style={{ marginLeft: '15px', marginBottom: '10px' }}>
          <Typography style={{ color: 'grey' }}>xxx</Typography>
        </DialogContentText> */}
        <DialogContent dividers style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2} style={{ flexGrow: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  type='text'
                  label='Topic Name'
                  placeholder='Topic Name'
                  value={topic}
                  onChange={e => handleTopicNameChange(e)}
                  variant='outlined'
                  style={{ marginBottom: '16px' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextareaAutosize
                aria-label='minimum height'
                placeholder='Type in here…'
                value={postdata}
                onChange={event => handlePostDataChange(event)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  resize: 'vertical',
                  fontFamily: 'Analog, sans-serif',
                  height: '25vh'
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInsertTopicClick}>Post</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
