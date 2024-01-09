import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'

// import sweetalert2 popup
import Swal from 'sweetalert2'

// Component Import
import Preproject_Detail_Modal from './Preproject_Detail_Modal'
import Preproject_Chang_status_Modal from './Preproject_Chang_status_Modal'

function DisplayPreProject() {
  const router = useRouter() // router สร้าง path
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
    console.log('อัง', rowData)
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

  // ส่งค่าจากแถวไปหน้า Detail
  // const handleDetailClick = projectId => {
  //   router.push(`/pages/BackOffice/DisplayPreProject/PreprojectDetail/?id=${projectId}`)
  // }

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
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    {
      field: 'project_status',
      headerName: 'สถานะโครงงาน',
      width: 200,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์ 'project_status'
        let statusText
        let statusColor
        let bgColor

        if (value === '0') {
          statusText = 'ไม่ผ่าน'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'โครงงานยังไม่ได้รับการอนุมัติ'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '2') {
          statusText = 'ยังไม่ได้ดำเนินการ'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '3') {
          statusText = 'อยู่ระหว่างการดำเนินการ'
          statusColor = 'white'
          bgColor = '#2979ff'
        } else if (value === '4') {
          statusText = 'สามารถสอบได้'
          statusColor = 'white'
          bgColor = '#ff9800'
        } else if (value === '5') {
          statusText = 'ยังไม่ผ่านการสอบ'
          statusColor = 'white'
          bgColor = '#ff9800'
        } else if (value === '6') {
          statusText = 'ผ่านแล้วแต่ยังไม่ได้โอน'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else if (value === '7') {
          statusText = 'โอนแล้ว'
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
    { field: 'YearColum', headerName: 'ปีการศึกษา / เทอม / Sec', width: 200 },
    {
      field: 'Detail',
      headerName: 'Detail',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailClick(cellValues.row.preproject_id)}>
            ...
          </Button>
        )
      }
    },
    {
      field: 'Chang Status',
      headerName: 'Chang Status',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleClickChangStatusDialog(cellValues.row)}>
            ...
          </Button>
        )
      }
    },

    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        const isDisabled = cellValues.row.project_status === '7'

        return (
          <Button variant='text' onClick={() => handleEditClick(cellValues.row.preproject_id)} disabled={isDisabled}>
            {isDisabled ? 'disable' : '...'}
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDeleteSubmit(cellValues.row.preproject_id)}>
            ...
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
        console.log(response.data.data)

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
  }, [openDialogChangStatus])

  return (
    <div>
      <Grid>
        <Typography variant='h6' align='center' sx={{ mb: 10, fontWeight: 'bold' }}>
          ตารางแสดงรายชื่อหัวข้อโครงงาน - วิชาพรีโปรเจค
        </Typography>
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
              rows={projectdata}
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
