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

export default function Chang_Preproject_Status({ open, handleClose, rowData }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร รับค่าข้อมูลจาก Api เพื่อเสดงเป็นตัวเลือกใน dropdown
  const [projectStatus, setProjectStatus] = useState('')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [statusId, setStatusId] = useState('')

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setStatusId('')
      setSubmitted(false)
    }
  }, [open])

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject_status`)
        setProjectStatus(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleStatusChange = event => {
    setStatusId(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ Status

  const handleChangProjectStatusClick = e => {
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
      preproject_id: rowData.preproject_id,
      preproject_status: statusId
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/change_preproject_status`, data)
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
          เปลี่ยนสถานะโครงงาน
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
          <Typography style={{ color: 'grey' }}>ชื่อโครงงาน: {rowData?.preproject_name_eng || 'N/A'} </Typography>
          <Typography style={{ color: 'grey' }}>
            สถานะโครงงาน:
            {rowData?.project_status === '1'
              ? ' Status 1'
              : rowData?.project_status === '2'
              ? ' Status 2'
              : rowData?.project_status === '3'
              ? ' Status 3'
              : rowData?.project_status === '4'
              ? ' Status 4'
              : rowData?.project_status === '5'
              ? ' Status 5'
              : rowData?.project_status === '6'
              ? ' Status 6'
              : rowData?.project_status === '7'
              ? 'Status 7'
              : ' Unknown'}
          </Typography>
        </DialogContentText>
        <DialogContent dividers>
          {/* Status Select */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='statuslabel'>สถานะโครงงาน</InputLabel>
                <Select
                  label='สถานะ'
                  value={statusId}
                  onChange={handleStatusChange}
                  labelId='Status-label'
                  error={submitted && !statusId} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                >
                  {projectStatus && projectStatus.length > 0 ? (
                    projectStatus.map(projectStatus => (
                      <MenuItem key={projectStatus.status_id} value={projectStatus.status_id}>
                        {projectStatus.status_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangProjectStatusClick}>อัปเดทสถานะ</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
