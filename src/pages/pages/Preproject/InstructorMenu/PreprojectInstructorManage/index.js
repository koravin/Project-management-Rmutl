import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

function PreprojectInstructorManage() {
  const router = useRouter() // router สร้าง path
  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])
  console.log(projectdata)

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'project_code', headerName: 'ID', width: 120 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    { field: 'preproject_name_eng', headerName: 'ชื่อโครงงาน(ภาษาอังกฤษ)', width: 300 },
    { field: 'YearColum', headerName: 'ปีการศึกษา / เทอม / Sec', width: 200 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      renderCell: cellValues => {
        return <Button variant='text'>...</Button>
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preprojects`)

        const projects = response.data.data.map(project => ({
          ...project,
          YearColum: `${project.sem_year} / ${project.semester_order} / ${project.section_name}`
        }))
        setProjectData(projects)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* ปุ่ม Insert project */}
      <Button
        sx={{ marginBottom: '10px', width: '15vh', height: '20' }}
        variant='contained'
        onClick={() => {
          router.push(`#`)
        }}
      >
        เพิ่มข้อมูล
      </Button>
      <Box sx={{ height: 400, width: '100%' }}>
        {/* เช็คค่าว่างของข้อมูลก่อนที่จะทำการ map */}
        {projectdata.length === 0 ? (
          <p>No Data</p>
        ) : (
          <DataGrid
            rows={projectdata}
            columns={columns}
            getRowId={row => row.preproject_id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </div>
  )
}

export default PreprojectInstructorManage
