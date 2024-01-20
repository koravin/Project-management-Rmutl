import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import { AddCircle, Edit, Delete, Visibility, Settings } from '@mui/icons-material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeIcon from '@mui/icons-material/Home'
import RecommendIcon from '@mui/icons-material/Recommend'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router'

//** Topbar Import
import User_navigate_topbar from 'src/@core/components/user-navigate/User_navigate_topbar'
import User_footer from 'src/@core/components/user-navigate/User_footer'

const StyledCard = styled(Card)({
  width: 200,
  margin: 16,
  transition: 'transform 0.3s',
  borderRadius: 12, // Add border radius for a smoother look
  overflow: 'hidden', // Hide overflowing content
  '&:hover': {
    transform: 'scale(1.1)'
  }
})

const StyledIconButton = styled(IconButton)({
  margin: '8px'
})

const RowContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  flexWrap: 'wrap'
})

const Header = styled(Typography)({
  fontSize: '2rem', // Increase font size for a more prominent header
  fontWeight: 'bold',
  marginBottom: '1rem'
})

function TeacherMenu() {
  const router = useRouter() // Initialize useRouter

  return (
    <div>
      <div style={{ marginBottom: '5vh' }}>
        <User_navigate_topbar />
      </div>
      <div style={{ margin: '5vh' }}>
        <Card style={{ maxWidth: '60vh', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <CardContent>
            <Header variant='h4'>เมนูหลัก: อาจารย์</Header>
          </CardContent>
        </Card>
      </div>

      <Card style={{ margin: '5vh', borderRadius: 12, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
        <CardContent>
          <RowContainer>
            <StyledCard
              onClick={() => {
                router.push('/pages/Teacher/Teacher_load/')
              }}
            >
              <CardContent>
                <Typography variant='h6'>ภาระทั้งหมด</Typography>
              </CardContent>
              <StyledIconButton color='primary'>
                <HomeRepairServiceIcon />
              </StyledIconButton>
            </StyledCard>

            <StyledCard
              onClick={() => {
                router.push('/pages/Teacher/Teacher_post/')
              }}
            >
              <CardContent>
                <Typography variant='h6'>โพสหัวข้อ</Typography>
              </CardContent>
              <StyledIconButton color='primary'>
                <LocalPostOfficeIcon />
              </StyledIconButton>
            </StyledCard>

            <StyledCard
              onClick={() => {
                router.push('/pages/Teacher/Committee/')
              }}
            >
              <CardContent>
                <Typography variant='h6'>กรรมการ</Typography>
              </CardContent>
              <StyledIconButton color='primary'>
                <PeopleAltIcon />
              </StyledIconButton>
            </StyledCard>
          </RowContainer>
        </CardContent>
      </Card>
      <div style={{ marginTop: '5vh' }}>
        <User_footer />
      </div>
    </div>
  )
}

TeacherMenu.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default TeacherMenu
