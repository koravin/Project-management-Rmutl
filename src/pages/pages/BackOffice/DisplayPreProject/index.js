import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

// import sweetalert2 popup
import Swal from 'sweetalert2'

function ProprojectDisplay() {
  const router = useRouter() // router สร้าง path
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // รับค่าข้อมูลโปรเจค
  const [projectdata, setProjectData] = useState([])

  // ส่งค่าจากแถวไปหน้า Edit
  const handleEditClick = projectId => {
    router.push(`/pages/BackOffice/DisplayPreProject/PreprojectEditForm/?id=${projectId}`)
  }

  // ส่งค่าจากแถวไปหน้า Edit
  const handleDetailClick = projectId => {
    router.push(`/pages/BackOffice/DisplayPreProject/PreprojectDetail/?id=${projectId}`)
  }

  // ฟังก์ชันสำหรับ Delete DATA
  const handleDeleteSubmit = projectId => {
    console.log(projectId)

    const data = {
      preproject_id: projectId
    }

    if (projectId !== '') {
      axios
        .put(`${process.env.NEXT_PUBLIC_API}api/project-mgt/deletepreproject`, data)
        .then(function (response) {
          console.log(response)

          // หากลบข้อมูลสำเร็จให้แสดง popup แจ้งเตือนด้วย Swal
          Swal.fire({
            icon: 'success',
            title: 'ลบข้อมูลแล้วเสร็จ',
            text: 'น้องซาอาระน่ารักเกินไป'
          })

          // อัปเดต State ของตารางใหม่เมื่อมีการลบข้อมูล
          setProjectData(prevData => prevData.filter(project => project.preproject_id !== projectId))
        })
        .catch(function (error) {
          console.log(error)

          // หากเกิดข้อผิดพลาดในการลบข้อมูลให้แสดง popup แจ้งเตือนด้วย Swal
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถลบข้อมูลได้'
          })
        })
    } else {
      console.log('not have any id to delete')
    }
  }

  // ประกาศ Colum DataGrid
  const columns = [
    { field: 'project_code', headerName: 'ID', width: 120 },
    { field: 'preproject_name_th', headerName: 'ชื่อโครงงาน(ภาษาไทย)', width: 300 },
    { field: 'preproject_name_eng', headerName: 'ชื่อโครงงาน(ภาษาอังกฤษ)', width: 300 },
    { field: 'YearColum', headerName: 'ปีการศึกษา / เทอม / Sec', width: 200 },
    {
      field: 'Detail',
      headerName: 'Detail',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDetailClick(cellValues.row.preproject_id)}>
            ...
          </Button>
        )
      }
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleEditClick(cellValues.row.preproject_id)}>
            ...
          </Button>
        )
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDeleteSubmit(cellValues.row.preproject_id)}>
            ...
          </Button>
        )
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/preprojects`)

        const projects = response.data.data.map(project => ({
          ...project,
          YearColum: `${project.sem_year}/${project.semester_order}/${project.section_name}`
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
          router.push(`/pages/BackOffice/DisplayPreProject/PreprojectInsertForm/`)
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

export default ProprojectDisplay
