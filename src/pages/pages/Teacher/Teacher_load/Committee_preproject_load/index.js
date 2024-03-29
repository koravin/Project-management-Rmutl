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
import RefreshIcon from '@mui/icons-material/Refresh'

// import sweetalert2 popup
import Swal from 'sweetalert2'

// Component Import
import Load_committee_preproject_modal from './Load_committee_preproject_modal'

function Committee_preproject_load({ loadCommitteePreprojectData }) {
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

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'project_code', headerName: 'รหัสโครงงาน', width: 140 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    { field: 'preproject_name_eng', headerName: 'ชื่อโครงงาน(ภาษาอังกฤษ)', width: 300 },
    {
      field: 'sem_year',
      headerName: 'ปี/เทอม/section',
      width: 150,
      renderCell: params => {
        const { sem_year, semester_order, section_name } = params.row

        return `${sem_year}/${semester_order}/${section_name}`
      }
    },
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
    {
      field: 'Detail',
      headerName: 'รายละเอียด',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailClick(cellValues.row.preproject_id)}>
            <VisibilityIcon />
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

  return (
    <div>
      <Button
        sx={{
          marginBottom: '10px',
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
      <Card>
        <CardContent>
          <Grid>
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
              ) : !loadCommitteePreprojectData ? (
                <p>No Data</p>
              ) : loadCommitteePreprojectData.length === 0 ? (
                <p>No Data</p>
              ) : (
                <DataGrid
                  rows={loadCommitteePreprojectData}
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
          </Grid>
        </CardContent>
      </Card>
      {/*  Detail data Dialog */}
      <Load_committee_preproject_modal
        open={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      />
    </div>
  )
}

export default Committee_preproject_load
