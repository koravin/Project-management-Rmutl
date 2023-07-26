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
  // เก็บตัวแปร Edit
  const [editData, setEditData] = useState([])

  // console.log(editData.PreprojectData[0].curriculum_id)

  // ตัวแปร เก็บ ค่า เพื่อส่งไปในฟอร์ม
  const [curriculumsId, setCurriculumsId] = useState('') // เก็บข้อมูลหลักสูตร

  // รับค่าข้อมูลจาก Api
  const [curriculumsData, setCurriculumsData] = useState([]) // รับข้อมูลหลักสูตร

  // ดึงข้อมูล Api มา Set form Edit
  useEffect(() => {
    const fetchEditData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preproject?preproject_id=205`)
        setEditData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEditData()
  }, [])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของค่าใน Select dropdown
  const handleCurriculumsChange = event => {
    setCurriculumsId(event.target.value)

    // You can perform additional actions here based on the selected curriculum, if needed.
  }

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

  return (
    <div>
      {/* Display Edit Data */}
      <div>{/* You can display editData here if needed */}</div>
      {/* Curriculum Select */}
      <Grid item xs={12} sm={6}>
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
    </div>
  )
}

export default EditCurriculumTest
