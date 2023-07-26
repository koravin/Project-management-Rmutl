import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Grid, MenuItem, InputLabel, Typography, FormControl, Select } from '@mui/material'

export default function Test() {
  const [allStudentValues, setAllStudentValues] = useState([]) // เก็บข้อมูลนักศึกษา
  const [selectedValueStudent, setSelectedValueStudent] = useState('')
  const [selectStudent, setSelectStudent] = useState([])
  const [additionalStudentForms, setAdditionalStudentForms] = useState([])

  console.log(allStudentValues)

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/project-mgt/instructors')
        const teacherData = response.data.data || []
        setSelectStudent(teacherData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTeacherData()
  }, [])

  useEffect(() => {
    const updatedAllStudentValues = [selectedValueStudent, ...additionalStudentForms].filter(value => value !== '')
    setAllStudentValues(updatedAllStudentValues)
  }, [selectedValueStudent, additionalStudentForms])

  const handleAddStudentData = () => {
    setAdditionalStudentForms(prevForms => {
      const updatedForms = [...prevForms, '']

      return Array.from(new Set(updatedForms))
    })
  }

  const handleClearStudentData = () => {
    setAdditionalStudentForms([])
  }

  const handleStudentChange = event => {
    setSelectedValueStudent(event.target.value)
  }

  const handleAdditionalStudentChange = (event, formIndex) => {
    const selectedStudent = event.target.value
    setAdditionalStudentForms(prevForms => {
      const updatedForms = [...prevForms]
      updatedForms[formIndex] = selectedStudent

      const updatedAllStudentValues = [selectedValueStudent, ...updatedForms].filter(value => value !== '')
      setAllStudentValues(updatedAllStudentValues)

      return Array.from(new Set(updatedForms))
    })
  }

  const AdditionalStudentForm = ({ formIndex }) => {
    const additionalStudent = additionalStudentForms[formIndex]

    return (
      <FormControl fullWidth style={{ marginTop: '15px' }}>
        <InputLabel id={`additional-student-label-${formIndex}`}>Additional Student {formIndex + 1}</InputLabel>
        <Select
          label={`additional student ${formIndex + 1}`}
          labelId={`additional-student-label-${formIndex}`}
          value={additionalStudent || ''}
          onChange={event => handleAdditionalStudentChange(event, formIndex)}
        >
          {selectStudent.map(contentTeacher => (
            <MenuItem
              key={contentTeacher.instructor_id}
              value={contentTeacher.instructor_id}
              disabled={allStudentValues.includes(contentTeacher.instructor_id)}
            >
              {contentTeacher.instructors_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <div>
      <Typography variant='body2' sx={{ fontWeight: 600 }}>
        ชื่อคณะกรรมการ**
      </Typography>
      <Grid item xs={12} sm={12}>
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
          <InputLabel id='student-label'>Student</InputLabel>
          <Select
            label='Student'
            labelId='student-label'
            value={selectedValueStudent || ''}
            onChange={handleStudentChange}
          >
            {selectStudent.map(contentTeacher => (
              <MenuItem
                key={contentTeacher.instructor_id}
                value={contentTeacher.instructor_id}
                disabled={additionalStudentForms.includes(contentTeacher.instructor_id)}
              >
                {contentTeacher.instructors_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {additionalStudentForms.map((_, index) => (
        <AdditionalStudentForm key={index} formIndex={index} />
      ))}
    </div>
  )
}
