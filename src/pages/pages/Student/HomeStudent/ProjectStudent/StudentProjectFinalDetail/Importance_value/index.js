import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CardHeader from '@mui/material/CardHeader'
import PersonIcon from '@mui/icons-material/Person'
import SyncIcon from '@mui/icons-material/Sync'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { IconButton, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import { styled } from '@mui/system'
import Autocomplete from '@mui/material/Autocomplete'

function Importance_value({ project_id }) {
  const router = useRouter() // router สร้าง path
  const requestdata = project_id

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // เก็บค่าข้อมูล Input
  const [selectedSubject01, setSelectedSubject01] = useState('')
  const [selectedSubject02, setSelectedSubject02] = useState('')
  const [prioritySubject01, setPrioritySubject01] = useState('')
  const [prioritySubject02, setPrioritySubject02] = useState('')

  // ฟังชันเก็บค่าข้อมูล Input
  const handleSelectedSubject01 = (event, value) => {
    try {
      setSelectedSubject01(value ? value.subject_id : null)
    } catch (error) {
      console.error('Error in handleSelectedSubject01:', error)
    }
  }

  const handleSelectedSubject02 = (event, value) => {
    try {
      setSelectedSubject02(value ? value.subject_id : null)
    } catch (error) {
      console.error('Error in handleSelectedSubject02:', error)
    }
  }

  const handlePrioritySubject01 = event => {
    setPrioritySubject01(event.target.value)
  }

  const handlePrioritySubject02 = event => {
    setPrioritySubject02(event.target.value)
  }

  // ปุ่ม Reset
  const handleReset = () => {
    setSelectedSubject01('')
    setSelectedSubject02('')
    setPrioritySubject01('')
    setPrioritySubject02('')
  }

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])
  const [curriculumdata, setCurriculumData] = useState([])
  const [projectTypeData, setprojectTypeData] = useState([])
  const [subjectData, setSubjectData] = useState([])

  //----------------------------Api request---------------------------------//

  // ดึงข้อมูล วิชา
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/subject_general`, {
          params: {
            curriculum_id: curriculumdata
          }
        })

        setSubjectData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStudentData()
  }, [curriculumdata])

  // รับค่าข้อมูลโครงงาน Api หาค่า Curiculum
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/project?project_id=${requestdata}`
        )
        setCurriculumData(response.data.PreprojectData[0].curriculum_id)

        if (response.data.Projectpotential && response.data.Projectpotential.length > 0) {
          setSelectedSubject01(response.data.Projectpotential[0]?.subject_id || '')
          setPrioritySubject01(response.data.Projectpotential[0]?.weight || '')
          setSelectedSubject02(response.data.Projectpotential[1]?.subject_id || '')
          setPrioritySubject02(response.data.Projectpotential[1]?.weight || '')
        } else {
          setSelectedSubject01('')
          setPrioritySubject01('')
          setSelectedSubject02('')
          setPrioritySubject02('')
        }

        // setProjectData()
      } catch (error) {
        console.error(error)
      }
    }

    fetcData()
  }, [requestdata])

  // ส่งค่าข้อมูล
  const handleInsertSubmit = async e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (!selectedSubject01 || !selectedSubject02 || !prioritySubject01 || !prioritySubject02) {
      alert('คุณกรอกข้อมูลไม่ครบ')

      return
    }

    // สร้างอาร์เรย์ของข้อมูลที่จะส่ง
    const dataArray = [
      {
        project_id: requestdata,
        subject_id: selectedSubject01,
        weight: prioritySubject01
      },
      {
        project_id: requestdata,
        subject_id: selectedSubject02,
        weight: prioritySubject02
      }
    ]

    try {
      // ส่งข้อมูลทั้งหมดในลูป
      const responses = await Promise.all(
        dataArray.map((data, index) =>
          axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/addprojectpotentials`, data)
        )
      )

      console.log(responses)

      let hasError = false

      responses.forEach(response => {
        if (!hasError && response.data.message === "Can't Add New Potentials In This Project") {
          alert('ไม่สามารถเพิ่มข้อมูลได้')
          hasError = true

          return
        }
      })

      if (hasError) {
        return
      }
      alert('ส่งข้อมูลเสร็จสิ้น')
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล')
    }
  }

  return (
    <div>
      <Grid>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: '75%' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, display: 'flex', justifyContent: 'center', mt: 5 }}>
              กรุณาเลือกวิชาที่เกี่ยวข้องกับโครงงาน 2วิชา และ ระบุค่าความสำคัญของวิชานั้นต่อโครงการ
            </Typography>
            <CardContent>
              {/* <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  เลือก
                </Typography>
              </Grid> */}
              <Grid container spacing={2} sx={{ mt: 3 }}>
                {/*  เลือกวิชา 1 */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={subjectData || []}
                      getOptionLabel={subject => subject.subject_name_th}
                      onChange={(event, value) => handleSelectedSubject01(event, value)}
                      value={
                        subjectData !== undefined
                          ? subjectData.find(subject => subject.subject_id === selectedSubject01) || null
                          : null
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='เลือกวิชา'
                          disabled={!subjectData || subjectData.length === 0}
                          helperText={!subjectData || subjectData.length === 0 ? 'ไม่พบข้อมูล' : ''}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* ค่าความสำคัญ 1 */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='term-label'>ค่าความสำคัญ</InputLabel>
                    <Select
                      label='ค่าความสำคัญของวิชา'
                      defaultValue=''
                      id='select-04'
                      labelId='Project-p'
                      onChange={handlePrioritySubject01}
                      value={prioritySubject01}
                    >
                      <MenuItem value={1}>มาก</MenuItem>
                      <MenuItem value={2}>ปานกลาง</MenuItem>
                      <MenuItem value={3}>น้อย</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/*  เลือกวิชา 2 */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={subjectData || []}
                      getOptionLabel={subject => subject.subject_name_th}
                      onChange={(event, value) => handleSelectedSubject02(event, value)}
                      value={
                        selectedSubject02 !== undefined
                          ? subjectData?.find(subject => subject.subject_id === selectedSubject02) || null
                          : null
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='เลือกวิชา'
                          disabled={!subjectData || subjectData.length === 0}
                          helperText={!subjectData || subjectData.length === 0 ? 'ไม่พบข้อมูล' : ''}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                {/* ค่าความสำคัญ 2 */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='term-label'>ค่าความสำคัญ</InputLabel>
                    <Select
                      label='ค่าความสำคัญของวิชา'
                      defaultValue=''
                      id='select-04'
                      labelId='Project-p2'
                      onChange={handlePrioritySubject02}
                      value={prioritySubject02}
                    >
                      <MenuItem value={1}>มาก</MenuItem>
                      <MenuItem value={2}>ปานกลาง</MenuItem>
                      <MenuItem value={3}>น้อย</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* เลือกค่าความสำคัญ 1 */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant='contained' color='primary' endIcon={<SendIcon />} onClick={handleInsertSubmit}>
                  ส่งข้อมูล
                </Button>

                <Button
                  variant='outlined'
                  color='warning'
                  sx={{ ml: 2 }}
                  onClick={handleReset}
                  startIcon={<RefreshIcon />}
                >
                  รีเซ็ตข้อมูล
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  )
}

export default Importance_value
