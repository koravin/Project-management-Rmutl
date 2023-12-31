import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Grid
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function CE01Record(projectid, refreshFlag) {
  const projectID = projectid.projectID
  const RefreshFlag = refreshFlag

  // กำหนดตัวแปร
  const [rowdata, setRowData] = useState([]) // ตัวแปรเก็บค่า Row
  console.log('ข้อมูลแถว', rowdata)

  // กำหนดหัว Colum
  const columns = [
    {
      field: 'document_name',
      headerName: 'เวอร์ชันเอกสาร',
      width: 300,
      editable: true
    },
    {
      field: 'Preview_data',
      headerName: 'ดูตัวอย่างเอกสาร',
      width: 150,
      editable: false,
      renderCell: params => (
        <Typography variant='h6' style={{ color: 'pink' }} onClick={() => handlePreview(params.row.document_name)}>
          ...
        </Typography>
      )
    },
    {
      field: 'download_button',
      headerName: 'ดาวน์โหลดเอกสาร',
      width: 180,
      renderCell: params => (
        <Button variant='outlined' onClick={() => handleDownload(params.row.document_name)}>
          ดาวน์โหลด
        </Button>
      )
    }
  ]

  //-------------------เริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ดึงข้อมูลไฟล์เอกสารในฐานข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttype?preproject_id=${projectID}&document_type=CE01`
        )
        console.log(response.data.documentList)

        // สร้างอาเรย์ของ object ที่เข้ากับ DataGrid เพื่อใช้ map row
        const rowData = response.data.documentList.map(document => ({
          id: document.document_id,
          document_name: document.document_name,
          document_type: document.document_type
        }))

        setRowData(rowData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, refreshFlag])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  //----------------------------เริ่มฟังก์ชันดาวโหลดเอกสาร--------------------------//
  const handleDownload = async FileName => {
    const fileName = FileName
    const docType = 'CE01'

    console.log('ชื่อไฟล์', fileName)

    try {
      const downloadResponse = await fetch('/api/download', {
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

  //----------------------------เริ่มฟังก์พรีวิวเอกสาร--------------------------//
  // State to control the preview dialog
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewDocumentUrl, setPreviewDocumentUrl] = useState('')

  // Function to open the preview dialog
  const handlePreview = async FileName => {
    try {
      const previewResponse = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName: FileName, docType: 'CE01' }),
        responseType: 'blob'
      })

      if (previewResponse.ok) {
        const blob = await previewResponse.blob()
        setPreviewDocumentUrl(blob)

        console.log('pdf data', previewDocumentUrl)
      } else {
        console.error('Error fetching document:', downloadResponse.statusText)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
    setPreviewOpen(true)
  }

  // Function to close the preview dialog
  const handleClosePreview = () => {
    setPreviewOpen(false)
    setPreviewDocumentUrl('')
  }

  //----------------------------จบฟังก์พรีวิวเอกสาร--------------------------//

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '80%', borderRadius: 15 }}>
        <Typography
          align='center'
          variant='h6'
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AccessTimeIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> ประวัติการส่งเอกสาร
        </Typography>
        <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
          <Box></Box>
          <Card style={{ width: '80%' }}>
            <DataGrid
              rows={rowdata}
              columns={columns}
              autoHeight
              components={{
                NoRowsOverlay: () => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem',
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Typography variant='h6' color='textSecondary'>
                      ไม่พบข้อมูล
                    </Typography>
                  </div>
                )
              }}
              pageSize={5}
              disableRowSelectionOnClick
            />
          </Card>

          {/* Preview Dialog */}
          <Dialog open={previewOpen} onClose={handleClosePreview} fullWidth maxWidth='md'>
            <DialogTitle>ตัวอย่างเอกสาร</DialogTitle>
            <DialogContent>
              {/* Use an iframe to display the PDF inline */}
              <iframe
                src={previewDocumentUrl ? URL.createObjectURL(previewDocumentUrl) : ''}
                title='PDF Preview'
                width='100%'
                height='600'
                style={{ border: 'none' }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePreview} color='primary'>
                ปิด
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Box>
  )
}
