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
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

export default function ProjectTransferData() {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  //------------------------------------สร้างตัวแปรเก็บค่าข้อมูลเพื่อแสดง------------------------//
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

  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // ตัวแปรเช็คค่าว่าง
  const [hasData, setHasData] = useState(false)

  //------------------------------------สร้างตัวแปรเก็บค่าข้อมูลเพื่อส่ง------------------------//
  const [newYearData, setNewYearData] = useState('') // เก็บข้อมูลปีใหม่
  const [newTermData, setNewTermData] = useState('') // เก็บข้อมูลSec และ เทอม ใหม่
  const [projectPK, setProjectPK] = useState('') // // เก็บค่า ID ของ Project เพื่อส่งค่าไปที่ Select ที่สอง

  //------------------------------------สร้างตัวแปรเก็บค่าข้อมูลจาก Api 2 สหาย เพื่อเเสดงในตัวเลือก ------------------------//
  const [allYearData, setAllYearData] = useState([]) // เก็บข้อมูลปีใหม่
  const [allTermData, setAllTermData] = useState([]) // เก็บข้อมูลSec และ เทอม ใหม่

  //----------------------------ตัวแปร Routers ------------------------//
  const router = useRouter() // router สร้าง path
  const projectId = router.query.id // อ่านค่า query parameter "id" จาก URL
  const requestdata = projectId // หากไม่เก็บค่าลงตัวแปรใหม่ Additional Select จะมีการเปลี่ยนแปลงค่า Id ตลอดเวลาตัวเลือกจะปิดเองอัตโนมัติ

  //------------------------------End Card Functions----------------------------//

  // ดึงข้อมูล Api มา Set
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=${requestdata}`
        )

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

    fetcData()
  }, [requestdata])

  //-------------------------------------------รับค่าข้อมูล Api หลักสูตรใหม่ทีที่จะโอนย้าย--------------------------------------//

  // ดึงข้อมูลปีจาก Api year
  useEffect(() => {
    const fetchYearData = async () => {
      if (requestdata) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallyearsubjectproject`, {
            params: { preproject_id: requestdata }
          })
          const yearData = response.data && response.data.all_years ? response.data.all_years : [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setAllYearData(yearData)
          setProjectPK(response.data.project_subject_id)
          setHasData(yearData.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchYearData()
  }, [requestdata])

  // ดึงข้อมูล Sec และ Term จาก Api
  useEffect(() => {
    const fetchTermData = async () => {
      if (newYearData) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallsecinprojectsubject`, {
            params: { subject_project_id: projectPK, year: newYearData }
          })
          const termData = response.data.data || [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setAllTermData(termData)
          setHasData(response.data.data.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchTermData()
  }, [projectPK, newYearData])

  //------------------------------------จบการรับค่าข้อมูล Api หลักสูตรใหม่ทีที่จะโอนย้าย---------------------------------//

  //---------ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown---------//

  const handleNewYearChange = event => {
    setNewYearData(event.target.value)
    setNewTermData('')
  } // จัดการการเปลี่ยนแปลงค่าของปีการศึกษา

  const handleNewTermChange = event => {
    setNewTermData(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ เทอม เเละ Sec

  //---------จบ ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown---------//

  // ส่งค่าไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayPreProject/PreprojectEditForm/?id=${projectId}`)
  }

  // ฟังชันส่งค่าการโอนย้ายข้อมูล
  const handleTranferSubmit = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!newYearData || !newTermData) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })

      return
    }

    const data = {
      section_id: newTermData,
      preproject_id: projectId
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/transferproject`, data)
      .then(response => {
        console.log(response)

        // ตรวจสอบ HTTP status code ของ response
        if (response.status === 200) {
          // กรณีสำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'โอนย้ายข้อมูลแล้วเสร็จ'
          })
          router.push(`/pages/BackOffice/DisplayPreProject`)
        } else {
          // กรณีไม่สำเร็จ และตรวจสอบ HTTP status code เพื่อแสดงข้อความแจ้งเตือนที่ต้องการ
          if (response.status === 400) {
            // กรณี Error 400 (Bad Request)
            Swal.fire({
              icon: 'error',
              title: 'มิคุ น่ารั๊ก'
            })
          } else {
            // กรณี Error อื่น ๆ
            Swal.fire({
              icon: 'error',
              title: 'คุณได้โอนย้ายโครงการนี้ไปแล้ว'
            })
          }
        }
      })
      .catch(error => {
        console.log(error)

        // กรณีเกิด error จากการเชื่อมต่อหรืออื่นๆ
        Swal.fire({
          icon: 'error',
          title: 'คุณได้โอนย้ายโครงการนี้ไปแล้ว'
        })
      })
  }

  // ฟังก์ชันรีเซ็ตข้อมูลในฟอร์ม
  const handleResetForm = () => {
    setNewYearData('')
    setNewTermData('')
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* ระบุรายละเอียดการโอนย้ายโครงงาน  */}
      <Card sx={{ mb: 5, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* Year Select */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='year-label'>ปีการศึกษา</InputLabel>
                <Select label='Year' value={newYearData} onChange={handleNewYearChange} labelId='year-label'>
                  {allYearData && allYearData.length > 0 ? (
                    allYearData.map(year => (
                      <MenuItem key={year.sem_year} value={year.sem_year}>
                        {year.sem_year}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Term Select */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='term-label'>เทอม/เซ็คชัน</InputLabel>
                <Select
                  label='Term'
                  value={newTermData}
                  onChange={handleNewTermChange}
                  labelId='term-label'
                  disabled={!newYearData || !hasData}
                >
                  {allTermData && allTermData.length > 0 ? (
                    allTermData.map(term => (
                      <MenuItem key={term.section_id} value={term.section_id}>
                        เทอม{term.semester_order} {term.section_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* จบการระบุรายละเอียดการโอนย้ายโครงงาน  */}

      {/* ส่วนของ Project Detail  */}
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
                {projectstatus === '0' || projectstatus === '1' ? (
                  <Box
                    component='span'
                    sx={{
                      color: projectstatus === '0' ? 'red' : 'green',
                      fontWeight: 'bold'
                    }}
                  >
                    {projectstatus === '0' ? 'โปรเจคยังไม่แล้วเสร็จ' : 'โปรเจคแล้วเสร็จ'}
                  </Box>
                ) : null}
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

      {/* ปุ่มใช้แก้ขัด */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='large' color='success' variant='outlined' onClick={handleTranferSubmit} sx={{ mt: 3, mr: 2 }}>
          โอนย้าย
        </Button>
        <Button size='large' color='warning' variant='outlined' onClick={handleResetForm} sx={{ mt: 3, mr: 2 }}>
          รีข้อมูล
        </Button>
        <Button
          size='large'
          color='error'
          variant='outlined'
          onClick={function () {
            router.push(`/pages/BackOffice/DisplayPreProject`)
          }}
          sx={{ mt: 3 }}
        >
          ย้อนกลับ
        </Button>
      </div>
    </Box>
  )
}
