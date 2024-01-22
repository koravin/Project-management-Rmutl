import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import Divider from '@mui/material/Divider'

// mui import
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
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

const Document_project_status = ({ project_id }) => {
  const router = useRouter() // router สร้าง path

  // รับค่าข้อมูล Api
  // const [sectionData, setSectionData] = useState([])
  const [ceData, setCeData] = useState([])

  // dialog control
  const [openCeDialog, setCeOpenDialog] = React.useState(false)
  const [openChDialog, setChOpenDialog] = React.useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  // รับค่าข้อมูลจาก Api Ce document
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/myprojectdocument?preproject_id=${project_id}`
        )
        console.log('Auuuuu', response.data)
        setCeData(response.data.documentlist[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [project_id])

  // Table colum
  const CE_columns = [
    { field: 'ch_type', headerName: 'Document type', width: 120 },
    { field: 'ch_file_name', headerName: 'Document Name', width: 150 },

    {
      field: 'Upload_Document',
      headerName: 'Form',
      width: 130,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleCeDataClick(cellValues.row)} style={{ color: '#FFC107' }}>
            <FileCopyIcon />
          </Button>
        )
      },
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true
    }
  ]

  return (
    <Grid container spacing={2}>
      <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
        {/* datagrid content 01 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '75%' }}>
            {/* ส่วนของ Project Detail  */}
            <Card>
              <Grid container spacing={0.5}>
                <Grid
                  item
                  xs={12}
                  width={'max'}
                  sx={{
                    paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                    paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
                  }}
                >
                  <CardContent>
                    <Typography variant='h6' sx={{ marginBottom: 2, textAlign: 'center' }}>
                      สถานะเอกสาร
                    </Typography>
                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                      <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                        เอกสาร CH01:{' '}
                        {ceData && ceData.ch01_status === 'no' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f44336',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            ยังไม่ได้ส่งเอกสาร
                          </Box>
                        )}
                        {ceData && ceData.ch01_status === '1' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f2d05e',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารยังไม่โดนตรวจ
                          </Box>
                        )}
                        {ceData && ceData.ch01_status === '2' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#4caf50',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารผ่านแล้ว
                          </Box>
                        )}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                      <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                        เอกสาร CH02:{' '}
                        {ceData && ceData.ch02_status === 'no' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f44336',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            ยังไม่ได้ส่งเอกสาร
                          </Box>
                        )}
                        {ceData && ceData.ch02_status === '1' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f2d05e',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารยังไม่โดนตรวจ
                          </Box>
                        )}
                        {ceData && ceData.ch02_status === '2' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#4caf50',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารผ่านแล้ว
                          </Box>
                        )}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                      <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                        เอกสาร CH03:{' '}
                        {ceData && ceData.ch03_status === 'no' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f44336',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            ยังไม่ได้ส่งเอกสาร
                          </Box>
                        )}
                        {ceData && ceData.ch03_status === '1' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f2d05e',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารยังไม่โดนตรวจ
                          </Box>
                        )}
                        {ceData && ceData.ch03_status === '2' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#4caf50',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารผ่านแล้ว
                          </Box>
                        )}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                      <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                        เอกสาร CH04:{' '}
                        {ceData && ceData.ch04_status === 'no' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f44336',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            ยังไม่ได้ส่งเอกสาร
                          </Box>
                        )}
                        {ceData && ceData.ch04_status === '1' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f2d05e',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารยังไม่โดนตรวจ
                          </Box>
                        )}
                        {ceData && ceData.ch04_status === '2' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#4caf50',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารผ่านแล้ว
                          </Box>
                        )}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                      <Box component='span' sx={{ fontWeight: 'bold', mr: 1 }}>
                        เอกสาร CH05:{' '}
                        {ceData && ceData.ch05_status === 'no' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f44336',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            ยังไม่ได้ส่งเอกสาร
                          </Box>
                        )}
                        {ceData && ceData.ch05_status === '1' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#f2d05e',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารยังไม่โดนตรวจ
                          </Box>
                        )}
                        {ceData && ceData.ch05_status === '2' && (
                          <Box
                            component='span'
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              backgroundColor: '#4caf50',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              paddingTop: '2px',
                              paddingBottom: '2px',
                              fontSize: '11px',
                              borderRadius: '50px'
                            }}
                          >
                            เอกสารผ่านแล้ว
                          </Box>
                        )}
                      </Box>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </div>
      </Box>
    </Grid>
  )
}

export default Document_project_status
