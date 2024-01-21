import React from 'react'
import { styled } from '@mui/system'
import { Paper, Typography } from '@mui/material'

const ContentContainer = styled('div')({
  display: 'flex',
  alignItems: 'start',
  gap: '20px',
  padding: '20px',
  width: '140vh'
})

const ImageContainer = styled('div')({
  flex: '0 0 auto'
})

const Image = styled('img')({
  width: '50vh',
  height: '65vh',
  borderRadius: '10px 10px 10px 10px',
  boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.4)'
})

const TransparentPaper = styled(Paper)({
  padding: '20px',
  width: '800px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px'
})

const Content02 = () => {
  return (
    <ContentContainer>
      <TransparentPaper elevation={3}>
        <Typography variant='h5' gutterBottom>
          วัตถุประสงค์ของโครงงาน
        </Typography>
        <Typography variant='body1' style={{ lineHeight: 1.5 }}>
          1.มีระบบจะจัดเก็บข้อมูลงานวิจัยและโครงงานลงในฐานข้อมูล
        </Typography>
        <Typography variant='body1' style={{ lineHeight: 1.5 }}>
          2.มีระบบแยกสิทธิผู้ใช้งานระบบ
        </Typography>
        <Typography variant='body1' style={{ lineHeight: 1.5 }}>
          3.มีระบบจัดการวิชาการเตรียมโครงงาน และ วิชาโครงงาน
        </Typography>
        <Typography variant='body1' style={{ lineHeight: 1.5 }}>
          4.มีระบบตรวจสอบขั้นตอนของวิชาการเตรียมโครงงาน และ วิชาโครงงาน ย้อนหลัง
        </Typography>
      </TransparentPaper>
      <ImageContainer>
        <Image
          src='https://png.pngtree.com/background/20210710/original/pngtree-digital-computing-science-and-technology-light-background-material-picture-image_969161.jpg'
          alt='รูปภาพ'
        />
      </ImageContainer>
    </ContentContainer>
  )
}

export default Content02
