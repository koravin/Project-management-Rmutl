import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// MUI Import
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function InsertSection({ open, handleClose }) {
  // ตัวแปรสเช็คค่าสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // รับค่าข้อมูลจาก Api
  const [curriculumsData, setCurriculumsData] = useState([]) // รับข้อมูลหลักสูตร
  const [subjectsData, setSubjectsData] = useState([]) // รับข้อมูลวิชา
  const [yearData, setYearData] = useState([]) // รับข้อมูลปี
  const [termData, setTermData] = useState([]) // รับข้อมูล เทอม กับ Sec

  // ตัวแปรเช็คว่ามีข้อมูลให้ Map หรือไม่
  const [hasData, setHasData] = useState(false)

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [curriculumsId, setCurriculumsId] = useState('') // เก็บข้อมูลหลักสูตร
  const [subjectId, setSubjectId] = useState('') // เก็บข้อมูลวิชา
  const [yearId, setYearId] = useState('') // เก็บข้อมูลปี
  const [selectedTerm, setSelectedTerm] = useState('') // เก็บข้อมูล Sec ที่ถูกเลือก
  const [SectionName, setSectionName] = useState('') // เก็บข้อมูลชื่อ Sec

  // ล้างค่าข้อมูลเมื่อ Modal เปิดหรือปิด
  useEffect(() => {
    if (!open) {
      setCurriculumsId('')
      setSubjectId('')
      setYearId('')
      setSelectedTerm('')
      setSectionName('')
      setSubmitted(false)
    }
  }, [open])

  // ดึงข้อมูลหลักสูตรจาก Api curriculums
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/curriculums`)
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
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getsubjectincurriculums`, {
            curriculum_id: curriculumsId
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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/curriculums/subjects/year`, {
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
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}api/project-mgt/curriculums/subjects/year/sections`,
            {
              params: { subject_id: subjectId, year: yearId }
            }
          )
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

  const handleTermChange = event => {
    setSelectedTerm(event.target.value)
  } // จัดการการเปลี่ยนแปลงค่าของ เทอม เเละ Sec

  // เช็คการรับค่าใน input
  const handleChange = (e, key, type) => {
    const { value } = e.target
    let updatedValue = value
    setSectionName(updatedValue)
  } // จัดการการเปลี่ยนแปลงค่าของ ชื่อ Section

  const handleInsertSubmit = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!subjectId || !selectedTerm || !yearId || !SectionName) {
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })

      return
    }

    const data = {
      subject_id: subjectId,
      semester: selectedTerm,
      year: yearId,
      sec_name: SectionName
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/opennewsection`, data)
      .then(response => {
        console.log(response)

        // window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'เพิ่มข้อมูลเสร็จสิ้น'
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <BootstrapDialog fullWidth onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          เปิดเซ็คชันใหม่
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* Curriculum Select */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='curriculum-label'>หลักสูตร</InputLabel>
                <Select
                  label='Curriculum'
                  value={curriculumsId}
                  onChange={handleCurriculumsChange}
                  labelId='curriculum-label'
                  error={submitted && !curriculumsId} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                >
                  {curriculumsData.map(curriculum => (
                    <MenuItem key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                      {curriculum.curriculum_short_name_th}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Subject Select */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='subject-label'>วิชา</InputLabel>
                <Select
                  label='Subject'
                  value={subjectId}
                  onChange={handleSubjectChange}
                  labelId='subject-label'
                  error={submitted && !subjectId} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
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

            {/* Year Select */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='year-label'>ปีการศึกษา</InputLabel>
                <Select
                  label='Year'
                  value={yearId}
                  onChange={handleYearChange}
                  labelId='year-label'
                  error={submitted && !yearId} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
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

            {/* Term Select */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='term-label'>เทอม/เซค</InputLabel>
                <Select
                  label='Term'
                  value={selectedTerm}
                  onChange={handleTermChange}
                  labelId='term-label'
                  error={submitted && !selectedTerm} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                  disabled={!yearId || !hasData}
                >
                  <MenuItem value={1}>เทอม 1</MenuItem>
                  <MenuItem value={2}>เทอม 2</MenuItem>
                  <MenuItem value={3}>เทอม 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Section Name TextField */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type='text'
                label='ชื่อเซ็คชั่น'
                placeholder='ระบุชื่อ'
                error={submitted && !SectionName} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                value={SectionName}
                onChange={e => {
                  //   handleSectionNameChange;
                  handleChange(e, 'sec_name', 'en')
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleInsertSubmit}>
            เพิ่ม
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
