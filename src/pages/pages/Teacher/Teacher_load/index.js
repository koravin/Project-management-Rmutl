import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// mui import
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent'

// Component Imports
import Overview_load from './Overview_load'
import Preproject_load from './Preproject_load'
import Project_load from './Project_load'
import Committee_preproject_load from './Committee_preproject_load'
import Committee_project_load from './Committee_project_load'

const Teacher_load = () => {
  const router = useRouter() // router สร้าง path

  // รับค่า id user จาก local storage
  const [user_id, setUser_Id] = useState([])

  useEffect(() => {
    // Check for CSR
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('jwtUser_id')
      setUser_Id(userID)
    }
  }, [])

  // Tab panel control
  const [value, setValue] = React.useState('1')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  // รับค่าข้อมูล Load
  const [loaddata, setLoadData] = useState([])
  const [loadPreprojectData, setLoadPreprojectData] = useState([]) //ข้อมูลโครงงาน พรีโปรเจค
  const [loadProjectData, setLoadProjectData] = useState([]) //ข้อมูลโครงงาน โปรเจค
  const [loadCommitteePreprojectData, setLoadCommitteePreprojectData] = useState([]) //ข้อมูลโครงงาน กรรมการพรีโปรเจค
  const [loadCommitteeProjectData, setLoadCommitteeProjectData] = useState([]) //ข้อมูลโครงงาน กรรมการโปรเจค
  const [overviewdata, setoverviewdata] = useState([])

  // state chang
  const [sectionState, setSectionState] = useState('false')

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/teacherload?instructor_id=${user_id}`
        )
        setLoadPreprojectData(response.data.preprojectAdviser)
        setLoadProjectData(response.data.projectAdviser)
        setLoadCommitteePreprojectData(response.data.preprojectCommittee)
        setLoadCommitteeProjectData(response.data.projectCommittee)
        setoverviewdata(response.data.loadCount)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [user_id])

  const handleSecActiveClick = async () => {
    setSectionState(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}api/project-mgt/teacherloadinsecactive?instructor_id=${user_id}`
      )

      setLoadPreprojectData(response.data.preprojectAdviser)
      setLoadProjectData(response.data.projectAdviser)
      setLoadCommitteePreprojectData(response.data.preprojectCommittee)
      setLoadCommitteeProjectData(response.data.projectCommittee)
      setoverviewdata(response.data.loadCount)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAllSecClick = async () => {
    setSectionState(false)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}api/project-mgt/teacherload?instructor_id=${user_id}`
      )

      setLoadPreprojectData(response.data.preprojectAdviser)
      setLoadProjectData(response.data.projectAdviser)
      setLoadCommitteePreprojectData(response.data.preprojectCommittee)
      setLoadCommitteeProjectData(response.data.projectCommittee)
      setoverviewdata(response.data.loadCount)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>อาจารย์</Typography>
      </Grid>

      <Grid style={{ width: '100%' }}>
        <Overview_load overviewdata={overviewdata} />
      </Grid>
      {sectionState === false ? (
        <Button
          sx={{
            marginTop: '20px',
            width: '30vh',
            height: '20',
            backgroundColor: '#00BFFF',
            '&:hover': {
              backgroundColor: '#28c7fc'
            }
          }}
          variant='contained'
          onClick={() => handleSecActiveClick()}
        >
          <TipsAndUpdatesIcon /> แสดง Section ที่เปิด
        </Button>
      ) : (
        <Button
          sx={{
            marginTop: '20px',
            width: '32vh',
            height: '20',
            backgroundColor: '#b23c17',
            '&:hover': {
              backgroundColor: '#ff5722'
            }
          }}
          variant='contained'
          onClick={() => handleAllSecClick()}
        >
          <TipsAndUpdatesIcon sx={{ color: 'black' }} /> แสดง Section ทั้งหมด
        </Button>
      )}

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
              <Tab label='วิชาเตรียมโครงการ' value='1' />
              <Tab label='วิชาโครงการ' value='2' />
              <Tab label='กรรมการ วิชาเตรียมโครงการ' value='3' />
              <Tab label='กรรมการ วิชาโครงการ' value='4' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Preproject_load loadPreprojectData={loadPreprojectData} />
          </TabPanel>
          <TabPanel value='2'>
            <Project_load loadProjectData={loadProjectData} />
          </TabPanel>
          <TabPanel value='3'>
            <Committee_preproject_load loadCommitteePreprojectData={loadCommitteePreprojectData} />
          </TabPanel>
          <TabPanel value='4'>
            <Committee_project_load loadCommitteeProjectData={loadCommitteeProjectData} />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Teacher_load
