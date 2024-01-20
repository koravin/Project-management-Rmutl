import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import PersonIcon from '@mui/icons-material/Person'
import CardContent from '@mui/material/CardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'

// Component Import
import Insert_post from './Insert_post'
import ChangStatus_post from './ChangStatus_post'
import Detail_post from './Detail_post'
import Edit_post from './Edit_post'

function Teacher_post() {
  const router = useRouter() // router สร้าง path
  const [refreshData, setRefreshData] = useState(false) // รีตาราง
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])
  const [postdata, setPostData] = useState([])

  //ตัวแปรเช็คสถานะ Loading
  const [isLoading, setIsLoading] = useState(true)

  //----------------------------dialog control Functions---------------------------------//
  const [openInsertDialog, setInsertOpenDialog] = React.useState(false)
  const [openDialogChangStatus, setOpenDialogChangStatus] = React.useState(false)
  const [openDialogDetail, setOpenDialogDetail] = React.useState(false)
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  // useRef สำหรับเก็บค่า openDialog

  // เก็บ State Dialog Insert form
  const openDialogInsertRef = useRef(openInsertDialog)
  openDialogInsertRef.current = openInsertDialog

  // เก็บ State Dialog Chang Status
  const openDialogChangStatusRef = useRef(openDialogChangStatus)
  openDialogChangStatusRef.current = openDialogChangStatus

  // เก็บ State Dialog Detail
  const openDialogDetailRef = useRef(openDialogDetail)
  openDialogDetailRef.current = openDialogDetail

  // เก็บ State Dialog Edit
  const openDialogEditlRef = useRef(openDialogEdit)
  openDialogEditlRef.current = openDialogEdit

  const handleClickOpenInsertDialog = () => {
    setInsertOpenDialog(true)
  }

  const handleCloseInsertDialog = () => {
    setInsertOpenDialog(false)
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
  const handleClickDetailDialog = rowData => {
    setOpenDialogDetail(true)
    setSelectedRowData(rowData)
  }

  const handleCloseDetailDialog = () => {
    setOpenDialogDetail(false)
  }

  // dialog Edit open
  const handleClickEditDialog = rowData => {
    setOpenDialogEdit(true)
    setSelectedRowData(rowData)
  }

  const handleCloseEditDialog = () => {
    setOpenDialogEdit(false)
  }

  //----------------------------End dialog control Functions---------------------------------//

  // ส่งค่าจากแถวไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayProject/ProjectEditForm/?id=${projectId}`)
  }

  const columns = [
    { field: 'header_name', headerName: 'Topic Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'public_relation_status',
      headerName: 'Status',
      width: 120,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์ 'project_status'
        let statusText
        let statusColor
        let bgColor

        if (value === '2') {
          statusText = 'No'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'Yes'
          statusColor = 'white'
          bgColor = '#4caf50'
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
      headerName: 'Detail',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleClickDetailDialog(cellValues.row)} style={{ color: '#4CAF50' }}>
            <VisibilityIcon />
          </Button>
        )
      }
    },
    {
      field: 'Chang Status',
      headerName: 'Chang Status',
      width: 100,
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
      headerName: 'Edit',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleClickEditDialog(cellValues.row)} style={{ color: '#FFC107' }}>
            <EditIcon />
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button
            variant='text'
            onClick={() => handleDeleteSubmit(cellValues.row.public_relations_id)}
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallpost`)
        setPostData(response.data.allpost)
        setIsLoading(false) // หยุด loading เมื่อเสร็จสิ้นการดึงข้อมูล
      } catch (error) {
        console.error(error)
        setIsLoading(false) // หยุด loading ในกรณีเกิดข้อผิดพลาด
      }
    }
    fetchData()
  }, [openInsertDialog, openDialogChangStatus, refreshData])

  // ฟังก์ชันสำหรับ Delete DATA
  const handleDeleteSubmit = public_relations_id => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          public_relations_id: public_relations_id
        }

        if (public_relations_id !== '') {
          axios
            .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/post_delete`, data)
            .then(function (response) {
              console.log(response)

              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })

              setPostData(prevData => prevData.filter(Topic => Topic.public_relations_id !== public_relations_id))
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
          <Typography variant='h5'>Instructor Main Feature</Typography>
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
              title='Post Topic'
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {postdata && postdata.length ? postdata.length : '0'} topic in system
                  </Box>
                </Typography>
              }
            />
          </Card>
        </Grid>
        {/* Header card */}
        {/* Insert New Post */}
        <Button sx={{ height: '20', marginTop: '5vh' }} variant='contained' onClick={handleClickOpenInsertDialog}>
          New Post
        </Button>
        <Button
          sx={{
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
          <RefreshIcon /> refresh
        </Button>
        <Card sx={{ width: '100%', typography: 'body1', mt: 3 }}>
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
                    background: 'rgba(0, 0, 0, 0.5)', // สีพื้นหลังทึบ
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
              ) : postdata === null || typeof postdata === 'undefined' ? (
                <p>No Data</p>
              ) : postdata.length === 0 ? (
                <p>No Data</p>
              ) : (
                <DataGrid
                  rows={postdata}
                  columns={columns}
                  getRowId={row => row.public_relations_id}
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
        {/*  Insert data Dialog */}
        <Insert_post open={openInsertDialog} handleClose={handleCloseInsertDialog} fullWidth />

        {/*  Chang Status Dialog */}
        <ChangStatus_post
          open={openDialogChangStatus}
          handleClose={handleCloseChangStatusDialog}
          fullWidth
          rowData={selectedRowData}
        />

        {/*  Detail Dialog */}
        <Detail_post
          open={openDialogDetail}
          handleClose={handleCloseDetailDialog}
          fullWidth
          rowData={selectedRowData}
        />

        {/*  Edit Dialog */}
        <Edit_post open={openDialogEdit} handleClose={handleCloseEditDialog} fullWidth rowData={selectedRowData} />
      </Grid>
    </div>
  )
}

export default Teacher_post
