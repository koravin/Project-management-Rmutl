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
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'

// import sweetalert2 popup
import Swal from 'sweetalert2'

// Component Import
import Preproject_Detail_Modal from './Preproject_Detail_Modal'
import Preproject_Chang_status_Modal from './Preproject_Chang_status_Modal'

function DisplayPreProject() {
  const router = useRouter() // router สร้าง path
  const [refreshData, setRefreshData] = useState(false) // รีตาราง
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])

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

  // dialog Detail open
  const handleDetailClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  //----------------------------End dialog control Functions---------------------------------//

  // ส่งค่าจากแถวไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayPreProject/PreprojectEditForm/?id=${projectId}`)
  }

  // ฟังก์ชันสำหรับ Delete DATA
  const handleDeleteSubmit = projectId => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          preproject_id: projectId
        }

        if (projectId !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}api/project-mgt/deletepreproject`, data)
            .then(function (response) {
              console.log(response)

              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })

              setProjectData(prevData => prevData.filter(project => project.preproject_id !== projectId))
            })
            .catch(function (error) {
              console.log(error)

              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถลบข้อมูลได้'
              })
            })
        } else {
          console.log('not have any id to delete')
        }
      } else if (result.isDenied) {
        console.log('cancelled delete')
      }
    })
  }

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'project_code', headerName: 'ID', width: 120 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 280 },
    {
      field: 'project_status',
      headerName: 'สถานะโครงงาน',
      width: 200,
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
    { field: 'YearColum', headerName: 'ปีการศึกษา/เทอม/Sec', width: 150 },
    {
      field: 'Detail',
      headerName: 'รายละเอียด',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button
            variant='text'
            onClick={() => handleDetailClick(cellValues.row.preproject_id)}
            style={{ color: '#4CAF50' }}
          >
            <VisibilityIcon />
          </Button>
        )
      }
    },
    {
      field: 'Chang Status',
      headerName: 'สถานะ',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button
            variant='text'
            onClick={() => handleClickChangStatusDialog(cellValues.row)}
            style={{ color: '#2196F3' }}
          >
            <SyncIcon />
          </Button>
        )
      }
    },

    {
      field: 'Edit',
      headerName: 'แก้ไข',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        const isDisabled = cellValues.row.project_status === '7'

        return (
          <Button
            variant='text'
            onClick={() => handleEditClick(cellValues.row.preproject_id)}
            disabled={isDisabled}
            style={{ color: '#FFC107' }}
          >
            {isDisabled ? 'disable' : <EditIcon />}
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'ลบ',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button
            variant='text'
            onClick={() => handleDeleteSubmit(cellValues.row.preproject_id)}
            style={{ color: '#F44336' }}
          >
            <DeleteIcon />
          </Button>
        )
      }
    }
  ]

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true) // เริ่มต้น loading
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preprojects`)

        const projects = response.data.data.map(project => ({
          ...project,
          YearColum: `${project.sem_year}/${project.semester_order}/${project.section_name}`
        }))
        setProjectData(projects)
        setIsLoading(false) // หยุด loading เมื่อเสร็จสิ้นการดึงข้อมูล
      } catch (error) {
        console.error(error)
        setIsLoading(false) // หยุด loading ในกรณีเกิดข้อผิดพลาด
      }
    }
    fetchData()
  }, [openDialogChangStatus, refreshData])

  //==================================================== search student projects ============================================//
  const [student, setStudent] = useState([])
  const [selectedValueStudent, setSelectedValueStudent] = useState('') // เก็บค่า Student ที่เลือก

  const [selectStudent, setSelectStudent] = useState([])

  const getOptionLabel = option => {
    return option ? `${option.prefix} ${option.first_name} ${option.last_name} ${option.id_rmutl}` : ''
  }

  const handleStudentChange = (_, value) => {
    setSelectedValueStudent(value)
  }

  // api student call
  // ดึงข้อมูล นักเรียนจาก Api
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/students`)
        const studentData = response.data.data || []
        setStudent(studentData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudentData()
  }, [])

  const handleSearch = async () => {
    const idstudent = selectedValueStudent.student_id
    setProjectData('')
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallpreprojectbystudentid?student_id=${idstudent}`
      )

      console.log('ข้อมูลโครงงานเดี่ยว', response.data.Preproject_data)

      // console.log('ข้อมูลโครงงานเดี่ยว 2', response.data.Projoject_data)

      const projects = response.data.Preproject_data.map(project => ({
        ...project,
        YearColum: `${project.sem_year}/${project.semester_order}/${project.section_name}`
      }))
      setProjectData(projects)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Grid>
        {/* ปุ่ม Insert project */}
        <Button
          sx={{ marginBottom: '10px', width: '15vh', height: '20' }}
          variant='contained'
          onClick={() => {
            router.push(`/pages/BackOffice/DisplayPreProject/PreprojectInsertForm/`)
          }}
        >
          เพิ่มข้อมูล
        </Button>

        {/* ปุ่ม Refresh */}
        <Button
          sx={{
            marginBottom: '10px',
            marginLeft: '5px',
            width: '15vh',
            height: '20',
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

        <div style={{ marginTop: '5px', marginBottom: '15px', width: '70vh' }}>
          <Card>
            <CardContent
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}
            >
              <FormControl fullWidth>
                <Autocomplete
                  id='student-label'
                  value={selectedValueStudent === '' ? null : selectedValueStudent}
                  onChange={handleStudentChange}
                  options={student}
                  getOptionLabel={getOptionLabel}
                  renderInput={params => <TextField {...params} label='ชื่อนักศึกษา' />}
                />
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ width: 'auto', height: '7vh', marginLeft: '5px' }}
              >
                ค้นหา
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
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
                    position: 'fixed', // ติดตรงกลางหน้าจอ
                    top: 0,
                    left: 0,
                    zIndex: 9999 // ให้แสดงหน้าทับทุกอย่าง
                  }}
                >
                  <img
                    height='150'
                    src='https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif'
                    alt='Loading...'
                  />
                </Box>
              ) : projectdata.length === 0 ? (
                <p>No Data</p>
              ) : (
                <DataGrid
                  rows={projectdata || ''}
                  columns={columns}
                  getRowId={row => row.preproject_id}
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
      </Grid>
      {/*  Detail data Dialog */}
      <Preproject_Detail_Modal
        open={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      />

      {/*  Chang Status Dialog */}
      <Preproject_Chang_status_Modal
        open={openDialogChangStatus}
        handleClose={handleCloseChangStatusDialog}
        fullWidth
        rowData={selectedRowData}
      />
    </div>
  )
}

export default DisplayPreProject
