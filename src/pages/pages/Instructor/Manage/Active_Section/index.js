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

// Dialog import

const Active_Section = () => {
  const router = useRouter() // router สร้าง path

  // รับค่าข้อมูล Api
  const [sectionData, setSectionData] = useState([])
  console.log('sectionData', sectionData)

  // รับค่าข้อมูลจาก Api Active Section
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/secs_active`)
        setSectionData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // Table preproject colum
  const Preproject_columns = [
    { field: 'subject_code', headerName: 'Subject Code', width: 120 },
    { field: 'section_name', headerName: 'Section Name', width: 150 },
    {
      field: 'sec_status',
      headerName: 'Sec Status',
      width: 120,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์
        let statusText
        let statusColor
        let bgColor

        if (value === '0') {
          statusText = 'Unactive'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'Active'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else {
          statusText = value
          bgColor = value
        }

        return (
          <div
            style={{
              color: statusColor,
              backgroundColor: bgColor,
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '2px',
              paddingBottom: '2px',
              fontSize: '11px',
              borderRadius: '50px'
            }}
          >
            {statusText}
          </div>
        )
      }
    },
    {
      field: 'Upload_Document',
      headerName: 'Detail',
      width: 130,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleViewPreprojectInSectinData(cellValues.row)}>
            view
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // Table project colum
  const Project_columns = [
    { field: 'subject_code', headerName: 'Subject Code', width: 120 },
    { field: 'section_name', headerName: 'Section Name', width: 150 },
    {
      field: 'sec_status',
      headerName: 'Sec Status',
      width: 120,
      renderCell: params => {
        const value = params.value // ค่าในคอลัมน์
        let statusText
        let statusColor
        let bgColor

        if (value === '0') {
          statusText = 'Unactive'
          statusColor = 'white'
          bgColor = '#f44336'
        } else if (value === '1') {
          statusText = 'Active'
          statusColor = 'white'
          bgColor = '#4caf50'
        } else {
          statusText = value
          bgColor = value
        }

        return (
          <div
            style={{
              color: statusColor,
              backgroundColor: bgColor,
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '2px',
              paddingBottom: '2px',
              fontSize: '11px',
              borderRadius: '50px'
            }}
          >
            {statusText}
          </div>
        )
      }
    },
    {
      field: 'Upload_Document',
      headerName: 'Detail',
      width: 130,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleViewProjectInSectinData(cellValues.row)}>
            view
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // ฟังก์ชันย้ายหน้า ตาราง pre project
  const handleViewPreprojectInSectinData = row => {
    router.push({
      pathname: '/pages/Instructor/Manage/Preproject_In_Section',
      query: { rowData: JSON.stringify(row) }
    })
  }

  // ฟังก์ชันย้ายหน้า ตาราง project
  const handleViewProjectInSectinData = row => {
    router.push({
      pathname: '/pages/Instructor/Manage/Project_In_Section',
      query: { rowData: JSON.stringify(row) }
    })
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
          {/* datagrid content 01 */}
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            <Typography variant='h6'>Pre project section</Typography>
          </Grid>
          <Box sx={{ height: '100%', width: '100%' }}>
            <Card style={{ padding: '5px' }}>
              {sectionData && sectionData.length > 0 ? (
                <DataGrid
                  rows={sectionData.filter(row => row.subject_type === '1')}
                  columns={Preproject_columns}
                  getRowId={row => row.section_id}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10
                      }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                />
              ) : (
                <p>Nodata</p>
              )}
            </Card>
          </Box>
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
          {/* datagrid content 02 */}
          <Grid item xs={12} sx={{ paddingBottom: 4 }}>
            <Typography variant='h6'>Project section</Typography>
          </Grid>
          <Box sx={{ height: '100%', width: '100%' }}>
            <Card style={{ padding: '5px' }}>
              {sectionData && sectionData.length > 0 ? (
                <DataGrid
                  rows={sectionData.filter(row => row.subject_type === '2')}
                  columns={Project_columns}
                  getRowId={row => row.section_id}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10
                      }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                />
              ) : (
                <p>Nodata</p>
              )}
            </Card>
          </Box>
        </Box>
      </Grid>
    </div>
  )
}

export default Active_Section
