import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [allAdvisorSubValues, setAllAdvisorSubValues] = useState([]) // เก็บข้อมูลอาจารย์ที่ปรึกษารอง

  // รับค่าข้อมูลจาก Api
  const [teacherData, setTeacherData] = useState([]) // รับข้อมูลชื่ออาจารย์

  // ดึงข้อมูล Api มา Set form Edit
  useEffect(() => {
    const fetchEditData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=210`)
        console.log(response.data.PreprojectSubAdviser)
        console.log(response.data.PreprojectSubAdviser[0].instructor_id)

        //--------------------------------------เซตค่าเริ่มต้นให้ Sub Advisors--------------------------------------------//
        setSelectedValueAdvisorSub(response.data.PreprojectSubAdviser[0].instructor_id)

        // ใช้ slice() เพื่อเลือกข้อมูลใน Array ตั้งแต่ช่องที่ 1 เป็นต้นไป
        const subAdvisersFromSecondElement = response.data.PreprojectSubAdviser.slice(1)

        // เซ็ตค่าเริ่มต้นให้กับ state additionalSubAdvisorForms
        const initialSubAdvisorIds = subAdvisersFromSecondElement.map(subAdvisor => subAdvisor.instructor_id)
        setAdditionalSubAdvisorForms(initialSubAdvisorIds)

        //--------------------------------------จบการเซตค่าเริ่มต้นให้ Sub Advisors--------------------------------------------//
      } catch (error) {
        console.error(error)
      }
    }

    fetchEditData()
  }, [])

  // ดึงข้อมูล อาจารย์ จาก Api
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/instructors`)
        const teacherData = response.data.data || []
        setTeacherData(teacherData)
        setSelectableSubTeachers(teacherData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTeacherData()
  }, [])

  //-----------------------ฟังชันเก็บค่าอาจารย์ที่ปรึกษารอง(Select)----------------------//
  const [selectedValueAdvisorSub, setSelectedValueAdvisorSub] = useState('')
  const [selectableSubTeachers, setSelectableSubTeachers] = useState([])
  const [additionalSubAdvisorForms, setAdditionalSubAdvisorForms] = useState([])
  useEffect(() => {
    const updatedAllAdvisorSubValues = [selectedValueAdvisorSub, ...additionalSubAdvisorForms].filter(
      value => value !== ''
    )
    setAllAdvisorSubValues(updatedAllAdvisorSubValues)
  }, [selectedValueAdvisorSub, additionalSubAdvisorForms])

  const handleAddSubAdvisorData = () => {
    setAdditionalSubAdvisorForms(prevForms => {
      const updatedForms = [...prevForms, '']

      return Array.from(new Set(updatedForms))
    })
  }

  const handleClearSubAdvisorData = () => {
    setAdditionalSubAdvisorForms([])
  }

  const handleSubAdvisorChange = event => {
    setSelectedValueAdvisorSub(event.target.value)
  }

  const handleAdditionalSubAdvisorChange = (event, formIndex) => {
    const selectedSubAdvisor = event.target.value
    setAdditionalSubAdvisorForms(prevForms => {
      const updatedForms = [...prevForms]
      updatedForms[formIndex] = selectedSubAdvisor

      const updatedAllAdvisorSubValues = [selectedValueAdvisorSub, ...updatedForms].filter(value => value !== '')
      setAllAdvisorSubValues(updatedAllAdvisorSubValues)

      return Array.from(new Set(updatedForms))
    })
  }

  const AdditionalSubAdvisorForm = ({ formIndex, selectedOptions }) => {
    const additionalSubAdvisor = additionalSubAdvisorForms[formIndex]

    return (
      <FormControl fullWidth style={{ marginTop: '15px' }}>
        <InputLabel id={`additional-sub-advisor-label-${formIndex}`}>Additional Sub Advisor {formIndex + 1}</InputLabel>
        <Select
          label={`additional sub advisor ${formIndex + 1}`}
          labelId={`additional-sub-advisor-label-${formIndex}`}
          value={additionalSubAdvisor || ''}
          onChange={event => handleAdditionalSubAdvisorChange(event, formIndex)}
        >
          {selectableSubTeachers.map(contentTeacher => (
            <MenuItem
              key={contentTeacher.instructor_id}
              value={contentTeacher.instructor_id}
              disabled={allAdvisorSubValues.includes(contentTeacher.instructor_id)}
            >
              {contentTeacher.instructors_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  //-----------------------จบฟังชันเก็บค่าอาจารย์ที่ปรึกษารอง(Select)----------------------//

  return (
    <div>
      {/* Display Edit Data */}
      <div>{/* You can display editData here if needed */}</div>
      {/* Curriculum Select */}
      {/* Sub Advisor Select */}
      <Grid item xs={12} sm={12}>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          ชื่ออาจารย์ที่ปรึกษารอง**
        </Typography>
        <Grid container justifyContent='flex-end' alignItems='center'>
          <Grid item>
            <Button size='small' onClick={handleAddSubAdvisorData}>
              เพิ่มข้อมูล
            </Button>
          </Grid>
          <Grid item>
            <Button size='small' onClick={handleClearSubAdvisorData}>
              ล้างข้อมูล
            </Button>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <InputLabel id='sub-advisor-label'>Sub Advisor</InputLabel>
          <Select
            label='Sub Advisor'
            labelId='sub-advisor-label'
            value={selectedValueAdvisorSub || ''}
            onChange={handleSubAdvisorChange}
          >
            {selectableSubTeachers.map(contentTeacher => (
              <MenuItem
                key={contentTeacher.instructor_id}
                value={contentTeacher.instructor_id}
                disabled={additionalSubAdvisorForms.includes(contentTeacher.instructor_id)}
              >
                {contentTeacher.instructors_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {additionalSubAdvisorForms.map((_, index) => (
          <AdditionalSubAdvisorForm key={index} formIndex={index} selectedOptions={additionalSubAdvisorForms} />
        ))}
      </Grid>
    </div>
  )
}

export default EditCurriculumTest
