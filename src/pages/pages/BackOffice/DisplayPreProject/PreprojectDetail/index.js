import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import ImgShow from './ImgShow'

// Page Import
import ManageDocuments from './ManageDocuments'

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
  const [year, setYear] = useState('') // เก็บข้อมูลปี
  const [Term, setTerm] = useState('') // เก็บข้อมูล Term
  const [Sec, setSec] = useState('') // เก็บข้อมูล Sec
  const [projectCode, setProjectCode] = useState('') // เก็บข้อมูลรหัสโครงงาน
  const [curriculums, setCurriculums] = useState('') // เก็บข้อมูลหลักสูตร
  const [projectType, setProjectType] = useState('') // รับข้อมูล ประเภทของโครงงาน
  const [advisor, setAdvisor] = useState('') // เก็บข้อมูลอาจารย์ที่ปรึกษา
  const [subAdvisor, setSubAdvisor] = useState([]) // เก็บข้อมูลอาจารย์ที่ปรึกษารอง
  const [committee, setCommittee] = useState([]) // เก็บข้อมูลคณะกรรมการ
  const [student, setStudent] = useState([]) // เก็บข้อมูลนักศึกษา
  const [documentStatus, setDocumentStatus] = useState([]) // เก็บข้อมูลสถานะเอกสาร

  //----------------------------ตัวแปร Routers ------------------------//
  const router = useRouter() // router สร้าง path
  const projectId = router.query.id // อ่านค่า query parameter "id" จาก URL
  const requestdata = projectId // หากไม่เก็บค่าลงตัวแปรใหม่ Additional Select จะมีการเปลี่ยนแปลงค่า Id ตลอดเวลาตัวเลือกจะปิดเองอัตโนมัติ
  // console.log(requestdata)

  // เซตค่า TabPanel
  const [valueTabPanel, setValueTabPanel] = React.useState(0)

  const handleChangeTabPanel = (event, newValue) => {
    setValueTabPanel(newValue)
  }

  //------------------------------End Card Functions----------------------------//

  // ดึงข้อมูล Api มา Set
  useEffect(() => {
    const fetcData = async () => {
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

        //เก็บข้อมูลสถานะ
        setDocumentStatus(response.data.PreprojectDocument)
      } catch (error) {
        console.error(error)
      }
    }

    fetcData()
  }, [requestdata])

  // ส่งค่าไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayPreProject/PreprojectEditForm/?id=${projectId}`)
  }

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
            <Grid
              item
              xs={12}
              width={'max'} // md={'max'} // กำหนดความกว้าง card
              sx={{
                paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ marginBottom: 2, textAlign: 'center' }}>
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
                  {projectstatus === '0' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#f44336',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      ไม่ผ่าน
                    </Box>
                  )}
                  {projectstatus === '1' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#f44336',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      โครงงานยังไม่ได้รับการอนุมัติ
                    </Box>
                  )}
                  {projectstatus === '2' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#f44336',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      ยังไม่ได้ดำเนินการ
                    </Box>
                  )}
                  {projectstatus === '3' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#2979ff',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      อยู่ระหว่างการดำเนินการ
                    </Box>
                  )}
                  {projectstatus === '4' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#f2d05e',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      สามารถสอบได้
                    </Box>
                  )}
                  {projectstatus === '5' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#f2d05e',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      ยังไม่ผ่านการสอบ
                    </Box>
                  )}
                  {projectstatus === '6' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#4caf50',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      ผ่านแล้วแต่ยังไม่ได้โอน
                    </Box>
                  )}
                  {projectstatus === '7' && (
                    <Box
                      component='span'
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#4caf50',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        fontSize: '11px',
                        borderRadius: '50px'
                      }}
                    >
                      โอนแล้ว
                    </Box>
                  )}
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
                <Divider sx={{ my: 2 }} />
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
                  <Button onClick={() => handleEditClick(requestdata)}>แก้ไขข้อมูล</Button>
                </Box>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </CustomTabPanel>

      {/* ส่วนของ Document Detail  */}
      <CustomTabPanel value={valueTabPanel} index={1}>
        {documentStatus.length === 0 ? (
          <Typography variant='body2'>ไม่มีข้อมูล</Typography>
        ) : (
          <ManageDocuments documentStatus={documentStatus} requestdata={requestdata} />
        )}
      </CustomTabPanel>

      {/* ปุ่มใช้แก้ขัด */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {' '}
        <Button
          size='large'
          color='error'
          variant='outlined'
          onClick={function () {
            router.push(`/pages/BackOffice/DisplayPreProject`)
          }}
        >
          ย้อนกลับ
        </Button>
      </div>
    </Box>
  )
}
