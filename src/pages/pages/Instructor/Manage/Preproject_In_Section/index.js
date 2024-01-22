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
import VisibilityIcon from '@mui/icons-material/Visibility'
import SyncIcon from '@mui/icons-material/Sync'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import RefreshIcon from '@mui/icons-material/Refresh'

// Dialog import
import InsertSection from '../../Section_Mg/InsertSection'
import Chang_Preproject_Status from './Chang_Preproject_Status'
import Preproject_section_detail from './Preproject_section_detail'

const Preproject_In_Section = () => {
  const router = useRouter() // router สร้าง path
  const [refreshData, setRefreshData] = useState(false) // รีตาราง
  const { rowData } = router.query
  const Swal = require('sweetalert2') // นำเข้าตัวsweetalert2

  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  const [secTionData, setsecTionData] = useState([])

  // รับข้อมูล Section จาก page ก่อนหน้า
  useEffect(() => {
    try {
      setsecTionData(JSON.parse(rowData))
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

  // รับค่าข้อมูล Api
  const sectionID = secTionData.section_id
  const [projectData, setProjectData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null) // ตัวแปรเก็บค่าข้อมูลแต่ละแถวในตารางเพื่อส่งข้อมูลเข้า Cmponent Chang Status

  // checkbox variable
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  // dialog control
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openDialogChangStatus, setOpenDialogChangStatus] = React.useState(false)
  const [openDialogProjectDetail, setOpenDialogProjectDetail] = React.useState(false)

  // useRef สำหรับเก็บค่า openDialog
  // เก็บ State Dialog Insert
  const openDialogRef = useRef(openDialog)
  openDialogRef.current = openDialog

  // เก็บ State Dialog Chang Status
  const openDialogChangStatusRef = useRef(openDialogChangStatus)
  openDialogChangStatusRef.current = openDialogChangStatus

  // เก็บ State Dialog Project detail
  const openDialogProjectDetailRef = useRef(openDialogProjectDetail)
  openDialogProjectDetailRef.current = openDialogProjectDetail

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
    setOpenDialogProjectDetail(true)
  }

  const handleCloseDetailDialog = () => {
    setOpenDialogProjectDetail(false)
  }

  // dialog Detail open
  const handleDetailClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  const handleCheckDocumentClick = (e, ce01_document_id) => {
    e.preventDefault()
    setSubmitted(prevSubmitted => !prevSubmitted)

    // ตรวจสอบค่าว่างใน TextField
    if (!ce01_document_id) {
      Swal.fire({
        icon: 'error',
        title: 'ขาดข้อมูล...',
        text: 'ระบบขัดข้อง!'
      })

      return
    }

    const data = {
      document_id: ce01_document_id
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/approve_preproject_document`, data)
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

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject_section_data?section_id=${sectionID}`
        )

        // setCe01Options(ce01Options)
        setProjectData(response.data.document_Result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [openDialog, openDialogChangStatus, sectionID, submitted, refreshData])

  // Table colum
  const columns = [
    { field: 'project_code', headerName: 'รหัสโครงงาน', width: 110 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน', width: 230 },
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
    },
    {
      field: 'State',
      headerName: 'เปลี่ยนสถานะ',
      width: 100,
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
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailClick(cellValues.row.preproject_id)}>
            <VisibilityIcon />
          </Button>
        )
      }
    },
    {
      field: 'ce01_document_id',
      headerName: 'CE01',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce01_document_id)}
            disabled={cellValues.row.ce01_document_id === 'no' || cellValues.row.ce01_status === '2'}
            checked={cellValues.row.ce01_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ce02_document_id',
      headerName: 'CE02',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce02_document_id)}
            disabled={cellValues.row.ce02_document_id === 'no' || cellValues.row.ce02_status === '2'}
            checked={cellValues.row.ce02_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ce03_document_id',
      headerName: 'CE03',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce03_document_id)}
            disabled={cellValues.row.ce03_document_id === 'no' || cellValues.row.ce03_status === '2'}
            checked={cellValues.row.ce03_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ce04_document_id',
      headerName: 'CE04',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce04_document_id)}
            disabled={cellValues.row.ce04_document_id === 'no' || cellValues.row.ce04_status === '2'}
            checked={cellValues.row.ce04_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ce05_document_id',
      headerName: 'CE05',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce05_document_id)}
            disabled={cellValues.row.ce05_document_id === 'no' || cellValues.row.ce05_status === '2'}
            checked={cellValues.row.ce05_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    },
    {
      field: 'ce06_document_id',
      headerName: 'CE06',
      width: 80,
      renderCell: cellValues => (
        <div>
          <Checkbox
            {...label}
            onChange={e => handleCheckDocumentClick(e, cellValues.row.ce06_document_id)}
            disabled={cellValues.row.ce06_document_id === 'no' || cellValues.row.ce06_status === '2'}
            checked={cellValues.row.ce06_status === '2'}
          />
        </div>
      ),
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // Chang Section Status button click
  const handleChangProjectStatusClick = rowData => {
    handleClickChangStatusDialog()
    setSelectedRowData(rowData) // กำหนดข้อมูลของแถวที่ถูกคลิกให้ state
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
        <Typography variant='h5'>วิชาเตรียมโครงการ</Typography>
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
            title='โปรเจคทั้งหมด'
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  โปรเจ็คในเช็คชัน
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}

      <Button
        sx={{
          marginBottom: '10px',
          width: '15vh',
          height: '20',
          mt: 10,
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
              getRowId={row => row.preproject_id}
              sx={
                {
                  // '& .MuiDataGrid-virtualScroller': { overflowY: 'scroll', overflowX: 'hidden' }
                }
              }
              autoHeight
              autoPageSize
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
      <InsertSection open={openDialog} handleClose={handleCloseDialog} />

      {/* Chang Status Dialog */}
      <Chang_Preproject_Status
        open={openDialogChangStatus}
        handleClose={handleCloseChangStatusDialog}
        rowData={selectedRowData}
      />

      {/*  Detail data Dialog */}
      <Preproject_section_detail
        open={openDialogProjectDetail}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      />
    </Grid>
  )
}

export default Preproject_In_Section
