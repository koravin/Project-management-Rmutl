import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const acceptedFileTypes = ['.pdf', '.doc', '.docx', '.mp4', '.jpeg'] // นามสกุลที่อนุญาติให้อับโหลด
const maxFileSizeInBytes = 1000000000 //ขนาดไฟล์สูงสุดที่อนุญาติให้อัปโหลด
const modalHeight = '500px'

export default function UploadTest() {
  //ตัวแปรเก็บข้อมูล
  const [uploadedFiles, setUploadedFiles] = useState([]) // ข้อมูลไฟล์อัปโหลด
  const [openModal, setOpenModal] = useState(false) // Set Status Modal
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = files => {
    setUploadedFiles(files)
  }

  const handleFileOpen = file => {
    setSelectedFile(file)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // ฟังก์ชันเปลี่ยน icon ตามนามสกุลไฟล์ที่อัปโหลด
  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file

    const iconProps = {
      className: classes.image
    }
    if (type.startsWith('video/')) return <Theaters {...iconProps} />
    if (type.startsWith('audio/')) return <AudioTrack {...iconProps} />
    switch (type) {
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <Description {...iconProps} />
      case 'application/pdf':
        return <PictureAsPdf {...iconProps} />
      default:
        return <AttachFile {...iconProps} />
    }
  }

  return (
    <div>
      <Card sx={{ width: '70%', margin: '0 auto', borderRadius: 3 }}>
        <CardContent>
          <DropzoneArea
            dropzoneText={'อัปโหลดไฟล์ หรือ วางไฟล์ (Pdf, Doc, Mp4)'}
            maxFileSize={maxFileSizeInBytes}
            acceptedFiles={acceptedFileTypes}
            getPreviewIcon={handlePreviewIcon}
            filesLimit={'1'}
            onChange={handleFileChange}
          />
          <Box mt={2}>
            {uploadedFiles.length > 0 && (
              <div>
                <h2>ไฟล์ที่อัปโหลดแล้ว</h2>
                <ul>
                  {uploadedFiles.map(file => (
                    <li key={file.name}>
                      <span
                        style={{
                          cursor: 'pointer',
                          color: 'black'
                        }}
                        onClick={() => handleFileOpen(file)}
                        onMouseEnter={e => (e.target.style.color = 'blue')}
                        onMouseLeave={e => (e.target.style.color = 'black')}
                      >
                        {file.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth='md' fullWidth>
        <DialogContent>
          <Typography sx={{ display: 'flex', justifyContent: 'right' }}>
            <IconButton aria-label='close' onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <div style={{ marginBottom: '5px' }}>
            <Typography variant='h6'>file preview</Typography>
          </div>
          {selectedFile?.type.startsWith('video/') && (
            <video controls src={URL.createObjectURL(selectedFile)} style={{ height: modalHeight }} />
          )}
          {selectedFile?.type === 'application/pdf' && (
            <iframe src={URL.createObjectURL(selectedFile)} width='100%' height={modalHeight} title='PDF Preview' />
          )}
          {(selectedFile?.type === 'application/msword' ||
            selectedFile?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
            <iframe
              src={URL.createObjectURL(selectedFile)}
              width='100%'
              height={modalHeight}
              title='Document Preview'
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
