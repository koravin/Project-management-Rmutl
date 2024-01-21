import React from 'react'
import { styled } from '@mui/system'
import { Paper, Typography } from '@mui/material'

const ContentContainer = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  gap: '20px',
  padding: '20px'
})

const ImageContainer = styled('div')({
  flex: '0 0 auto'
})

const Image = styled('img')({
  width: '80vh',
  height: '50vh',
  borderRadius: '80px 0 80px 0',
  boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.4)'
})

const TransparentPaper = styled(Paper)({
  padding: '20px',
  width: '400px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px'
})

const Content01 = () => {
  return (
    <ContentContainer>
      <ImageContainer>
        <Image src='https://qualitygb.com/wp-content/uploads/2022/09/Projet-manager.png' alt='รูปภาพ' />
      </ImageContainer>
      <TransparentPaper elevation={3}>
        <Typography variant='h5' gutterBottom>
          เกี่ยวกับเรา
        </Typography>
        <Typography variant='body1' style={{ lineHeight: 1.5 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เว็บแอปพลิเคชันสำหรับบริหารและจัดการโครงงานวิศวกรรมคอมพิวเตอร์
          มทร.ล้านนา &nbsp;เป็น 1 ใน 3 &nbsp;&nbsp;ของโครงการ ที่อยู่ภายใต้โครงการ CE Reform
          ซึ่งเกิดจากการพัฒนาการจัดการเรียนการสอนด้วย เทคโนโลยีเพื่อสอดคล้องกับแผนการเรียนของมหาวิทยาลัย
        </Typography>
      </TransparentPaper>
    </ContentContainer>
  )
}

export default Content01
