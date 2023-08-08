// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

// ** Icons Imports
import DescriptionIcon from '@mui/icons-material/Description'

const ManageDocuments = ({ documentStatus, requestdata }) => {
  const router = useRouter() // router สร้าง path
  // ตรวจสอบค่าว่างใน Props
  if (!documentStatus) {
    return (
      <div>
        <p>...เอกสารไร้สถานะ</p>
      </div>
    )
  }

  // เก็บค่าจาก Props ลงในตัวแปร
  const DocState = documentStatus
  const ProjectID = requestdata
  console.log('Carbill', ProjectID)

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2, textAlign: 'center' }}>
          Manage Documents
        </Typography>
        <Grid container spacing={6}>
          {/* CE01 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce01.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce01.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3,
                cursor: 'pointer'
              }}
              onClick={() => {
                router.push(
                  `/pages/BackOffice/DisplayPreProject/PreprojectDetail/ManageDocuments/CE01Upload/?id=${ProjectID}`
                )
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 01
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce01.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CE02 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce02.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce02.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 02
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce02.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CE03 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce03.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce03.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 03
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce03.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CE04 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce04.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce04.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 04
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce04.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CE05 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce05.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce05.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 05
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce05.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CE06 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: 0,
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.8)',
                color: 'common.white',
                backgroundColor:
                  DocState.ce06.status === 'ผ่านแล้ว'
                    ? 'green'
                    : DocState.ce06.status === 'ยังไม่ผ่าน'
                    ? '#f44336'
                    : 'black',
                borderRadius: 3
              }}
            >
              <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography
                  variant='h6'
                  sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
                >
                  <DescriptionIcon sx={{ marginRight: 2.5 }} />
                  เอกสาร CE 06
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะเอกสาร :
                  </Box>
                  {DocState.ce06.status}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายละเอียดเอกสาร :
                  </Box>
                  คลิ๊กเพื่อดูรายละเอียด
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManageDocuments
