import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// mui import
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'

// Dialog import
import Transfer_project from './Transfer_project'
import Chang_Project_Status from './Chang_Project_Status'

const Project_In_Section = () => {
  const router = useRouter() // router สร้าง path
  const { rowData } = router.query
  const Swal = require('sweetalert2') // นำเข้าตัวsweetalert2

  // รับค่าข้อมูล Api
  const [projectData, setProjectData] = useState([])
  const [secData, setSecData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)

  console.log('projectData', projectData)

  // รับข้อมูล Section จาก page ก่อนหน้า
  useEffect(() => {
    try {
      const secTionData = JSON.parse(rowData)
      const sectionID = secTionData.section_id
      setSecData(sectionID)
    } catch (error) {
      // Handle JSON parse error
      console.error('Error parsing JSON:', error)

      Swal.fire({
        icon: 'error',
        title: 'Invalid Data',
        text: 'The data received is not valid.',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/pages/Instructor/Manage') // Replace this with the correct path
      })
    }
  }, [rowData, router, Swal])

  // dialog control
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openDialogChangStatus, setOpenDialogChangStatus] = React.useState(false)

  // useRef สำหรับเก็บค่า openDialog
  // เก็บ State Dialog Insert
  const openDialogRef = useRef(openDialog)
  openDialogRef.current = openDialog

  // เก็บ State Dialog Chang Status
  const openDialogChangStatusRef = useRef(openDialogChangStatus)
  openDialogChangStatusRef.current = openDialogChangStatus

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClickChangStatusDialog = () => {
    setOpenDialogChangStatus(true)
  }

  const handleCloseChangStatusDialog = () => {
    setOpenDialogChangStatus(false)
  }

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/project_in_sec?section_id=${secData}`
        )
        setProjectData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openDialog) {
      fetchData()
    }
  }, [openDialog, openDialogChangStatus, secData])

  // Table colum
  const columns = [
    { field: 'project_code', headerName: 'Project Code', width: 150 },
    { field: 'project_name_th', headerName: 'Project Name(TH)', width: 280 },
    { field: 'project_name_eng', headerName: 'Project Name(EN)', width: 280 },
    {
      field: 'project_status',
      headerName: 'Project Status',
      width: 150,
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์
        let statusText
        let statusColor
        let bgColor

        if (value === '0') {
          statusText = 'Status0'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'Status1'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '2') {
          statusText = 'Status2'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '3') {
          statusText = 'Status3'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '4') {
          statusText = 'Status4'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '5') {
          statusText = 'Status5'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '6') {
          statusText = 'Status6'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '7') {
          statusText = 'Status7'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '8') {
          statusText = 'Status8'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '9') {
          statusText = 'Status9'
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
    },
    {
      field: 'Chang_status',
      headerName: 'Chang Status',
      width: 150,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleChangProjectStatusClick(cellValues.row)}>
            ...
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // New Section button click
  const handleNewSectionClick = () => {
    handleClickOpenDialog() // เปิดใช้งาน Dialog เมื่อคลิกที่ปุ่ม New Section
    setSelectedRowData(rowData)
  }

  // Chang Section Status button click
  const handleChangProjectStatusClick = rowData => {
    handleClickChangStatusDialog()
    setSelectedRowData(rowData)
  }

  // ฟังก์ชันย้ายหน้าwไปหน้าก่อนหน้า
  const handleBackpage = row => {
    router.push({
      pathname: '/pages/Instructor/Manage/'
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Section Project</Typography>
      </Grid>

      {/* Header card */}
      <Grid style={{ width: '100%' }}>
        <Card style={{ borderRadius: '20px', background: '#00BFFF', margin: 0, padding: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '10px',
              borderRadius: '20px',
              margin: 0,
              padding: 0
            }}
          >
            <PersonIcon
              style={{
                fontSize: '2.5rem',
                marginTop: '21px',
                marginLeft: '20px',
                backgroundColor: '#28c7fc',
                borderRadius: '10px',
                padding: '5px'
              }}
            />
            <CardHeader
              title='CE-Reform'
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Project-MGT
                  </Box>
                  <br />
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Rmutl
                  </Box>
                </Typography>
              }
            />
          </div>

          <CardHeader
            title='All Project In Section'
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  xxx Project In Section
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}

      {/* Transfer Project */}
      <Button
        sx={{ marginBottom: '10px', height: '20', marginTop: '5vh' }}
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleNewSectionClick}
      >
        Transfer
      </Button>

      {/* datagrid content 01 */}
      <Box sx={{ height: '100%', width: '100%' }}>
        <Card style={{ padding: '5px' }}>
          {projectData && projectData.length > 0 ? (
            <DataGrid
              rows={projectData}
              columns={columns}
              getRowId={row => row.project_id}
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
      {/* Back Button */}
      <Button
        sx={{
          marginBottom: '10px',
          height: '20',
          marginTop: '5vh',
          backgroundColor: '#ff5722',
          color: 'white'
        }}
        variant='contained'
        startIcon={<ArrowBackIcon />}
        onClick={handleBackpage}
      >
        Back
      </Button>
      {/* InsertSection Dialog */}
      <Transfer_project open={openDialog} handleClose={handleCloseDialog} section={secData} />

      {/* Chang Status Dialog */}
      <Chang_Project_Status
        open={openDialogChangStatus}
        handleClose={handleCloseChangStatusDialog}
        rowData={selectedRowData}
      />
    </Grid>
  )
}

export default Project_In_Section
