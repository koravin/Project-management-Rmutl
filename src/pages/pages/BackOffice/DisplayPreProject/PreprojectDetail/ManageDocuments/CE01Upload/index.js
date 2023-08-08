import React, { useState } from 'react'
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

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1px',
  marginBottom: '16px',
  marginTop: '8px'
})

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
  const projectID = projectId // หากไม่เก็บค่าลงตัวแปรใหม่ Additional Select จะมีการเปลี่ยนแปลงค่า Id ตลอดเวลาตัวเลือกจะปิดเองอัตโนมัติ

  console.log('Carbillxxx', projectID)

  const [selectedFile, setSelectedFile] = useState(null) // ตัวแปรเก็บค่าไฟล์ที่อัปโหลด
  const [documentType, setDocumentType] = useState('') // ตัวแปรเก็บค่าประเภทเอกสาร
  const [showFileDetails, setShowFileDetails] = useState(false) // ตัวแปรควบคุมการแสดงรายละเอียดเอกสาร
  const [openFileDialog, setOpenFileDialog] = useState(false) // ตัวแปรควบคุมการเปิดปิด Dialog
  const [fileInputKey, setFileInputKey] = useState(0) // ตัวแปร state สำหรับ key ของ input(ทำให้ input รีค่าใหม่ทึกครั้งที่มีการ อัปโหลดไฟล์)

  console.log('Love Sayaga :', documentType)

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
        setDocumentType(file.type)

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
  const handleCE01Upload = e => {
    const data = {
      preproject_id: projectID,
      document_type: documentType,
      document_name: 'CE01',
      document_owner: '0'
    }

    console.log(data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/uploadpreprojectdocuments`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'อัปโหลดข้อมูลแล้วเสร็จ'
    })
  }

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
                  onClick={handleCE01Upload}
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
    </div>
  )
}

export default CE01Upload
