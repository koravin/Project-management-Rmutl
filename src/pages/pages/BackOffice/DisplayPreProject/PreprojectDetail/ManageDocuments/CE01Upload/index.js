import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PostAddIcon from '@mui/icons-material/PostAdd'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

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

const CE01Upload = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // router สร้าง path

  // เก็บค่าจาก Props ลงในตัวแปร
  const projectId = router.query.id // อ่านค่า query parameter "id" จาก URL
  const projectID = projectId

  console.log('รหัสโครงการหน้า Upload', projectID)

  const [selectedFile, setSelectedFile] = useState(null) // ตัวแปรเก็บค่าไฟล์ที่อัปโหลด
  const [documentName, setDocumentName] = useState('') // เก็บชื่อเอกสารพร้อมนามสกุลก่อนกดอัปโหลดไฟล์
  const [showFileDetails, setShowFileDetails] = useState(false) // ตัวแปรควบคุมการแสดงรายละเอียดเอกสาร
  const [openFileDialog, setOpenFileDialog] = useState(false) // ตัวแปรควบคุมการเปิดปิด Dialog
  const [fileInputKey, setFileInputKey] = useState(0) // ตัวแปร state สำหรับ key ของ input(ทำให้ input รีค่าใหม่ทึกครั้งที่มีการ อัปโหลดไฟล์)
  const [index, setIndex] = useState('') // ตัวนับเอกสาร
  const [refreshFlag, setRefreshFlag] = useState(true) // ตัวแปรรีค่าทีเซตใน useEffect

  // console.log('ค่า refreshFlag:', selectedFile.name)

  //-------------------เริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ดึงข้อมูลโครงงานจาก id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=${projectID}`
        )

        // console.log('ข้อมูลโครงงาน', response.data)
        setDocumentName('CE01_' + response.data.PreprojectData[0].preproject_name_th)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, documentName])

  // ดึงข้อมูลไฟล์เอกสารในฐานข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttype?preproject_id=${projectID}&document_type=CE01`
        )

        // console.log('ข้อมูลเอกสาร', response.data)
        // console.log('ข้อมูลIndex', response.data.index)

        // สร้างอาเรย์ของ object ที่เข้ากับ DataGrid เพื่อใช้ map row
        const rowData = response.data.documentList.map(document => ({
          id: document.document_id,
          document_name: document.document_name,
          document_type: document.document_type
        }))

        setRowData(rowData)
        setIndex(response.data.index)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, refreshFlag])

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

  // ฟังก์ชันสำหรับ ส่งเอกสาร CE01
  const handleCE01Upload = async () => {
    try {
      // ประกอบร่างชื่อใหม่
      const documentNameWithoutSpecialChars = documentName.replace(/[ :]/g, '_') // แทนที่เครื่องหมายพิเศษด้วย _
      const fileExtension = selectedFile.name.split('.').pop() // รับนามสกุลของไฟล์
      //ชื่อไฟล์ใหม่
      const Countindex = parseInt(index) // รับค่า index เป็นตัวเลขและแปลงเป็นจำนวนเต็ม
      const newFilename = `${documentNameWithoutSpecialChars}_${Countindex + 1}.${fileExtension}`

      // ส่วนเซฟไฟล์ลงในเครื่อง
      const body = new FormData()
      body.append('file', selectedFile) //ส่งไฟล์เข้า Api
      body.append('newFilename', newFilename) //ส่งชื่อเอกสารเข้าไปใน Api

      const uploadResponse = await fetch('/api/upload', {
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
        preproject_id: projectID,
        document_type: 'CE01',
        document_name: newFilename,
        document_owner: '0'
      }
      setRefreshFlag(Date.now())

      // console.log(data)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/uploadpreprojectdocuments`,
          data
        )

        Swal.fire({
          icon: 'success',
          title: 'อัปโหลดข้อมูลแล้วเสร็จ'
        })

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

  //-------------------------ส่วนของการ Download เอกสาร--------------------//
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
      field: 'download_button',
      headerName: 'ดาวน์โหลดเอกสาร',
      width: 180,
      renderCell: params => (
        <Button variant='outlined' onClick={() => handleDownload(params.row.id)}>
          ดาวน์โหลด
        </Button>
      )
    }
  ]

  // ฟังก์ชันดาวโหลดเอกสาร
  const handleDownload = documentId => {
    alert('ขวย')

    // ทำการดาวน์โหลดเอกสารโดยใช้ documentId
    // สามารถเรียกใช้ API หรือทำการเปิด URL สำหรับดาวน์โหลดเอกสารได้ตามที่คุณต้องการ
  }

  //-------------------------จบส่วนของการ Download เอกสาร--------------------//

  return (
    <div>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: '60%', borderRadius: 15 }}>
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
            <PostAddIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> อัปโหลดเอกสาร CE 01
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
                    handleCE01Upload()
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
              <Card sx={{ width: '75%' }}>
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
                  height='450'
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenFileDialog(false)}>ปิด</Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Button size='large' color='warning' variant='outlined' style={{ marginTop: 10 }} onClick={ResetData}>
          รีเซ็ตข้อมูล
        </Button>
        <Button
          size='large'
          color='error'
          variant='outlined'
          style={{ marginTop: 10, marginLeft: 5 }}
          onClick={function () {
            router.push(`/pages/BackOffice/DisplayPreProject/PreprojectDetail/?id=${projectID}`)
          }}
        >
          ย้อนกลับ
        </Button>
      </Box>

      {/* ส่วนของการอัปโหลดเอกสาร */}
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
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default CE01Upload
