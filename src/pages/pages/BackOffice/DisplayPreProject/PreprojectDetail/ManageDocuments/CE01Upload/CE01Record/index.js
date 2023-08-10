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

export default function CE01Record(projectid) {
  const projectID = projectid.projectID
  console.log('Id หน้าประวัติการค้นหา :', projectID)

  // กำหนดตัวแปร
  const [rowdata, setRowData] = useState([]) // ตัวแปรเก็บค่า Row
  console.log('ข้อมูลแถว', rowdata)

  // กำหนดหัว Colum
  const columns = [
    { field: 'id', headerName: 'ID เอกสาร', width: 120 },
    {
      field: 'document_name',
      headerName: 'เวอร์ชันเอกสาร',
      width: 300,
      editable: true
    },
    {
      field: 'ดาวน์โหลดเอกสาร',
      headerName: 'ดาวน์โหลดเอกสาร',
      width: 180,
      editable: true
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
  }, [projectID])

  //-------------------จบการเริ่มการดึงข้อมูล Api มาเซตข้อมูล-------------------------//

  return (
    <Box sx={{ mt: 10 }}>
      <Card>
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
          <Card style={{ width: '55%' }}>
            <DataGrid
              rows={rowdata}
              columns={columns}
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
          </Card>
        </CardContent>
      </Card>
    </Box>
  )
}
