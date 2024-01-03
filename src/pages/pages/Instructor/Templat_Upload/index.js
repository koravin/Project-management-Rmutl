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

// Dialog import
import InsertSection from '../Section_Mg/InsertSection'

const Templat_Upload = () => {
  const router = useRouter() // router สร้าง path

  // รับค่าข้อมูล Api
  const [sectionData, setSectionData] = useState([])

  // dialog control
  const [openDialog, setOpenDialog] = React.useState(false)

  // useRef สำหรับเก็บค่า openDialog
  // เก็บ State Dialog Insert
  const openDialogRef = useRef(openDialog)
  openDialogRef.current = openDialog

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/sections`)
        setSectionData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openDialog) {
      fetchData()
    }
  }, [openDialog])

  // Table colum
  const columns = [
    { field: 'curriculum_name_en', headerName: 'Curriculum', width: 300 },
    { field: 'subject_code', headerName: 'Subject Code', width: 120 },
    { field: 'subject_name_en', headerName: 'Subject Name', width: 300 },
    {
      field: 'subject_type',
      headerName: 'Subject Type',
      width: 100,
      renderCell: params => <span>{params.value === '1' ? 'pre-project' : params.value === '2' ? 'project' : ''}</span>
    },
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
      field: 'Chang_Status',
      headerName: 'Chang Status',
      width: 150,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleChangSectionStatusClick(cellValues.row)}>
            ...
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // New Section button click
  const handleNewSectionClick = () => {
    handleClickOpenDialog() // เปิดใช้งาน Dialog เมื่อคลิกที่ปุ่ม New Section
  }

  // Chang Section Status button click
  const handleChangSectionStatusClick = rowData => {
    handleClickChangStatusDialog()
    setSelectedRowData(rowData) // กำหนดข้อมูลของแถวที่ถูกคลิกให้ state
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Document Templat</Typography>
      </Grid>

      {/* Header card */}
      <Grid style={{ width: '100%' }}>
        <Card style={{ borderRadius: '20px', background: '#00BFFF', margin: 0, padding: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '10px',
              borderRadius: '20px',
              margin: 0,
              padding: 0
            }}
          >
            <PersonIcon
              style={{
                fontSize: '2.5rem',
                marginTop: '21px',
                marginLeft: '20px',
                backgroundColor: '#28c7fc',
                borderRadius: '10px',
                padding: '5px'
              }}
            />
            <CardHeader
              title='CE-Reform'
              subheader={
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Project-MGT
                  </Box>
                  <br />
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Rmutl
                  </Box>
                </Typography>
              }
            />
          </div>

          <CardHeader
            title='All Document Form'
            subheader={
              <Typography variant='body2'>
                <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  xxx document form in system
                </Box>
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* Header card */}

      {/* nsert New Section */}
      <Button
        sx={{ marginBottom: '10px', height: '20', marginTop: '5vh' }}
        variant='contained'
        onClick={handleNewSectionClick}
      >
        New Section
      </Button>

      {/* datagrid content 01 */}
      <Box sx={{ height: '100%', width: '100%' }}>
        <Card style={{ padding: '5px' }}>
          {sectionData && sectionData.length > 0 ? (
            <DataGrid
              rows={sectionData}
              columns={columns}
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

      {/* InsertSection Dialog */}
      <InsertSection open={openDialog} handleClose={handleCloseDialog} />
    </Grid>
  )
}

export default Templat_Upload
