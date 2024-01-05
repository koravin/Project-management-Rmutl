import React, { useState, useEffect } from 'react'
import axios from 'axios'

// mui import
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { Card, CardContent, DialogContent, DialogTitle, DialogActions, Box, Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PostAddIcon from '@mui/icons-material/PostAdd'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { DataGrid } from '@mui/x-data-grid'
import { Margin } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024 // กำหนดขาดสูดของไฟล์ที่อัปโหลดเป็น 1GB

const ACCEPTED_FILE_TYPES = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
] // กำหนด fix ประเภทไฟล์

const WhiteBlackButton = styled(Button)({
  background: 'linear-gradient(to bottom, white, white)',
  color: 'black',
  border: '2px solid black',
  '&:hover': {
    background: 'linear-gradient(to bottom, white, white)',
    color: 'black',
    border: '2px solid black'
  }
})

export default function ProjectFormUpload({ open, handleClose, rowData }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path
  const DocumentType = rowData?.ch_type || 'CH01'

  console.log('rowData', rowData)

  // เก็บค่าจาก Props ลงในตัวแปร
  const projectId = router.query.id // อ่านค่า query parameter "id" จาก URL
  const projectID = projectId

  const [selectedFile, setSelectedFile] = useState(null) // ตัวแปรเก็บค่าไฟล์ที่อัปโหลด
  const [documentName, setDocumentName] = useState('') // เก็บชื่อเอกสารพร้อมนามสกุลก่อนกดอัปโหลดไฟล์
  const [showFileDetails, setShowFileDetails] = useState(false) // ตัวแปรควบคุมการแสดงรายละเอียดเอกสาร
  const [openFileDialog, setOpenFileDialog] = useState(false) // ตัวแปรควบคุมการเปิดปิด Dialog
  const [fileInputKey, setFileInputKey] = useState(0) // ตัวแปร state สำหรับ key ของ input(ทำให้ input รีค่าใหม่ทึกครั้งที่มีการ อัปโหลดไฟล์)
  const [index, setIndex] = useState('') // ตัวนับเอกสาร
  const [refreshFlag, setRefreshFlag] = useState(true) // ตัวแปรรีค่าทีเซตใน useEffect

  console.log('documentName', documentName)

  //รีเซ็ตตข้อมูลใหม่ทุกครั้งที่มีการ เปิด/ปิก analog
  const resetForm = () => {
    setSelectedFile(null)
    setDocumentName('')
    setShowFileDetails(false)
    setOpenFileDialog(false)
    setFileInputKey(prevKey => prevKey + 1)
    setIndex('')
    setRefreshFlag(prevFlag => !prevFlag)
  }

  useEffect(() => {
    if (open) {
      resetForm()
    }
  }, [open])

  //-------------------เริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ตั้งชื่อเอกสาร
  useEffect(() => {
    const currentDate = new Date()

    if (rowData && rowData.ch_type) {
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`

      const Nametrash = `${rowData.ch_type}_${formattedDate}`
      console.log('Nametrash', Nametrash)
      setDocumentName(Nametrash)
    }
  }, [rowData])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ฟังก์ชันเก็บค่าไฟลที่อัปโหลด
  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // alert('ขนาดไฟล์เกิน 1GB')
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ขนาดไฟล์เกิน 1GB'
        })
      } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        // alert('อนุญาตเฉพาะไฟล์ docx, doc, imag, pdf, mp4 และไฟล์นำเสนอ powerpoint เท่านั้น')
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'อนุญาตเฉพาะไฟล์ docx, doc, imag, pdf, mp4 และไฟล์นำเสนอ powerpoint เท่านั้น'
        })
      } else {
        setSelectedFile(file)

        // setDocumentType(file.type)
        const i = event.target.files[0]

        // เปลี่ยนค่า key เพื่อให้ React ทำการสร้าง input ใหม่
        setFileInputKey(prevKey => prevKey + 1)
      }
    }
  }

  // ฟังชันควบคุม การแสดง รายละเอียดไฟล์
  const toggleFileDetails = () => {
    setShowFileDetails(!showFileDetails)
  }

  const toggleFileDetailsClose = () => {
    setShowFileDetails(false) // Hide details
  }

  // ฟังก์ชัน ควบคุมการเปิด/ปิด Dialog
  const handleOpenFileDialog = () => {
    toggleFileDetailsClose() // Close file details if open
    setOpenFileDialog(true)
  }

  // ฟังก์ชัน รีเซตข้อมูล
  const ResetData = () => {
    setShowFileDetails(false)
    setSelectedFile(null)
  }

  // ฟังก์ชันสำหรับ ส่งแบบฟอร์มเอกสาร CE
  const handleCHUpload = async () => {
    const docType = rowData.ch_type
    try {
      // ประกอบร่างชื่อใหม่
      const documentNameWithoutSpecialChars = documentName.replace(/[ :]/g, '_') // แทนที่เครื่องหมายพิเศษด้วย _
      const fileExtension = selectedFile.name.split('.').pop() // รับนามสกุลของไฟล์
      //ชื่อไฟล์ใหม่
      const newFilename = `${documentNameWithoutSpecialChars}.${fileExtension}`

      // ส่วนเซฟไฟล์ลงในเครื่อง
      const body = new FormData()
      body.append('file', selectedFile) //ส่งไฟล์เข้า Api
      body.append('newFilename', newFilename) //ส่งชื่อเอกสารเข้าไปใน Api

      // ส่งข้อมูลประเภทเอกสารเข้าไปในหน้า Upload
      body.append('docType', docType) //ส่งชื่อเอกสารเข้าไปใน Api

      const uploadResponse = await fetch('/api/upload_form_ch', {
        method: 'POST',
        body
      })

      if (!uploadResponse.ok) {
        Swal.fire({
          icon: 'error',
          title: 'มีข้อผิดพลาดเกิดขึ้นนะจ๊ะคนดี'
        })

        return // ออกจากฟังก์ชันหลังจากแสดงข้อผิดพลาด
      }

      // ส่วนส่งข้อมูลไปยัง API ภายนอก
      const data = {
        ch_type: rowData?.ch_type,
        ch_file_name: newFilename
      }

      console.log('Upload data', data)
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/insert_new_document_ch`, data)
        console.log('อัปโหลดไฟล์', response.data)
        alert('Success')

        // Swal.fire({
        //   icon: 'success',
        //   title: 'อัปโหลดข้อมูลแล้วเสร็จ'
        // })

        // เมื่ออัปโหลดเสร็จ ให้เปลี่ยนค่า refreshFlag เพื่อให้ useEffect ทำงานใหม่
        setRefreshFlag(prevFlag => !prevFlag) // สลับค่า refreshFlag
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการอัปโหลดข้อมูล'
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'มีข้อผิดพลาดเกิดขึ้น'
      })
    }
  }

  //--------------------------------------------------------------ฟังก์ชันดาวน์โหลดเอกสาร--------------------------------------------------//
  // กำหนดตัวแปร
  const [documentData, setDocumentData] = useState([]) // ตัวแปรเก็บค่า Row

  // กำหนดหัว Colum
  const columns = [
    {
      field: 'ch_file_name',
      headerName: 'เวอร์ชันเอกสาร',
      width: 300,
      editable: true
    },
    {
      field: 'ch_status',
      headerName: 'สถานะเอกสาร',
      width: 120,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์
        let statusText
        let statusColor
        let bgColor

        if (value === 0) {
          statusText = 'Unactive'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === 1) {
          statusText = 'Active'
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
      field: 'Preview_data',
      headerName: 'ดูตัวอย่างเอกสาร',
      width: 150,
      editable: false,
      renderCell: params => (
        <Button variant='h6' style={{ color: 'pink' }} onClick={() => handlePreview(params.row.ch_file_name)}>
          ...
        </Button>
      )
    },
    {
      field: 'download_button',
      headerName: 'ดาวน์โหลดเอกสาร',
      width: 180,
      renderCell: params => (
        <Button variant='outlined' onClick={() => handleDownload(params.row.ch_file_name)}>
          ดาวน์โหลด
        </Button>
      )
    },
    {
      field: 'Active_Button',
      headerName: 'Active',
      width: 100,
      renderCell: params => (
        <Button
          variant='outlined'
          onClick={() => ActiveDocument(params.row.ch_doc_id)}
          style={{ color: '#4CAF50', borderColor: '#4CAF50' }}
        >
          Active
        </Button>
      )
    },
    {
      field: 'Unactive_Button',
      headerName: 'Unactive',
      width: 100,
      renderCell: params => (
        <Button
          variant='outlined'
          onClick={() => UnactiveDocument(params.row.ch_doc_id)}
          style={{ color: '#FF0000', borderColor: '#FF0000' }}
        >
          Unactive
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
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getall_GD_documenttemplate?document_type=${DocumentType}`
        )
        console.log('นํ้าแข็งไส', response.data.data)

        setDocumentData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [refreshFlag, DocumentType])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  //----------------------------เริ่มฟังก์ชันดาวโหลดเอกสาร--------------------------//
  const handleDownload = async FileName => {
    const fileName = FileName
    const docType = DocumentType

    console.log('ชื่อใหม่', fileName)
    console.log('ประเภทเอกสาร', docType)

    try {
      const downloadResponse = await fetch('/api/download_form_ch', {
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
      const previewResponse = await fetch('/api/download_form_ch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName: FileName, docType: DocumentType }),
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

  //--------------------------------------------------------------จบฟังก์ชันดาวน์โหลดเอกสาร--------------------------------------------------//

  console.log('Document type', DocumentType)
  console.log('Document dataxxxx', documentData)

  //---------------------------------------------------------------//
  // ฟังชัน Active Document
  const ActiveDocument = async ch_doc_id => {
    const data = {
      ch_doc_id: ch_doc_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/activecedocument_ch`, data)

      alert('Success')

      // เมื่ออัปโหลดเสร็จ ให้เปลี่ยนค่า refreshFlag เพื่อให้ useEffect ทำงานใหม่
      setRefreshFlag(prevFlag => !prevFlag) // สลับค่า refreshFlag
    } catch (error) {
      console.error(error)
      alert('Error')
    }
  }

  // ฟังชัน Unactive Document
  const UnactiveDocument = async ch_doc_id => {
    const data = {
      ch_doc_id: ch_doc_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/unactivecedocument_ch`, data)

      alert('Success')

      // เมื่ออัปโหลดเสร็จ ให้เปลี่ยนค่า refreshFlag เพื่อให้ useEffect ทำงานใหม่
      setRefreshFlag(prevFlag => !prevFlag) // สลับค่า refreshFlag
    } catch (error) {
      console.error(error)
      alert('Error')
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{ margin: '5vh', borderRadius: '10px' }}
        PaperProps={{
          style: {
            borderRadius: '10px'
          }
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Document form {rowData?.ch_type}
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            margin: '15px',
            padding: '5vh',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '10px'
          }}
        >
          {/* ตารางการส่งเอกสาร */}
          <Box
            sx={{
              mt: 10,
              display: 'flex',
              justifyContent: 'center',
              marginRight: '5vh'
            }}
          >
            <Card style={{ width: '100%', borderRadius: 15 }}>
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
                <Card style={{ width: '100%', maxWidth: '90vh' }}>
                  <DataGrid
                    rows={documentData}
                    columns={columns}
                    getRowId={row => row.ch_doc_id}
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
          {/* Upload Document content */}
          <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
            <Card style={{ width: '100%', borderRadius: 15, maxHeight: '50vh' }}>
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
                <PostAddIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> อัปโหลดเอกสาร {rowData?.ch_type}
              </Typography>
              <CardContent align='center'>
                <Grid container direction='row' justifyContent='center'>
                  <Grid justifyContent='center'>
                    <input
                      key={fileInputKey} // ใช้ค่า key เพื่อให้ input รีเซ็ตเมื่อมีการอัปโหลด
                      type='file'
                      id='file-upload'
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor='file-upload'>
                      <WhiteBlackButton
                        variant='contained'
                        color='primary'
                        component='span'
                        onClick={toggleFileDetailsClose}
                        startIcon={<CloudUploadIcon />}
                      >
                        อัปโหลดไฟล์
                      </WhiteBlackButton>
                    </label>
                  </Grid>
                  <Grid justifyContent='center'>
                    <WhiteBlackButton
                      style={{ marginLeft: 2 }}
                      variant='contained'
                      color='primary'
                      endIcon={<SendIcon />}
                      disabled={!selectedFile}
                      onClick={() => {
                        handleCHUpload()
                        setRefreshFlag(prevFlag => !prevFlag) // เรียกใช้ useEffect ใน CE01Record
                      }}
                    >
                      ส่ง
                    </WhiteBlackButton>
                  </Grid>
                </Grid>

                <div>
                  <Button
                    variant='contained'
                    style={{ marginTop: 10 }}
                    onClick={toggleFileDetails}
                    disabled={!selectedFile}
                  >
                    ดูรายละเอียดเอกสารที่อัปโหลด
                  </Button>
                </div>

                {showFileDetails && selectedFile && (
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <div>
                        <Typography variant='subtitle1'>รายละเอียดไฟล์ </Typography>
                        <Typography>ชื่อไฟล์: {selectedFile.name}</Typography>
                        <Typography>ขนาดไฟล์: {selectedFile.size} bytes</Typography>
                        <Typography>ประเภทไฟล์: {selectedFile.type || 'ไม่ทราบ'}</Typography>
                        <WhiteBlackButton style={{ marginTop: 5 }} onClick={handleOpenFileDialog}>
                          ดูตัวอย่างไฟล์
                        </WhiteBlackButton>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Dialog open={openFileDialog} onClose={() => setOpenFileDialog(false)} fullWidth maxWidth='md'>
                  <DialogTitle>ตัวอย่างไฟล์</DialogTitle>
                  <DialogContent>
                    <iframe
                      src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                      title='File Preview'
                      width='100%'
                      height='450vh'
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenFileDialog(false)}>ปิด</Button>
                  </DialogActions>
                </Dialog>
              </CardContent>

              {/* Action Button */}
              <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '5vh' }}>
                <Button size='large' color='warning' variant='outlined' style={{ marginTop: 10 }} onClick={ResetData}>
                  รีเซ็ตข้อมูล
                </Button>
                <Button
                  size='large'
                  color='error'
                  variant='outlined'
                  style={{ marginTop: 10, marginLeft: 5 }}
                  onClick={handleClose}
                >
                  ย้อนกลับ
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}
