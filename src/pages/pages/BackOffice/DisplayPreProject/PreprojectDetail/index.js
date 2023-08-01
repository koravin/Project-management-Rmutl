import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import ImgShow from './ImgShow'

// ** Icons Imports
import Twitter from 'mdi-material-ui/Twitter'
import CartPlus from 'mdi-material-ui/CartPlus'
import Facebook from 'mdi-material-ui/Facebook'
import Linkedin from 'mdi-material-ui/Linkedin'
import GooglePlus from 'mdi-material-ui/GooglePlus'
import ShareVariant from 'mdi-material-ui/ShareVariant'

// Card Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

function CustomTabPanel(props) {
  //------------------------------TabPanel Functions----------------------------//
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* เปลี่ยน tag ของ Typography ให้เป็น div หรือ span */}
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

//------------------------------End TabPanel Functions----------------------------//

export default function PreprojectDetail() {
  //------------------------------------สร้างตัวแปรเก็บค่าข้อมูล------------------------//
  const [projectNameTh, setProjectNameTh] = useState('') // เก็บข้อมูลชื่อโครงงาน (ภาษาไทย)
  const [projectNameEn, setProjectNameEn] = useState('') // เก็บข้อมูลชื่อโครงงาน (ภาษาอังกฤษ)
  const [projectstatus, setProjectStatus] = useState('') // รับข้อมูล สถานะของโครงงาน
  //------------------------เส้นคั่น----------------------------------//
  const [year, setYear] = useState('') // เก็บข้อมูลปี
  const [Term, setTerm] = useState('') // เก็บข้อมูล Term
  const [Sec, setSec] = useState('') // เก็บข้อมูล Sec
  const [projectCode, setProjectCode] = useState('') // เก็บข้อมูลรหัสโครงงาน
  const [curriculums, setCurriculums] = useState('') // เก็บข้อมูลหลักสูตร
  const [projectType, setProjectType] = useState('') // รับข้อมูล ประเภทของโครงงาน
  //------------------------เส้นคั่น----------------------------------//
  const [advisor, setAdvisor] = useState('') // เก็บข้อมูลอาจารย์ที่ปรึกษา
  const [subAdvisor, setSubAdvisor] = useState([]) // เก็บข้อมูลอาจารย์ที่ปรึกษารอง
  const [committee, setCommittee] = useState([]) // เก็บข้อมูลคณะกรรมการ
  //------------------------เส้นคั่น----------------------------------//
  const [student, setStudent] = useState([]) // เก็บข้อมูลนักศึกษา

  console.log(committee)

  //----------------------------ตัวแปร Routers ------------------------//
  const router = useRouter() // router สร้าง path
  const projectId = router.query.id // อ่านค่า query parameter "id" จาก URL
  const requestdata = projectId // หากไม่เก็บค่าลงตัวแปรใหม่ Additional Select จะมีการเปลี่ยนแปลงค่า Id ตลอดเวลาตัวเลือกจะปิดเองอัตโนมัติ

  // เซตค่า TabPanel
  const [valueTabPanel, setValueTabPanel] = React.useState(0)

  const handleChangeTabPanel = (event, newValue) => {
    setValueTabPanel(newValue)
  }

  //------------------------------Card Functions----------------------------//
  const [anchorEl, setAnchorEl] = useState(null)
  const openCardSelect = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //------------------------------End Card Functions----------------------------//

  // ดึงข้อมูล Api มา Set form Edit
  useEffect(() => {
    const fetchEditData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=${requestdata}`
        )
        console.log(response.data)

        // console.log(response.data.PreprojectData[0].preproject_name_th)
        setProjectNameTh(response.data.PreprojectData[0].preproject_name_th)
        setProjectNameEn(response.data.PreprojectData[0].preproject_name_eng)
        setProjectStatus(response.data.PreprojectData[0].project_status)
        setYear(response.data.PreprojectData[0].sem_year)
        setTerm(response.data.PreprojectData[0].semester_order)
        setSec(response.data.PreprojectData[0].section_name)
        setProjectCode(response.data.PreprojectData[0].project_code)
        setCurriculums(response.data.PreprojectData[0].curriculum_name)
        setProjectType(response.data.PreprojectData[0].project_type)
        setAdvisor(response.data.PreprojectData[0].instructors_name)
        setSubAdvisor(response.data.PreprojectSubAdviser)
        setCommittee(response.data.PreprojectCommittee)
        setStudent(response.data.PreprojectStudent)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEditData()
  }, [requestdata])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valueTabPanel} onChange={handleChangeTabPanel} aria-label='basic tabs example'>
          <Tab label='Project Detail' {...a11yProps(0)} />
          <Tab label='Project Document' {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* ส่วนของ Project Detail  */}
      <CustomTabPanel value={valueTabPanel} index={0}>
        <Card>
          <Grid container spacing={0.5}>
            {/* Component แสดงรูปภาพในโปรเจค  */}
            <StyledGrid item md={5} xs={12}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Img
                {/* <ImgShow /> */}
              </CardContent>
            </StyledGrid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Project Detail
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    ชื่อโครงงานภาษาไทย :
                  </Box>
                  {projectNameTh}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    ชื่อโครงงานภาษาอังกฤษ :
                  </Box>
                  {projectNameEn}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    สถานะของโครงงาน :
                  </Box>
                  <Box
                    component='span'
                    sx={{
                      color: projectstatus === '0' ? 'red' : 'green',
                      fontWeight: 'bold'
                    }}
                  >
                    {projectstatus === '0' ? 'โปรเจคยังไม่แล้วเสร็จ' : 'โปรเจคแล้วเสร็จ'}
                  </Box>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    ปีที่จัดทำ :
                  </Box>
                  {year}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    เทอม :
                  </Box>
                  {Term}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    เซ็คชัน :
                  </Box>
                  {Sec}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รหัสโครงงาน :
                  </Box>
                  {projectCode}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    หลักสูตร :
                  </Box>
                  {curriculums}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    ประเภทของโครงงาน :
                  </Box>
                  {projectType}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    อาจารย์ที่ปรึกษา :
                  </Box>
                  {advisor}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    อาจารย์ที่ปรึกษารอง
                  </Box>
                  {subAdvisor.map((advisor, index) => (
                    <span key={index}>
                      {<br />}
                      {`อาจารย์ที่ปรึกษารอง ${index + 1}: ${advisor.instructors_name}`}{' '}
                    </span>
                  ))}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    กรรมการ
                  </Box>
                  {committee.map((committee, index) => (
                    <span key={index}>
                      {<br />}
                      {`กรรมการ ${index + 1}: ${committee.instructors_name}`}{' '}
                    </span>
                  ))}
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                    รายชื่อนักศึกษา
                  </Box>
                  {student.map((student, index) => (
                    <span key={index}>
                      {<br />}
                      {`สมาชิก ${index + 1}: ${student.studen_first_name} ${student.studen_last_name} รหัสนักศึกษา ${
                        student.studen_number
                      }`}{' '}
                    </span>
                  ))}
                </Typography>
              </CardContent>
              <CardActions className='card-action-dense'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Button>Editdata</Button>
                  <IconButton
                    id='long-button'
                    aria-label='share'
                    aria-haspopup='true'
                    onClick={handleClick}
                    aria-controls='long-menu'
                    aria-expanded={openCardSelect ? 'true' : undefined}
                  >
                    <ShareVariant fontSize='small' />
                  </IconButton>
                  <Menu
                    open={openCardSelect}
                    id='long-menu'
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'long-button'
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Facebook />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Twitter />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Linkedin />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <GooglePlus />
                    </MenuItem>
                  </Menu>
                </Box>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </CustomTabPanel>

      {/* ส่วนของ Document Detail  */}
      <CustomTabPanel value={valueTabPanel} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  )
}
