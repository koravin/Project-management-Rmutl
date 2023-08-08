import React, { useState } from 'react'
import { Button, Typography, Card, CardContent, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/system'

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

const FileUploadButton = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  const [selectedFile, setSelectedFile] = useState(null) // ตัวแปรเก็บค่าไฟล์ที่อัปโหลด
  const [showFileDetails, setShowFileDetails] = useState(false) // ตัวแปรควบคุมการแสดงรายละเอียดเอกสาร
  const [openFileDialog, setOpenFileDialog] = useState(false) // ตัวแปรควบคุมการเปิดปิด Dialog

  console.log(selectedFile)

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
    setShowFileDetails('')
    setSelectedFile('')
  }

  return (
    <Card>
      <CardContent>
        <RootContainer>
          <input type='file' id='file-upload' style={{ display: 'none' }} onChange={handleFileChange} />
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
          <div>
            <WhiteBlackButton variant='contained' color='primary' endIcon={<SendIcon />} disabled={!selectedFile}>
              ส่ง
            </WhiteBlackButton>
          </div>
        </RootContainer>

        <div>
          <Button variant='contained' onClick={toggleFileDetails} disabled={!selectedFile}>
            ดูรายละเอียดเอกสารที่อัปโหลด
          </Button>
        </div>

        {showFileDetails && selectedFile && (
          <Card sx={{ width: '500px' }}>
            <CardContent>
              <div>
                <Typography variant='subtitle1'>รายละเอียดไฟล์ : </Typography>
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
        <Button variant='contained' style={{ marginTop: 5 }} onClick={ResetData}>
          รีเซ็ตข้อมูล
        </Button>
      </CardContent>
    </Card>
  )
}

export default FileUploadButton
