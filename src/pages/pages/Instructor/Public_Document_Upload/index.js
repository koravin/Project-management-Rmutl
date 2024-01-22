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
import PublicIcon from '@mui/icons-material/Public'
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'

// Component Import
import Upload_public_Document from './Upload_public_Document'

function Public_Document_Upload() {
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

  //----------------------------End dialog control Functions---------------------------------//

  // ส่งค่าจากแถวไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayProject/ProjectEditForm/?id=${projectId}`)
  }

  const columns = [
    { field: 'project_code', headerName: 'รหัสโครงงาน', width: 120 },
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
      field: 'Upload',
      headerName: 'อัปโหลด',
      width: 60,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailDataClick(cellValues.row.project_id)}>
            <FolderIcon />
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallprojectrecommend`)
        setProjectData(response.data.projectlist)
        setIsLoading(false) // หยุด loading เมื่อเสร็จสิ้นการดึงข้อมูล
      } catch (error) {
        console.error(error)
        setIsLoading(false) // หยุด loading ในกรณีเกิดข้อผิดพลาด
      }
    }
    fetchData()
  }, [openDialogChangStatus])

  // ส่งค่าจากแถวไปหน้า Detail
  const handleDetailClick = projectId => {
    router.push(`/pages/BackOffice/DisplayProject/ProjectDetail/?id=${projectId}`)
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
          project_id: projectId
        }

        if (projectId !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}api/project-mgt/deleteproject`, data)
            .then(function (response) {
              console.log(response)

              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })

              setProjectData(prevData => prevData.filter(project => project.project_id !== projectId))
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

  return (
    <div>
      <Grid>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>เอกสารเผยแพร่</Typography>
        </Grid>

        {/* Header card */}
        <Grid style={{ width: '100%', marginBottom: '25px' }}>
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
              <PublicIcon
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
              title={<span style={{ color: 'white' }}>อัปโหลดเอกสารสารธารณะ</span>}
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'white' }}>
                    {projectdata && projectdata.length ? projectdata.length : '0'} โครงงานในระบบ
                  </Box>
                </Typography>
              }
            />
          </Card>
        </Grid>
        {/* Header card */}

        <Typography variant='h6' sx={{ mb: 5, fontWeight: 'bold' }}>
          ตารางแสดงรายชื่อหัวข้อโครงงาน - ที่ผ่านการสอบ
        </Typography>

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
                  rows={projectdata}
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
        {/*  Detail data Dialog */}
        <Upload_public_Document
          open={openDetailDialog}
          handleClose={handleCloseDetailDialog}
          fullWidth
          rowData={selectedRowData}
        />
      </Grid>
    </div>
  )
}

export default Public_Document_Upload
