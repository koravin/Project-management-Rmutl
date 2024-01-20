// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'
import ExtensionIcon from '@mui/icons-material/Extension'

const Overview_load = ({ overviewdata }) => {
  const salesData = [
    {
      stats: 'Load ' + overviewdata?.adviserCount_preproject + ' Project',
      title: 'Pre-project',
      color: 'primary',
      icon: <CoPresentIcon sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: 'Load ' + overviewdata?.adviserCount_project + ' Project',
      title: 'Project',
      color: 'success',
      icon: <Diversity3Icon sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: 'Load ' + overviewdata?.committeeCount_preproject + ' Project',
      color: 'warning',
      title: 'Committee Pre-project',
      icon: <DataSaverOffIcon sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: 'Load ' + overviewdata?.committeeCount_project + ' Project',
      color: 'info',
      title: 'Committee Project',
      icon: <ExtensionIcon sx={{ fontSize: '1.75rem' }} />
    }
  ]

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='All Your Load'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              All {overviewdata?.allLoadCount} Your Load
            </Box>{' '}
            😎 you are so cool
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Overview_load
