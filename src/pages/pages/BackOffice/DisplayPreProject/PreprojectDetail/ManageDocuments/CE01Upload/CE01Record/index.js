import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Grid
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function CE01Record(projectid, refreshFlag) {
  const projectID = projectid.projectID
  const RefreshFlag = refreshFlag

  // console.log('Id หน้าประวัติการค้นหา :', projectID)
  // console.log('ค่าน่ารัก', RefreshFlag)

  // กำหนดตัวแปร
  const [rowdata, setRowData] = useState([]) // ตัวแปรเก็บค่า Row
  console.log('ข้อมูลแถว', rowdata)

  // กำหนดหัว Colum
  const columns = [
    {
      field: 'document_name',
      headerName: 'เวอร์ชันเอกสาร',
      width: 300,
      editable: true
    },
    {
      field: 'download_button',
      headerName: 'ดาวน์โหลดเอกสาร',
      width: 180,
      renderCell: params => (
        <Button variant='outlined' onClick={() => handleDownload(params.row.id)}>
          ดาวน์โหลด
        </Button>
      )
    }
  ]

  //-------------------เริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ดึงข้อมูลไฟล์เอกสารในฐานข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}api/project-mgt/getallonedocumenttype?preproject_id=${projectID}&document_type=CE01`
        )
        console.log(response.data.documentList)

        // สร้างอาเรย์ของ object ที่เข้ากับ DataGrid เพื่อใช้ map row
        const rowData = response.data.documentList.map(document => ({
          id: document.document_id,
          document_name: document.document_name,
          document_type: document.document_type
        }))

        setRowData(rowData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [projectID, refreshFlag])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  // ฟังก์ชันดาวโหลดเอกสาร
  const handleDownload = documentId => {
    alert('ขวย')

    // ทำการดาวน์โหลดเอกสารโดยใช้ documentId
    // สามารถเรียกใช้ API หรือทำการเปิด URL สำหรับดาวน์โหลดเอกสารได้ตามที่คุณต้องการ
  }

  return (
    <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '80%', borderRadius: 15 }}>
        <Typography
          align='center'
          variant='h6'
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AccessTimeIcon style={{ marginRight: '0.2rem', height: '5vh' }} /> ประวัติการส่งเอกสาร
        </Typography>
        <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
          <Box></Box>
          <Card style={{ width: '80%' }}>
            <DataGrid
              rows={rowdata}
              columns={columns}
              autoHeight
              components={{
                NoRowsOverlay: () => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem',
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Typography variant='h6' color='textSecondary'>
                      ไม่พบข้อมูล
                    </Typography>
                  </div>
                )
              }}
              pageSize={5}
              disableRowSelectionOnClick
            />
          </Card>
        </CardContent>
      </Card>
    </Box>
  )
}
