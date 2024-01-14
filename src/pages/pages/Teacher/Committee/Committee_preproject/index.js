import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'

// import sweetalert2 popup
import Swal from 'sweetalert2'

// Component Import
import Committee_project_detail from './Committee_project_detail'

function Committee_preproject() {
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

  // dialog Detail open
  const handleDetailClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  //----------------------------End dialog control Functions---------------------------------//

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'project_code', headerName: 'Pre-project Code', width: 140 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    { field: 'preproject_name_eng', headerName: 'ชื่อโครงงาน(ภาษาอังกฤษ)', width: 300 },
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
    }
  ]

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject_readytest`)
        setProjectData(response.data.last_result)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [openDialogChangStatus])

  return (
    <div>
      <Card>
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
            ) : projectdata && projectdata.length === 0 ? (
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
      </Card>
      {/*  Detail data Dialog */}
      <Committee_project_detail
        open={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      />
    </div>
  )
}

export default Committee_preproject
