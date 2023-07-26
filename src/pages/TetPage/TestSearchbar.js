import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'

export default function Searchbar(options) {
  // ** สถานะ (States)
  const [course, setCourse] = useState('')
  const [Subject, setSubject] = useState('')
  const [year, setYear] = useState('')
  const [semester, setSemester] = useState('')
  const [sec, setSec] = useState('')

  // การจัดการเมื่อเลือกเมนูดรอปดาวน์ (Select)
  const handleSelectChange = event => {
    const { name, value } = event.target
    switch (name) {
      case 'course':
        setCourse(value)
        break
      case 'Subject':
        setSubject(value)
        break
      case 'year':
        setYear(value)
        break
      case 'semester':
        setSemester(value)
        break
      case 'sec':
        setSec(value)
        break
      default:
        break
    }
  }

  return (
    <div>
      <div style={{ minWidth: 300, maxWidth: 'auto', margin: 'auto', marginTop: 30, padding: 5 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2.5}>
              <FormControl fullWidth>
                <InputLabel id='course-select-label'>Course</InputLabel>
                <Select
                  label='Course'
                  value={course}
                  onChange={handleSelectChange}
                  name='course'
                  id='course-select'
                  labelId='course-select-label'
                >
                  <MenuItem value='Math'>Math</MenuItem>
                  <MenuItem value='Science'>Science</MenuItem>
                  {/* Add more courses as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2.5}>
              <FormControl fullWidth>
                <InputLabel id='Subject-select-label'>Subject</InputLabel>
                <Select
                  label='Subject'
                  value={Subject}
                  onChange={handleSelectChange}
                  name='Subject'
                  id='Subject-select'
                  labelId='Subject-select-label'
                >
                  <MenuItem value='Bill'>Bill</MenuItem>
                  <MenuItem value='Karbill'>Karbill</MenuItem>
                  {/* Add more Subject as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='year-select-label'>Year</InputLabel>
                <Select
                  label='Year'
                  value={year}
                  onChange={handleSelectChange}
                  name='year'
                  id='year-select'
                  labelId='year-select-label'
                >
                  <MenuItem value='1'>Year 1</MenuItem>
                  <MenuItem value='2'>Year 2</MenuItem>
                  {/* Add more years as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='semester-select-label'>Semester</InputLabel>
                <Select
                  label='Semester'
                  value={semester}
                  onChange={handleSelectChange}
                  name='semester'
                  id='semester-select'
                  labelId='semester-select-label'
                >
                  <MenuItem value='1'>Semester 1</MenuItem>
                  <MenuItem value='2'>Semester 2</MenuItem>
                  {/* Add more semesters as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='sec-select-label'>Sec</InputLabel>
                <Select
                  label='Sec'
                  value={sec}
                  onChange={handleSelectChange}
                  name='sec'
                  id='sec-select'
                  labelId='sec-select-label'
                >
                  <MenuItem value='A'>Sec A</MenuItem>
                  <MenuItem value='B'>Sec B</MenuItem>
                  {/* Add more sections as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* ปุ่ม Search */}
              <Button size='large' color='success' variant='outlined'>
                Go
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </div>
  )
}
