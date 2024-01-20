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
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import DialogContentText from '@mui/material/DialogContentText'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function Detail_teacher_post({ open, handleClose, rowData }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [statusId, setStatusId] = useState('')
  const [postId, setPostId] = useState('')
  const [postData, setPostData] = useState('')

  // เก็บค่า id post
  useEffect(() => {
    if (rowData && rowData.public_relations_id) {
      setPostId(rowData.public_relations_id)
    }
  }, [rowData])

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setStatusId('')
      setSubmitted(false)
    }
  }, [open, setStatusId])

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/get_post_detail?public_relations_id=${postId}`
        )

        setPostData(response.data.Data[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [postId])

  return (
    <React.Fragment>
      <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Change Topic Status
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
          <Typography style={{ color: 'grey' }}>Topic Name: {postData?.header_name || 'N/A'} </Typography>
          <Typography style={{ color: 'grey' }}>
            Topic Status:{' '}
            {postData?.status
              ? postData.public_relation_status === '1'
                ? 'Active'
                : postData.public_relation_status === '2'
                ? 'Unactive'
                : 'N/A'
              : 'N/A'}
          </Typography>
        </DialogContentText>
        <DialogContent dividers>
          {/* Content */}
          <Typography>Topic Content</Typography>
          <Card>
            <CardContent>
              <Typography style={{ color: 'grey' }}> {rowData?.description || 'N/A'} </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleChangStatus}>Update Status</Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  )
}
