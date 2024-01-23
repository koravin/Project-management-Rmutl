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

export default function ChangStatus_post({ open, handleClose, rowData }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [statusId, setStatusId] = useState('')

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setStatusId('')
      setSubmitted(false)
    }
  }, [open, setStatusId])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleStatusChange = event => {
    setStatusId(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ Status

  const handleChangStatus = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!statusId) {
      alert('กรุณาระบุสถานะ')

      return
    }

    const data = {
      public_relations_id: rowData.public_relations_id,
      status: statusId
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/post_update_status`, data)
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

  return (
    <React.Fragment>
      <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          เปลี่ยนสถานะโพส
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
          <Typography style={{ color: 'grey' }}>หัวข้อ: {rowData?.header_name || 'N/A'} </Typography>
          <Typography style={{ color: 'grey' }}>
            สถานะ:{' '}
            {rowData?.public_relation_status
              ? rowData.public_relation_status === '1'
                ? 'Active'
                : rowData.public_relation_status === '2'
                ? 'Unactive'
                : 'N/A'
              : 'N/A'}
          </Typography>
        </DialogContentText>
        <DialogContent dividers>
          {/* Status Select */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='statuslabel'>Section status</InputLabel>
                <Select label='Status' value={statusId} onChange={handleStatusChange} labelId='Status-label'>
                  <MenuItem value='1'>Active</MenuItem>
                  <MenuItem value='2'>Unactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangStatus}>Update Status</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
