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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function ChangStatus({ open, handleClose, rowData }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  //   console.log('rowdata section', rowData)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [statusId, setStatusId] = useState('') // เก็บข้อมูลหลักสูตร

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setStatusId('')
      setSubmitted(false)
    }
  }, [open])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleStatusChange = event => {
    setStatusId(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ Status

  const handleActive = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!statusId) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })
      handleClose()

      return
    }

    const data = {
      section_id: rowData.section_id
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/activesection`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'Active section success'
    })
    handleClose()
  }

  const handleUnactive = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!statusId) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })
      handleClose()

      return
    }

    const data = {
      section_id: rowData.section_id
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/unactivesection`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'Unactive section'
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Change Project Status
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
        <DialogContentText id='alert-dialog-slide-description' style={{ marginLeft: '15px', marginBottom: '10px' }}>
          <Typography style={{ color: 'grey' }}>Curruculum Name: {rowData?.curriculum_name_en || 'N/A'} </Typography>
          <Typography style={{ color: 'grey' }}>Subject Code: {rowData?.subject_code || 'N/A'}</Typography>
          <Typography style={{ color: 'grey' }}>
            Subject Type:{' '}
            {rowData?.subject_type === '1' ? 'preproject' : rowData?.subject_type === '2' ? 'project' : 'Unknown'}
          </Typography>
          <Typography style={{ color: 'grey' }}>Subject Name: {rowData?.subject_name_en || 'N/A'}</Typography>
        </DialogContentText>
        <DialogContent dividers>
          {/* Status Select */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='statuslabel'>Section status</InputLabel>
                <Select
                  label='Status'
                  value={statusId}
                  onChange={handleStatusChange}
                  labelId='Status-label'
                  error={submitted && !statusId} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                >
                  <MenuItem value={'1'}>Active</MenuItem>
                  <MenuItem value={'2'}>Unctive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={statusId === '1' ? handleActive : handleUnactive}>
            Update Status
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
