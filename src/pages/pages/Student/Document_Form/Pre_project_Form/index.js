import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import DownloadIcon from '@mui/icons-material/Download'

// import sweetalert2 popup
import Swal from 'sweetalert2'

// Component Import
// import StudentProjectDetail from './StudentProjectDetail'

function Pre_project_Form() {
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

  // dialog Detail open
  const handleDetailClick = rowData => {
    handleClickOpenDetailDialog()
    setSelectedRowData(rowData)
  }

  //----------------------------End dialog control Functions---------------------------------//

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'ce_type', headerName: 'ประเภทเอกสาร', width: 120 },
    { field: 'ce_file_name', headerName: 'ชื่อเอกสาร', width: 300 },
    {
      field: 'last_updated',
      headerName: 'อัปเดทล่าสุด',
      width: 300,
      renderCell: params => (
        <span>
          {new Date(params.value).toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          })}
        </span>
      )
    },

    {
      field: 'Download',
      headerName: 'ดาวน์โหลด',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDownload(cellValues.row.ce_file_name, cellValues.row.ce_type)}>
            <DownloadIcon />
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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallformdocument_ce`)

        setProjectData(response.data.data)
        setIsLoading(false) // หยุด loading เมื่อเสร็จสิ้นการดึงข้อมูล
      } catch (error) {
        console.error(error)
        setIsLoading(false) // หยุด loading ในกรณีเกิดข้อผิดพลาด
      }
    }
    fetchData()
  }, [])

  //----------------------------เริ่มฟังก์ชันดาวโหลดเอกสาร--------------------------//
  const handleDownload = async (FileName, DocumentType) => {
    const fileName = FileName
    const docType = DocumentType

    try {
      const downloadResponse = await fetch('/api/download_form_ce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName, docType }),
        responseType: 'blob' // Indicate that the response should be treated as binary data
      })

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob()
        const blobUrl = URL.createObjectURL(blob)

        // Create a download link and initiate the download
        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = fileName
        downloadLink.click()

        // Clean up the object URL after the download is initiated
        URL.revokeObjectURL(blobUrl)

        console.log('Download initiated')
      } else {
        console.error('Error downloading document:', downloadResponse.statusText)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  //----------------------------จบฟังก์ชันดาวโหลดเอกสาร--------------------------//

  return (
    <div>
      <Grid>
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
                  rows={projectdata}
                  columns={columns}
                  getRowId={row => row.ce_doc_id}
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
      {/* <StudentProjectDetail
        open={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        fullWidth
        rowData={selectedRowData}
      /> */}
    </div>
  )
}

export default Pre_project_Form
