import React, { useEffect, useState } from 'react'
import axios from 'axios'

// MUI Import
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function PreprojectInsert({ open, handleClose, handleSubmit, data }) {
  // console.log(data)

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [curriculumsId, setCurriculumsId] = useState('') // เก็บข้อมูลหลักสูตร
  const [subjectId, setSubjectId] = useState('') // เก็บข้อมูลวิชา
  const [yearId, setYearId] = useState('') // เก็บข้อมูลปี
  const [projecttype, setProjectType] = React.useState('') // รับข้อมูล ประเภทโครงงาน
  const [advisorId, setAdvisorId] = useState('') // เก็บข้อมูลรหัสอาจารย์ที่ปรึกษา
  const [projectCode, setProjectCode] = useState('') // เก็บข้อมูลรหัสโครงงาน
  const [projectNameTh, setProjectNameTh] = useState('') // เก็บข้อมูลชื่อโครงงาน (ภาษาไทย)
  const [projectNameEn, setProjectNameEn] = useState('') // เก็บข้อมูลชื่อโครงงาน (ภาษาอังกฤษ)
  const [selectedTerm, setSelectedTerm] = useState('') // เก็บข้อมูล Sec ที่ถูกเลือก

  // console.log(curriculumsId)
  // console.log(subjectId)
  // console.log(yearId)
  // console.log(projecttype)
  // console.log(advisorId)
  // console.log(projectNameTh)
  // console.log(projectNameEn)
  // console.log(projectCode)
  // console.log(selectedTerm)

  // ฟังก์ชันคืนค่าข้อมูลในฟอร์มเมื่อปิด modal
  const handleCloseModal = () => {
    handleClose() // ปิด Modal

    // รีเซ็ตค่าเริ่มต้นของตัวแปร state เมื่อปิด Modal
    setCurriculumsId('')
    setSubjectId('')
    setYearId('')
    setProjectType('')
  }

  // ตัวแปรเช็คว่ามีข้อมูลให้ Map หรือไม่
  const [hasData, setHasData] = useState(false)

  // รับค่าข้อมูลจาก Api
  const [curriculumsData, setCurriculumsData] = useState([]) // รับข้อมูลหลักสูตร
  const [subjectsData, setSubjectsData] = useState([]) // รับข้อมูลวิชา
  const [yearData, setYearData] = useState([]) // รับข้อมูลปี
  const [termData, setTermData] = useState([]) // รับข้อมูล เทอม กับ Sec
  const [teacherData, setTeacherData] = useState([]) // รับข้อมูลชื่ออาจารย์

  // ดึงข้อมูลหลักสูตรจาก Api curriculums
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/project-mgt/curriculums')
        setCurriculumsData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  // ดึงข้อมูลวิชาจาก Api subjects
  useEffect(() => {
    const fetchSubjectsData = async () => {
      if (curriculumsId) {
        try {
          const response = await axios.get('http://localhost:3200/api/project-mgt/curriculums/subjects', {
            params: { curriculum_id: curriculumsId }
          })
          const subjectData = response.data.data || [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setSubjectsData(subjectData)
          setHasData(response.data.data.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchSubjectsData()
  }, [curriculumsId])

  // ดึงข้อมูลปีจาก Api year
  useEffect(() => {
    const fetchYearData = async () => {
      if (subjectId) {
        try {
          const response = await axios.get('http://localhost:3200/api/project-mgt/curriculums/subjects/year', {
            params: { subject_id: subjectId }
          })
          const yearData = response.data.data || [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setYearData(yearData)
          setHasData(response.data.data.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchYearData()
  }, [subjectId])

  // ดึงข้อมูล Sec และ Term จาก Api
  useEffect(() => {
    const fetchTermData = async () => {
      if (subjectId && yearId) {
        try {
          const response = await axios.get('http://localhost:3200/api/project-mgt/curriculums/subjects/year/sections', {
            params: { subject_id: subjectId, year: yearId }
          })
          const termData = response.data.data || [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setTermData(termData)
          setHasData(response.data.data.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchTermData()
  }, [subjectId, yearId])

  // ดึงข้อมูลอาจารย์จาก Api
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (teacherData) {
        try {
          const response = await axios.get('http://localhost:3200/api/project-mgt/instructors')
          const TeacherData = response.data.data || [] // ตรวจสอบและกำหนดค่าเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
          setTeacherData(TeacherData)
          setHasData(response.data.data.length > 0) // ตรวจสอบว่ามีข้อมูลหรือไม่
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchTeacherData()
  }, [teacherData])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleCurriculumsChange = event => {
    setCurriculumsId(event.target.value)
    setSubjectId('')
    setYearId('')
  } // จัดการการเปลี่ยนแปลงค่าของหลักสูตร

  const handleSubjectChange = event => {
    setSubjectId(event.target.value)
    setYearId('')
  } // จัดการการเปลี่ยนแปลงค่าของวิชา

  const handleYearChange = event => {
    setYearId(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของปีการศึกษา

  const handleProjectTypeChange = event => {
    setProjectType(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของประเภทโครงงาน (ข้อมูลแข็งๆ)

  const handleAdvisorChange = event => {
    setAdvisorId(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของอาจารที่ปรึกษา

  const handleProjectNameThChange = event => {
    setProjectNameTh(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ ชื่อโครงงานภาษาไทย

  const handleProjectNameEnChange = event => {
    setProjectNameEn(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ ชื่อโครงงานภาษาอังกฤษ

  const handleProjectCodeChange = event => {
    setProjectCode(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ โปรเจค Code

  const handleTermChange = event => {
    setSelectedTerm(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ เทอม เเละ Sec

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Insert Data Form</DialogTitle>
      <DialogContent>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    ข้อมูลจำเป็น**(กรุณาระบุข้อมูลตามลำดับ)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='curriculum-label'>Curriculum</InputLabel>
                    <Select
                      label='Curriculum'
                      value={curriculumsId}
                      onChange={handleCurriculumsChange}
                      labelId='curriculum-label'
                    >
                      {curriculumsData.map(curriculum => (
                        <MenuItem key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                          {curriculum.curriculum_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='subject-label'>Subject</InputLabel>
                    <Select
                      label='Subject'
                      value={subjectId}
                      onChange={handleSubjectChange}
                      labelId='subject-label'
                      disabled={!curriculumsId || !hasData}
                    >
                      {subjectsData && subjectsData.length > 0 ? (
                        subjectsData.map(subject => (
                          <MenuItem key={subject.subject_id} value={subject.subject_id}>
                            {subject.subject_name_th}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='year-label'>Year</InputLabel>
                    <Select
                      label='Year'
                      value={yearId}
                      onChange={handleYearChange}
                      labelId='year-label'
                      disabled={!subjectId || !hasData}
                    >
                      {yearData && yearData.length > 0 ? (
                        yearData.map(year => (
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
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='term-label'>Term</InputLabel>
                    <Select
                      label='Term'
                      value={selectedTerm}
                      onChange={handleTermChange}
                      labelId='term-label'
                      disabled={!yearId || !hasData}
                    >
                      {termData && termData.length > 0 ? (
                        termData.map(term => (
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Project-Code'
                    placeholder='CE0101'
                    value={projectCode}
                    onChange={handleProjectCodeChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='term-label'>Project-Type</InputLabel>
                    <Select
                      label='Project-Type'
                      defaultValue=''
                      id='select-04'
                      labelId='Project-Type'
                      onChange={handleProjectTypeChange}
                      value={projecttype}
                    >
                      <MenuItem value={'HardWare'}>HardWare</MenuItem>
                      <MenuItem value={'SoftWare'}>SoftWare</MenuItem>
                      <MenuItem value={'Network'}>Network</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    ชื่อโครงงาน**
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Project Name (Th)'
                    placeholder='Thai Name'
                    value={projectNameTh}
                    onChange={handleProjectNameThChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Project Name (En)'
                    placeholder='English Name'
                    value={projectNameEn}
                    onChange={handleProjectNameEnChange}
                  />
                </Grid>

                {/* Advisor Select */}
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    ชื่ออาจารย์ที่ปรึกษา**
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Button sx={{ fontSize: '12px', padding: '4px 8px' }}>เพิ่มข้อมูล</Button>
                    </Grid>
                  </Grid>
                  <FormControl fullWidth>
                    <InputLabel id='advisor-label'>Advisor</InputLabel>
                    <Select
                      label='Advisor'
                      labelId='advisor-label'
                      value={advisorId}
                      onChange={handleAdvisorChange}
                      disabled={!hasData}
                    >
                      {teacherData.map((contentTeacher, value) => (
                        <MenuItem key={value} value={contentTeacher.instructor_id}>
                          {contentTeacher.instructors_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={handleCloseModal}>
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
