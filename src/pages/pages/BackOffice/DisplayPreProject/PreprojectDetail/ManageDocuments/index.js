// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import DescriptionIcon from '@mui/icons-material/Description'

const ManageDocuments = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {/* CE01 Content */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'green' }}>
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
                  ผ่าน
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    วันที่ส่งล่าสุด :
                  </Box>
                  08/03/2023
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
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'green' }}>
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
                  ผ่าน
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    วันที่ส่งล่าสุด :
                  </Box>
                  08/03/2023
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
