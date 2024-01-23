import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CardHeader from '@mui/material/CardHeader'
import PersonIcon from '@mui/icons-material/Person'
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { styled } from '@mui/system'

// Component Import
// import Public_project_detail from './Public_project_detail'
import Public_project_detail from './pages/User/Public_project_data/Public_project_detail'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

//** Topbar Import
import User_navigate_topbar from 'src/@core/components/user-navigate/User_navigate_topbar'
import User_footer from 'src/@core/components/user-navigate/User_footer'

const HeaderTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'url("https://webs.rmutl.ac.th/assets/upload/logo/website_logo_th_20230602105958.png")',
  backgroundSize: 'cover',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  color: '#444444',
  padding: theme.spacing(2)
}))

function Dashboard() {
  const router = useRouter() // router สร้าง path
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // เก็บค่าข้อมูล Input
  const [projectName, setProjectName] = useState('')
  const [projecttype, setProjectType] = React.useState('')
  const [projectYear, setProjectYear] = useState('')
  const [projectAdvisor, setProjectAdvisor] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedProjectType, setSelectedProjectType] = useState('')

  // ฟังชันเก็บค่าข้อมูล Input
  const handleProjectNameChange = event => {
    setProjectName(event.target.value)
  }

  const handleProjectTypeChange = event => {
    setSelectedProjectType(event.target.value)
  }

  const handleProjectYearChange = event => {
    setProjectYear(event.target.value)
  }

  const handleProjectAdvisorChange = event => {
    setProjectAdvisor(event.target.value)
  }

  // ปุ่ม Reset
  const handleReset = () => {
    setProjectName('')
    setProjectType('')
    setProjectYear('')
    setProjectAdvisor('')
    setSelectedProjectType('')
  }

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])
  const [projectTypeData, setprojectTypeData] = useState([])

  //ตัวแปรเช็คสถานะ Loading
  const [isLoading, setIsLoading] = useState(true)

  //----------------------------dialog control Functions---------------------------------//
  const [openDetailDialog, setDetailOpenDialog] = React.useState(false)
  const [openDialogChangStatus, setOpenDialogChangStatus] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  // useRef สำหรับเก็บค่า openDialog

  // เก็บ State Dialog Ch form
  const openDialogDetailRef = useRef(openDetailDialog)
  openDialogDetailRef.current = openDetailDialog

  // เก็บ State Dialog Chang Status
  const openDialogChangStatusRef = useRef(openDialogChangStatus)
  openDialogChangStatusRef.current = openDialogChangStatus

  const handleClickOpenDetailDialog = () => {
    setDetailOpenDialog(true)
  }

  const handleCloseDetailDialog = () => {
    setDetailOpenDialog(false)
  }

  // dialog Chang Status open
  const handleClickChangStatusDialog = rowData => {
    setOpenDialogChangStatus(true)
    setSelectedRowData(rowData)
  }

  const handleCloseChangStatusDialog = () => {
    setOpenDialogChangStatus(false)
  }

  // dialog Ch open
  const handleDetailDataClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  //----------------------------Api request---------------------------------//

  // ดึงข้อมูล project type
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/project_type`)
        const projectType = response.data.data || []
        setprojectTypeData(projectType)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudentData()
  }, [])

  const columns = [
    { field: 'project_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    { field: 'project_name_eng', headerName: 'ชื่อโครงงาน(ภาษาอังกฤษ)', width: 300 },

    {
      field: 'project_status',
      headerName: 'สถานะโครงงาน',
      width: 180,
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
      field: 'Detail',
      headerName: 'รายละเอียด',
      width: 150,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailDataClick(cellValues.row.project_id)}>
            <InfoIcon />
          </Button>
        )
      }
    }
  ]

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallprojectrecommend`)
        setProjectData(response.data.projectlist)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [openDialogChangStatus])

  // ส่งค่าจากแถวไปหน้า Detail
  const handleDetailClick = projectId => {
    router.push(`/pages/BackOffice/DisplayProject/ProjectDetail/?id=${projectId}`)
  }

  // ฟังก์ชันค้นหาข้อมูล
  const handleSearch = () => {
    const filteredData = projectdata.filter(project => {
      // ตรวจสอบชื่อโครงงาน
      const isNameMatch =
        project.project_name_eng.toLowerCase().includes(projectName.toLowerCase()) ||
        project.project_name_th.includes(projectName)

      // ตรวจสอบว่าประเภทโครงงานตรงกับที่เลือกหรือไม่
      const isTypeMatch = selectedProjectType ? String(project.project_type) === String(selectedProjectType) : true

      // ตรวจสอบว่าอาจารย์ที่ปรึกษาตรงกับที่เลือกหรือไม่
      const isAdvisorMatch =
        project.prefix.toLowerCase().includes(projectAdvisor.toLowerCase()) ||
        project.first_name.toLowerCase().includes(projectAdvisor.toLowerCase()) ||
        project.last_name.toLowerCase().includes(projectAdvisor.toLowerCase())

      // ตรวจสอบว่าปีที่จัดทำตรงกับที่เลือกหรือไม่
      const isYearMatch = projectYear ? project.sem_year === parseInt(projectYear, 10) : true

      return isNameMatch && isTypeMatch && isAdvisorMatch && isYearMatch
    })

    setSearchResult(filteredData)
    if (filteredData.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'ไม่พบข้อมูล',
        text: 'ไม่พบโครงการที่ตรงตามเงื่อนไขที่คุณค้นหา'
      })
    }
  }

  return (
    <div>
      <User_navigate_topbar />
      <Grid>
        <HeaderTypography variant='h5' sx={{ m: 5, fontWeight: 'bold' }}>
          {/* ระบบค้นหาโครงการ
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            Project Searching System
          </Typography> */}
        </HeaderTypography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: '75%' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, display: 'flex', justifyContent: 'center', mt: 5 }}>
              ระบบค้นหาโครงการ
            </Typography>
            <CardContent>
              <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  สืบค้นชื่อโครงงาน
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='text'
                  label='ชื่อโครงงาน'
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* Project-Type Select */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id='term-label'>ประเภทของโครงงาน</InputLabel>
                    <Select
                      label='Project-Type'
                      defaultValue=''
                      id='select-04'
                      labelId='Project-Type'
                      onChange={handleProjectTypeChange}
                      value={selectedProjectType}
                    >
                      {projectTypeData && projectTypeData.length > 0 ? (
                        projectTypeData.map(type => (
                          <MenuItem key={type.type_id} value={type.type_id}>
                            {type.type_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Project-year */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type='text'
                    label='ปีที่จัดทำ'
                    value={projectYear}
                    onChange={handleProjectYearChange}
                  />
                </Grid>
                {/* Adviser */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type='text'
                    label='อาจารย์ที่ปรึกษา'
                    value={projectAdvisor}
                    onChange={handleProjectAdvisorChange}
                  />
                </Grid>
              </Grid>

              {/* Search Button */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant='contained' color='primary' startIcon={<SearchIcon />} onClick={handleSearch}>
                  ค้นหาข้อมูล
                </Button>

                <Button
                  variant='outlined'
                  color='warning'
                  sx={{ ml: 2 }}
                  onClick={handleReset}
                  startIcon={<RefreshIcon />}
                >
                  รีเซ็ตข้อมูล
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <Card style={{ width: '75%' }}>
            <CardContent>
              <Box sx={{ height: '100%', width: '100%' }}>
                {isLoading ? (
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.5)',
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      zIndex: 9999
                    }}
                  >
                    <img
                      height='150'
                      src='https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif'
                      alt='Loading...'
                    />
                  </Box>
                ) : projectdata === null || typeof projectdata === 'undefined' ? (
                  <p>No Data</p>
                ) : projectdata.length === 0 ? (
                  <p>No Data</p>
                ) : (
                  <DataGrid
                    rows={searchResult.length > 0 ? searchResult : projectdata}
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
                )}
              </Box>
            </CardContent>
          </Card>
        </div>
        {/*  Detail data Dialog */}
        <Public_project_detail
          open={openDetailDialog}
          handleClose={handleCloseDetailDialog}
          fullWidth
          rowData={selectedRowData}
        />
      </Grid>
      <div style={{ marginTop: '5vh' }}>
        <User_footer />
      </div>
    </div>
  )
}

Dashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Dashboard
