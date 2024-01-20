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
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import DialogContentText from '@mui/material/DialogContentText'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function Transfer_project({ open, handleClose, section }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร
  const [projectData, setProjectData] = useState([])
  const [selectedProject, setSelectedProject] = useState([]) // เก็บข้อมูลโปรเจคที่เลือก

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setSelectedProject('')
      setSubmitted(false)
    }
  }, [open])

  // Api ข้อมูล โปรเจคที่ผ่านวิชา pre มาแล้ว
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preprojects`)
        setProjectData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // ฟังชันส่งค่าข้อมูลเข้า Api
  const handleTransferProject = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน Input
    if (!selectedProject) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })
      handleClose()

      return
    }

    const data = {
      section_id: section,
      preproject_list: selectedProject
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/transferproject_many`, data)
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

  // หัว colum data grid
  const columns = [
    { field: 'project_code', headerName: 'Project Code', width: 120 },
    { field: 'preproject_name_th', headerName: 'Project Name(TH)', width: 300 },
    { field: 'preproject_name_eng', headerName: 'Project Name(ENG)', width: 300 },
    {
      field: 'project_status',
      headerName: 'Project Status',
      width: 150,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์ 'project_status'
        const statusName = params.row.status_name

        let statusText
        let statusColor
        let bgColor

        if (value === '1') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '2') {
          statusText = statusName
          statusColor = 'white'
          bgColor = 'black'
        } else if (value === '3') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#2979ff'
        } else if (value === '4') {
          statusText = statusName
          statusColor = 'white'
          bgColor = 'yellow'
        } else if (value === '5') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#ff9800'
        } else if (value === '6') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#4caf50'
        } else {
          statusText = value
          bgColor = value
        }

        return (
          <div
            style={{
              color: statusColor,
              backgroundColor: bgColor,
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '2px',
              paddingBottom: '2px',
              fontSize: '11px',
              borderRadius: '50px'
            }}
          >
            {statusText}
          </div>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen
        style={{ margin: '10vh', borderRadius: '10px' }}
        PaperProps={{
          style: {
            borderRadius: '10px'
          }
        }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Transfer project
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
          Top content
        </DialogContentText>
        <DialogContent dividers>
          {/* datagrid content 01 */}
          <Box sx={{ height: '100%', width: '100%', marginTop: '5vh' }}>
            <Card style={{ padding: '5px' }}>
              {projectData && projectData.length > 0 ? (
                <DataGrid
                  rows={projectData}
                  columns={columns}
                  getRowId={row => row.preproject_id}
                  checkboxSelection
                  onRowSelectionModelChange={newSelection => {
                    setSelectedProject(newSelection)
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10
                      }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                />
              ) : (
                <p>Nodata</p>
              )}
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransferProject}>Transfer</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
