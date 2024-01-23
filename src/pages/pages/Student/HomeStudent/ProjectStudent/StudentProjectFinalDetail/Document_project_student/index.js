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
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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

export default function Document_project_student({ project_id }) {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path

  const projectID = project_id

  //ตัวแปรเก็บข้อมูลเอกสาร
  const [getDocType, setGetDocTypeData] = useState('') // รับค่าข้อมูลประเภทเอกสาร
  const [getCHType, setGetCHData] = useState('CH01') // รับค่าข้อมูลประเภทเอกสาร CH
  const [getStudentName, setGetStudentNameData] = useState('') // รับค่าข้อมูลชื่อของนักศึกษา

  const [selectedFile, setSelectedFile] = useState(null) // ตัวแปรเก็บค่าไฟล์ที่อัปโหลด
  const [documentName, setDocumentName] = useState('') // เก็บชื่อเอกสารพร้อมนามสกุลก่อนกดอัปโหลดไฟล์
  const [showFileDetails, setShowFileDetails] = useState(false) // ตัวแปรควบคุมการแสดงรายละเอียดเอกสาร
  const [openFileDialog, setOpenFileDialog] = useState(false) // ตัวแปรควบคุมการเปิดปิด Dialog
  const [fileInputKey, setFileInputKey] = useState(0) // ตัวแปร state สำหรับ key ของ input(ทำให้ input รีค่าใหม่ทึกครั้งที่มีการ อัปโหลดไฟล์)
  const [index, setIndex] = useState('') // ตัวนับเอกสาร
  const [refreshFlag, setRefreshFlag] = useState(true) // ตัวแปรรีค่าทีเซตใน useEffect
  const [Role, setRole] = useState('') // เก็บ Role ผู้ส่ง

  //-------------------------------------------------เริ่มกระบวนการ ฮัปโหลดเอกสาร------------------------------------------//
  //-------------------เริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ดึงข้อมูลโครงงานจาก id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/project?project_id=${projectID}`
        )

        setDocumentName(`${response.data.PreprojectData[0].preproject_name_th}`)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, documentName, getCHType])

  // ดึงข้อมูลไฟล์เอกสารในฐานข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttypeproject?project_id=${projectID}&document_type=[${getCHType}]`
        )

        setIndex(response.data.index)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, refreshFlag, getCHType])

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
    setStudentData('')
    setAdvisorData('')
    setInstructorData('')
    setGetDocTypeData('')
    setGetCHData('')
  }

  // useEffect(() => {
  //   ResetData()
  // }, [getCHType])

  // ฟังก์ชันสำหรับ ส่งเอกสาร
  const handleCHUpload = async () => {
    const docType = getCHType
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    try {
      // ประกอบร่างชื่อใหม่
      const documentNameWithoutSpecialChars = documentName.replace(/[ :]/g, '_') // แทนที่เครื่องหมายพิเศษด้วย _
      const fileExtension = selectedFile.name.split('.').pop() // รับนามสกุลของไฟล์
      //ชื่อไฟล์ใหม่
      const formattedTime = `${hours}_${minutes}_${seconds}`
      const newFilename = `${getCHType}_${documentNameWithoutSpecialChars}_${formattedTime}.${fileExtension}`

      // ส่วนเซฟไฟล์ลงในเครื่อง
      const body = new FormData()
      body.append('file', selectedFile) //ส่งไฟล์เข้า Api
      body.append('newFilename', newFilename) //ส่งชื่อเอกสารเข้าไปใน Api
      // ส่งข้อมูลประเภทเอกสารเข้าไปในหน้า Upload
      body.append('docType', docType) //ส่งชื่อเอกสารเข้าไปใน Api

      const uploadResponse = await fetch('/api/upload_ch', {
        method: 'POST',
        body
      })

      if (!uploadResponse.ok) {
        alert('มีข้อผิดพลาด')

        return // ออกจากฟังก์ชันหลังจากแสดงข้อผิดพลาด
      }

      // ตรวจสอบค่าว่างของ Input ก่อนส่ง
      if (getCHType.length === 0) {
        alert('โปรด ระบุ Type เอกสาร')
        ResetData()

        return
      }

      // ส่วนส่งข้อมูลไปยัง API ภายนอก
      const data = {
        project_id: projectID,
        document_type: getCHType,
        document_name: newFilename
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/uploadprojectdocuments`, data)

        alert('สำเร็จ')

        // ResetData()

        // เมื่ออัปโหลดเสร็จ ให้เปลี่ยนค่า refreshFlag เพื่อให้ useEffect ทำงานใหม่
        setRefreshFlag(prevFlag => !prevFlag) // สลับค่า refreshFlag
      } catch (error) {
        console.error(error)
        alert('error')
      }
    } catch (error) {
      console.error(error)
      alert('error')
    }
  }

  //--------------------------------------------------------------ฟังก์ชันดาวน์โหลดเอกสาร--------------------------------------------------//
  // กำหนดตัวแปร
  const [rowdata, setRowData] = useState([]) // ตัวแปรเก็บค่า Row

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
        <Button variant='h6' style={{ color: 'pink' }} onClick={() => handlePreview(params.row.document_name)}>
          ...
        </Button>
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
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttypeproject?project_id=${projectID}&document_type=${getCHType}`
        )

        setRowData(response.data.documentList)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, refreshFlag, getCHType])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  //----------------------------เริ่มฟังก์ชันดาวโหลดเอกสาร--------------------------//
  const handleDownload = async FileName => {
    const fileName = FileName
    const docType = getCHType

    try {
      const downloadResponse = await fetch('/api/download_ch', {
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
      const previewResponse = await fetch('/api/download_ch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName: FileName, docType: getCHType }),
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

  //---------------------------------ฟังก์ชันระบุ Role ผู้ส่ง------------------------------------//
  const [studentData, setStudentData] = useState('') // เก็บค่าข้อมูลนักศึกษา
  const [advisor, setAdvisorData] = useState('') // เก็บค่าข้อมูลอาจารที่ปรึกษา
  const [instructor, setInstructorData] = useState([]) // เก็บค่าข้อมูลอาจารย์

  //ตัวแปรรับข้อมูล
  const [getStudentData, setGetStudentData] = useState('') // รับค่าข้อมูลนักศึกษา
  const [getAdvisor, setGetAdvisorData] = useState('') // รับค่าข้อมูลอาจารที่ปรึกษา
  const [getInstructor, setGetInstructorData] = useState([]) // รับค่าข้อมูลอาจารย์

  // ตัวแปรเก็บค่า description
  const [description, setDescriptionData] = useState('')

  // เก็บข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttype?preproject_id=${projectID}&document_type=${getCHType}`
        )

        setGetStudentData(response.data.students)
        setGetAdvisorData(response.data.adviser)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, getCHType])

  // เซตข้อมูลลง Role และ description
  useEffect(() => {
    // กำหนด Role ก่อนส่ง
    // s = student
    // i = instructor
    // a = advisor
    // c = committee

    if (instructor) {
      setRole('i')
    } else if (studentData) {
      setRole('s')
    } else if (advisor) {
      setRole('a')
    }

    // เซตค่า description โดยรวมค่าของ getDocType และ getCHType
    const combinedDescription = getCHType + ' ' + getDocType + ' ' + getStudentName
    setDescriptionData(combinedDescription)
  }, [advisor, instructor, studentData, getDocType, getCHType, getStudentName])

  //---------ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown---------//

  const handleStudentChange = event => {
    setStudentData(event.target.value)
    const selectedStudent = getStudentData.find(student => student.student_id === event.target.value)

    if (selectedStudent) {
      const fullName = `${selectedStudent.studen_first_name} ${selectedStudent.studen_last_name}`
      setGetStudentNameData(fullName)
    }
  }

  const handleAdvisorChange = event => {
    setAdvisorData(event.target.value)
  }

  const handleDoctypeChange = event => {
    setGetDocTypeData(event.target.value)

    // เพิ่มเงื่อนไข: ถ้า selectedValue มีค่าเป็น 'เอกสารแบบกลุ่ม' ให้กำหนด setStudentData เป็นค่าว่าง
    if (event.target.value === 'เอกสารแบบกลุ่ม') {
      setStudentData('')
      setGetStudentNameData('')

      // setGetStudentData('')
    }
  }

  const handleCHTypeChange = event => {
    setGetCHData(event.target.value)
    setRefreshFlag(prevFlag => !prevFlag)
  }

  //---------จบ ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown---------//

  //---------------------------------จบฟังก์ชันระบุ Role ผู้ส่ง------------------------------------//

  return (
    <div>
      {/* ฟังก์ชันระบุ Roleและเลือกผู้ส่งเอกสาร  */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ mb: 0.5, borderRadius: 2, width: '70%' }}>
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
            <AccountCircleIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> ระบุ Type เอกสาร
          </Typography>
          <CardContent>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* เลือกประเภทเอกสาร */}
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id='getCHType-label'>ระบุ Type เอกสาร</InputLabel>
                  <Select
                    labelId='getCHType-label'
                    id='getCHType-select'
                    value={getCHType}
                    label='getCHType'
                    onChange={handleCHTypeChange}
                  >
                    <MenuItem value={'CH01'}>CH01</MenuItem>
                    <MenuItem value={'CH02'}>CH02</MenuItem>
                    <MenuItem value={'CH03'}>CH03</MenuItem>
                    <MenuItem value={'CH04'}>CH04</MenuItem>
                    <MenuItem value={'CH05'}>CH05</MenuItem>
                    <MenuItem value={'CH06'}>CH06</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

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
                  rows={rowdata || []} // ถ้า rowdata เป็น null หรือ undefined จะให้กำหนดให้เป็น empty array
                  columns={columns}
                  getRowId={row => row.document_id}
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
                          {!rowdata || rowdata.length === 0 ? 'Nodata' : 'ไม่พบข้อมูล'}
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
              <PostAddIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> อัปโหลดเอกสาร
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
          </Card>
        </Box>
      </Box>
    </div>
  )
}
