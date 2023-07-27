import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// MUI Import
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'

const EditCurriculumTest = () => {
  //เก็บตัวแปรนักเรียน
  const [allStudentValues, setAllStudentValues] = useState([]) // เก็บข้อมูลนักเรียนทั้งหมด(ใช้อันนี้บัคเยอะนะ)
  const [allStudent, setAllStudent] = useState([]) // รับ Id นักเรียนเพื่อส่งฟอร์ม

  // ดึงข้อมูล Api มา Set form Edit
  useEffect(() => {
    const fetchEditData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=210`)
        console.log(response.data.PreprojectSubAdviser)
        console.log(response.data)
        console.log(response.data.PreprojectStudent[0].studen_id)

        //--------------------------------------เซตค่าเริ่มต้นให้ Student--------------------------------------------//

        setSelectedValueStudent(response.data.PreprojectStudent[0].studen_id)

        // ใช้ slice() เพื่อเลือกข้อมูลใน Array ตั้งแต่ช่องที่ 1 เป็นต้นไป
        const StudentFromSecondElement = response.data.PreprojectStudent.slice(1)

        // เซ็ตค่าเริ่มต้นให้กับ state additionalSubAdvisorForms
        const initialStudent = StudentFromSecondElement.map(student => student.studen_id)
        setAdditionalStudentForms(initialStudent)
        console.log(initialStudent)

        //--------------------------------------จบการเซตค่าเริ่มต้นให้ Student--------------------------------------------//
      } catch (error) {
        console.error(error)
      }
    }

    fetchEditData()
  }, [])

  // ดึงข้อมูล นักเรียนจาก Api
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/students`)
        const studentData = response.data.data || []
        setSelectStudent(studentData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudentData()
  }, [])

  //------------------------------ฟังชันเก็บค่านักศึกษา (Autocom)--------------------------//
  const [selectedValueStudent, setSelectedValueStudent] = useState('')
  const [selectStudent, setSelectStudent] = useState([])
  const [additionalStudentForms, setAdditionalStudentForms] = useState([])

  //ตัวรี Input
  const autocompleteRef = useRef()

  useEffect(() => {
    const updatedAllStudentValues = [selectedValueStudent, ...additionalStudentForms].filter(value => value !== '')
    setAllStudentValues(updatedAllStudentValues)
  }, [selectedValueStudent, additionalStudentForms])

  useEffect(() => {
    const updatedAllStudent = allStudentValues.map(value => value?.studen_id).filter(id => id !== undefined)
    setAllStudent(updatedAllStudent)
  }, [allStudentValues])

  const handleAddStudentData = () => {
    setAdditionalStudentForms(prevForms => Array.from(new Set([...prevForms, ''])))
  }

  const handleClearStudentData = () => {
    setSelectedValueStudent('')
    setAdditionalStudentForms([])

    // เคลียร์ค่าที่แสดงในกล่อง input ของ Autocomplete ด้วยการกำหนดค่าว่าง
    if (autocompleteRef.current) {
      autocompleteRef.current.value = ''
    }
  }

  const handleStudentChange = (_, value) => {
    setSelectedValueStudent(value)
  }

  const handleAdditionalStudentChange = (_, value, formIndex) => {
    setAdditionalStudentForms(prevForms => {
      const updatedForms = [...prevForms]
      updatedForms[formIndex] = value
      const updatedAllStudentValues = [selectedValueStudent, ...updatedForms].filter(value => value !== '')
      setAllStudentValues(updatedAllStudentValues)

      return Array.from(new Set(updatedForms))
    })
  }

  const getOptionLabel = option => {
    if (!option) return ''

    const selectedStudent = selectStudent.find(student => student.studen_id === option)

    if (selectedStudent) {
      return `${selectedStudent.prefix} ${selectedStudent.studen_first_name} ${selectedStudent.studen_last_name} ${selectedStudent.studen_number}`
    }

    if (option) {
      return `${option.prefix} ${option.studen_first_name} ${option.studen_last_name} ${option.studen_number}`
    }

    return ''
  }

  const AdditionalStudentForm = ({ formIndex }) => {
    return (
      <FormControl fullWidth style={{ marginTop: '15px' }}>
        <Autocomplete
          id={`additional-student-label-${formIndex}`}
          value={additionalStudentForms[formIndex] || null}
          onChange={(event, newValue) => handleAdditionalStudentChange(event, newValue, formIndex)}
          options={selectStudent}
          getOptionLabel={getOptionLabel}
          renderInput={params => <TextField {...params} label={`additional student ${formIndex + 1}`} />}
        />
      </FormControl>
    )
  }

  return (
    <div>
      {/* Display Edit Data */}
      <div>{/* You can display editData here if needed */}</div>
      {/* Student Select */}
      <Grid item xs={12} sm={12}>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          รายชื่อนักศึกษา**
        </Typography>
        <Grid container justifyContent='flex-end' alignItems='center'>
          <Grid item>
            <Button size='small' onClick={handleAddStudentData}>
              เพิ่มข้อมูล
            </Button>
          </Grid>
          <Grid item>
            <Button size='small' onClick={handleClearStudentData}>
              ล้างข้อมูล
            </Button>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <FormControl fullWidth>
            <Autocomplete
              id='student-label'
              value={selectedValueStudent === '' ? null : selectedValueStudent}
              onChange={handleStudentChange}
              options={selectStudent}
              getOptionLabel={getOptionLabel}
              renderInput={params => <TextField {...params} label='Student' />}
            />
          </FormControl>
        </FormControl>
        {additionalStudentForms.map((_, index) => (
          <AdditionalStudentForm key={index} formIndex={index} />
        ))}
      </Grid>
    </div>
  )
}

export default EditCurriculumTest
