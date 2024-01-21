import React from 'react'
import { styled } from '@mui/system'
import { Container, Typography, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Root = styled('footer')({
  backgroundColor: '#00b0ff',
  color: '#fff',
  padding: '20px',
  textAlign: 'left',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',

  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#0081cb'
  }
})

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px'
})

const AdditionalInfo = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
})

const IconWrapper = styled('div')({
  display: 'flex',
  marginTop: '20px'
})

const IconButtonStyled = styled(IconButton)({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'transparent'
  },
  marginRight: '20px',
  fontSize: '28px',
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: '#0081cb'
  }
})

const User_footer = () => {
  return (
    <Root>
      <Container>
        <Content>
          <Typography variant='h6' component='p'>
            ระบบจัดการและบริหารโครงงาน
          </Typography>
          <Typography variant='body2' color='inherit' paragraph>
            create by: @Project Management Web Application for Computer Engineering @2024
          </Typography>

          <AdditionalInfo>
            <IconWrapper>
              <IconButtonStyled>
                <GitHubIcon />
              </IconButtonStyled>
              <IconButtonStyled>
                <LinkedInIcon />
              </IconButtonStyled>
              <IconButtonStyled>
                <FacebookIcon />
              </IconButtonStyled>
              <IconButtonStyled>
                <InstagramIcon />
              </IconButtonStyled>
            </IconWrapper>
          </AdditionalInfo>
        </Content>
      </Container>
    </Root>
  )
}

export default User_footer
