import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Button, Grid, TextField, Typography, FormControl } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

export default function Test() {
  const [allStudentValues, setAllStudentValues] = useState([])
  const [allStudent, setAllStudent] = useState([])
  const [selectedValueStudent, setSelectedValueStudent] = useState('')
  const [selectStudent, setSelectStudent] = useState([])
  const [additionalStudentForms, setAdditionalStudentForms] = useState([])

  //ตัวรี Input
  const autocompleteRef = useRef()

  console.log(allStudent)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:3200/api/project-mgt/students')
        setSelectStudent(response.data.data || [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudentData()
  }, [])

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
    return option
      ? `${option.prefix} ${option.studen_first_name} ${option.studen_last_name} ${option.studen_number}`
      : ''
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
      <Typography variant='body2' sx={{ fontWeight: 600 }}>
        รายชื่อนักศึกษา
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
          <Autocomplete
            id='student-label'
            value={selectedValueStudent === '' ? null : selectedValueStudent} // กำหนด value เป็น null หาก selectedValueStudent เป็นค่าว่าง
            onChange={handleStudentChange}
            options={selectStudent}
            getOptionLabel={getOptionLabel}
            renderInput={params => <TextField {...params} label='Student' />}
          />
        </FormControl>
      </Grid>
      {additionalStudentForms.map((_, index) => (
        <AdditionalStudentForm key={index} formIndex={index} />
      ))}
    </div>
  )
}
