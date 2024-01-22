import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SyncIcon from '@mui/icons-material/Sync'

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
import Checkbox from '@mui/material/Checkbox'
import RefreshIcon from '@mui/icons-material/Refresh'

// Dialog import
import Transfer_project from './Transfer_project'
import Chang_Project_Status from './Chang_Project_Status'
import Project_section_detail from './Project_section_detail'

const Project_In_Section = () => {
  const router = useRouter() // router สร้าง path
  const [refreshData, setRefreshData] = useState(false) // รีตาราง
  const { rowData } = router.query
  const Swal = require('sweetalert2') // นำเข้าตัวsweetalert2
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // รับค่าข้อมูล Api
  const [projectData, setProjectData] = useState([])
  const [secData, setSecData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null)

  // checkbox variable
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

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
  const [openDetailDialog, setDetailOpenDialog] = React.useState(false)

  // useRef สำหรับเก็บค่า openDialog
  // เก็บ State Dialog Insert
  const openDialogRef = useRef(openDialog)
  openDialogRef.current = openDialog

  // เก็บ State Dialog Chang Status
  const openDialogChangStatusRef = useRef(openDialogChangStatus)
  openDialogChangStatusRef.current = openDialogChangStatus

  // เก็บ State Dialog Ch form
  const openDialogDetailRef = useRef(openDetailDialog)
  openDialogDetailRef.current = openDetailDialog

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

  const handleClickOpenDetailDialog = () => {
    setDetailOpenDialog(true)
  }

  const handleCloseDetailDialog = () => {
    setDetailOpenDialog(false)
  }

  // dialog Ch open
  const handleDetailDataClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/project_section_data?section_id=${secData}`
        )
        setProjectData(response.data.document_Result)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openDialog) {
      fetchData()
    }
  }, [openDialog, openDialogChangStatus, secData, submitted, refreshData])

  const handleCheckDocumentClick = (e, ch01_document_id) => {
    e.preventDefault()
    setSubmitted(prevSubmitted => !prevSubmitted)

    // ตรวจสอบค่าว่างใน TextField
    if (!ch01_document_id) {
      Swal.fire({
        icon: 'error',
        title: 'ขาดข้อมูล...',
        text: 'ระบบขัดข้อง!'
      })

      return
    }

    const data = {
      document_id: ch01_document_id
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/approve_project_document`, data)
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
  }

  // Table colum
  const columns = [
    { field: 'project_code', headerName: 'รหัสวิชา', width: 110 },
    { field: 'project_name_th', headerName: 'ชื่อโครงงาน', width: 250 },
    {
      field: 'project_status',
      headerName: 'สถานะโครงงาน',
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
          bgColor = '#2979ff'
        } else if (value === '3') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#2979ff'
        } else if (value === '4') {
          statusText = statusName
          statusColor = 'white'
          bgColor = '#ff9800'
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
    },
    {
      field: 'State',
      headerName: 'เปลี่ยนสถานะ',
      width: 80,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleChangProjectStatusClick(cellValues.row)}>
            <SyncIcon />
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'Detail',
      headerName: 'รายละเอียด',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailDataClick(cellValues.row.project_id)}>
            <VisibilityIcon />
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ch01_document_id',
      headerName: 'CH01',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ch01_document_id)}
            disabled={cellValues.row.ch01_document_id === 'no' || cellValues.row.ch01_status === '2'}
            checked={cellValues.row.ch01_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ch02_document_id',
      headerName: 'CH02',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ch02_document_id)}
            disabled={cellValues.row.ch02_document_id === 'no' || cellValues.row.ch02_status === '2'}
            checked={cellValues.row.ch02_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ch03_document_id',
      headerName: 'CH03',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ch03_document_id)}
            disabled={cellValues.row.ch03_document_id === 'no' || cellValues.row.ch03_status === '2'}
            checked={cellValues.row.ch03_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ch04_document_id',
      headerName: 'CH04',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ch04_document_id)}
            disabled={cellValues.row.ch04_document_id === 'no' || cellValues.row.ch04_status === '2'}
            checked={cellValues.row.ch04_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ch05_document_id',
      headerName: 'CH05',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ch05_document_id)}
            disabled={cellValues.row.ch05_document_id === 'no' || cellValues.row.ch05_status === '2'}
            checked={cellValues.row.ch05_status === '2'}
          />
        </div>
      ),
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
        <Typography variant='h5'>วิชาโครงการ</Typography>
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
            title='โครงงานทั้งหมดในเช็คชัน'
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  โครงงานในเช็คชัน
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
        โอนย้ายโครงงาน
      </Button>
      <Button
        sx={{
          marginBottom: '10px',
          width: '15vh',
          height: '20',
          marginTop: '5vh',
          marginLeft: '5px',
          backgroundColor: '#FFC107',
          '&:hover': {
            backgroundColor: '#FFD600'
          }
        }}
        variant='contained'
        onClick={() => {
          setRefreshData(prevSubmitted => !prevSubmitted)
        }}
      >
        <RefreshIcon /> รีเฟรช
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
        กลับ
      </Button>
      {/* InsertSection Dialog */}
      <Transfer_project open={openDialog} handleClose={handleCloseDialog} section={secData} />

      {/* Chang Status Dialog */}
      <Chang_Project_Status
        open={openDialogChangStatus}
        handleClose={handleCloseChangStatusDialog}
        rowData={selectedRowData}
      />

      {/*  Detail data Dialog */}
      <Project_section_detail
        open={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      />
    </Grid>
  )
}

export default Project_In_Section
