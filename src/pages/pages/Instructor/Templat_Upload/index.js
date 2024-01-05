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
import PreprojectFormUpload from './PreprojectFormUpload'
import ProjectFormUpload from './ProjectFormUpload'

const Templat_Upload = () => {
  const router = useRouter() // router สร้าง path

  // รับค่าข้อมูล Api
  // const [sectionData, setSectionData] = useState([])
  const [ceData, setCeData] = useState([])
  const [chData, setChData] = useState([])

  // dialog control
  const [openCeDialog, setCeOpenDialog] = React.useState(false)
  const [openChDialog, setChOpenDialog] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  // useRef สำหรับเก็บค่า openDialog
  // เก็บ State Dialog Ce form
  const openDialogRef = useRef(openCeDialog)
  openDialogRef.current = openCeDialog

  // เก็บ State Dialog Ch form
  const openDialogChRef = useRef(openChDialog)
  openDialogChRef.current = openChDialog

  const handleClickOpenCeDialog = () => {
    setCeOpenDialog(true)
  }

  const handleCloseCeDialog = () => {
    setCeOpenDialog(false)
  }

  const handleClickOpenChDialog = () => {
    setChOpenDialog(true)
  }

  const handleCloseChDialog = () => {
    setChOpenDialog(false)
  }

  // Tab panel control
  const [value, setValue] = React.useState('1')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  // รับค่าข้อมูลจาก Api Ce document
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallformdocument_ce`)
        setCeData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openCeDialog) {
      fetchData()
    }
  }, [openCeDialog])

  // รับค่าข้อมูลจาก Api Ch document
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}api/project-mgt/getallformdocument_ch`)
        setChData(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (openChDialog) {
      fetchData()
    }
  }, [openChDialog])

  // Table colum
  const CE_columns = [
    { field: 'ce_type', headerName: 'Document type', width: 120 },
    { field: 'ce_file_name', headerName: 'Document Name', width: 150 },
    {
      field: 'last_updated',
      headerName: 'Last update',
      width: 300,
      valueGetter: params => formatLastUpdated(params.value)
    },
    {
      field: 'Upload_Document',
      headerName: 'Form',
      width: 130,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleCeDataClick(cellValues.row)}>
            ...
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  const CH_columns = [
    { field: 'ch_type', headerName: 'Document type', width: 120 },
    { field: 'ch_file_name', headerName: 'Document Name', width: 150 },
    {
      field: 'last_updated',
      headerName: 'Last update',
      width: 300,
      valueGetter: params => formatLastUpdated(params.value)
    },
    {
      field: 'Upload_Document',
      headerName: 'Form',
      width: 130,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleChDataClick(cellValues.row)}>
            ...
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  // dialog open
  const handleCeDataClick = rowData => {
    handleClickOpenCeDialog()
    setSelectedRowData(rowData) // กำหนดข้อมูลของแถวที่ถูกคลิกให้ state
  }

  const handleChDataClick = rowData => {
    handleClickOpenChDialog()
    setSelectedRowData(rowData) // กำหนดข้อมูลของแถวที่ถูกคลิกให้ state
  }

  // ฟังก์ชันจัดการการแสดงการเปลี่ยนแปลงรูปแบบของวันที่
  function formatLastUpdated(dateString) {
    const date = new Date(dateString)

    const formattedDate = date
      .toISOString()
      .replace('T', ' ')
      .replace(/\.\d+Z$/, '')

    return formattedDate
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

      <Box sx={{ width: '100%', typography: 'body1', mt: 10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
              <Tab label='Pre-project Form' value='1' />
              <Tab label='Project Form' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            {/* datagrid content 01 */}
            <Box sx={{ height: '100%', width: '100%' }}>
              <Card style={{ padding: '5px' }}>
                {ceData && ceData.length > 0 ? (
                  <DataGrid
                    rows={ceData}
                    columns={CE_columns}
                    getRowId={row => row.ce_doc_id}
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
          </TabPanel>
          <TabPanel value='2'>
            {/* datagrid content 02 */}
            <Box sx={{ height: '100%', width: '100%' }}>
              <Card style={{ padding: '5px' }}>
                {chData && chData.length > 0 ? (
                  <DataGrid
                    rows={chData}
                    columns={CH_columns}
                    getRowId={row => row.ch_doc_id}
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
          </TabPanel>
        </TabContext>
      </Box>

      {/* Document form Dialog */}
      <PreprojectFormUpload open={openCeDialog} handleClose={handleCloseCeDialog} fullWidth rowData={selectedRowData} />
      <ProjectFormUpload open={openChDialog} handleClose={handleCloseChDialog} fullWidth rowData={selectedRowData} />
    </Grid>
  )
}

export default Templat_Upload
