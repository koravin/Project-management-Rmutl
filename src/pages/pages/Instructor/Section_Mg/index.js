import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// mui import
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import SyncIcon from '@mui/icons-material/Sync'
import RefreshIcon from '@mui/icons-material/Refresh'

// Dialog import
import InsertSection from './InsertSection'
import ChangStatus from './ChangStatus'

const Section_Mg = () => {
  const router = useRouter() // router สร้าง path
  const [refreshData, setRefreshData] = useState(false) // รีตาราง

  // รับค่าข้อมูล Api
  const [sectionData, setSectionData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null) // ตัวแปรเก็บค่าข้อมูลแต่ละแถวในตารางเพื่อส่งข้อมูลเข้า Cpmponent Chang Status

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/sections`)
        setSectionData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openDialog) {
      fetchData()
    }
  }, [openDialog, openDialogChangStatus, refreshData])

  // Table colum
  const columns = [
    { field: 'curriculum_name_en', headerName: 'หลักสูตร', width: 300 },
    { field: 'subject_code', headerName: 'รหัสวิชา', width: 120 },
    { field: 'subject_name_en', headerName: 'ชื่อวิชา', width: 300 },
    {
      field: 'subject_type',
      headerName: 'ประเภทวิชา',
      width: 100,
      renderCell: params => <span>{params.value === '1' ? 'pre-project' : params.value === '2' ? 'project' : ''}</span>
    },
    {
      field: 'sec_status',
      headerName: 'สถานะเซ็ค',
      width: 120,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์
        let statusText
        let statusColor
        let bgColor

        if (value === '0') {
          statusText = 'Unactive'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'Active'
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
      field: 'Chang_Status',
      headerName: 'เปลี่ยนสถานะ',
      width: 150,
      renderCell: cellValues => {
        return (
          <Button
            variant='text'
            onClick={() => handleChangSectionStatusClick(cellValues.row)}
            style={{ color: '#2196F3' }}
          >
            <SyncIcon />
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
  }

  // Chang Section Status button click
  const handleChangSectionStatusClick = rowData => {
    handleClickChangStatusDialog()
    setSelectedRowData(rowData) // กำหนดข้อมูลของแถวที่ถูกคลิกให้ state
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>จัดการเช็คชัน</Typography>
      </Grid>

      {/* Header card */}
      <Grid style={{ width: '100%' }}>
        <Card
          style={{
            borderRadius: '20px',
            margin: 0,
            padding: 0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #00BFFF 80%, #1E90FF 100%)'
          }}
        >
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
            <OpenInNewIcon
              style={{
                fontSize: '2.5rem',
                marginTop: '21px',
                marginLeft: '20px',
                backgroundColor: '#28c7fc',
                borderRadius: '10px',
                padding: '5px',
                color: 'white'
              }}
            />
            <CardHeader
              title={<span style={{ color: 'white' }}>CE-Reform</span>}
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                    Project-MGT
                  </Box>
                  <br />
                  <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                    Rmutl
                  </Box>
                </Typography>
              }
            />
          </div>

          <CardHeader
            title={<span style={{ color: 'white' }}>เซ็คชันทั้งหมด</span>}
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                  {sectionData && sectionData.length ? sectionData.length : '0'} เช็คชันในระบบ
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}

      {/* Insert New Section */}
      <Button
        sx={{ marginBottom: '10px', height: '20', marginTop: '5vh' }}
        variant='contained'
        onClick={handleNewSectionClick}
      >
        เปิดเซ็คชันใหม่
      </Button>

      <Button
        sx={{
          marginBottom: '10px',
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
          <CardContent>
            {sectionData && sectionData.length > 0 ? (
              <DataGrid
                rows={sectionData}
                columns={columns}
                getRowId={row => row.section_id}
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
          </CardContent>
        </Card>
      </Box>

      {/* InsertSection Dialog */}
      <InsertSection open={openDialog} handleClose={handleCloseDialog} />

      {/* Chang Status Dialog */}
      <ChangStatus open={openDialogChangStatus} handleClose={handleCloseChangStatusDialog} rowData={selectedRowData} />
    </Grid>
  )
}

export default Section_Mg
