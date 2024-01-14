import axios from 'axios'
import { useState, useEffect } from 'react'

// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const Navigation = () => {
  const [jwtToken, setJwtToken] = useState(null)
  const [jwtRole, setJwtRole] = useState(null)

  // Variable
  const [role, setRole] = useState('')

  console.log('role:', role)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // ดึงค่า jwtToken และ jwtRole จาก localStorage
        const storedJwtToken = localStorage.getItem('jwtToken')
        const storedJwtRole = localStorage.getItem('jwtRole')

        if (storedJwtToken && storedJwtRole) {
          setJwtToken(storedJwtToken)
          setJwtRole(storedJwtRole)

          // ส่ง token และ role ไปยัง API
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/verifyauthentication`, {
            token: storedJwtToken,
            tokenRole: storedJwtRole
          })

          console.log('จงไร', response.data)
          setRole(response.data.stateRole)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchMenuItems()
  }, [])

  const getMenuItems = () => {
    if (role === 'project-teacher') {
      return [
        {
          title: 'BackOffice',
          icon: GoogleCirclesExtended,
          path: '/pages/BackOffice/'
        },
        {
          title: 'Section',
          icon: FormatLetterCase,
          path: '/pages/Instructor/Section_Mg/'
        },
        {
          title: 'Form upload',
          icon: FormatLetterCase,
          path: '/pages/Instructor/Templat_Upload/'
        },
        {
          title: 'Manage Section',
          icon: FormatLetterCase,
          path: '/pages/Instructor/Manage/'
        }
      ]
    } else if (role === 'นักศึกษา') {
      return [
        {
          title: 'Home',
          icon: GoogleCirclesExtended,
          path: '/pages/Student/HomeStudent/'
        },
        {
          title: 'Document Form',
          icon: FormatLetterCase,
          path: '/pages/Student/Document_Form/'
        },
        {
          title: 'Recommend Project',
          icon: FormatLetterCase,
          path: '/pages/Student/Recommend_Project/'
        },
        {
          title: 'Post form teacher',
          icon: FormatLetterCase,
          path: '/pages/Student/Recommend_Project/'
        }
      ]
    } else if (role === 'อาจารย์') {
      return [
        {
          title: 'Teacher Load',
          icon: GoogleCirclesExtended,
          path: '/pages/Teacher/Teacher_load/'
        },
        {
          title: 'Post project',
          icon: GoogleCirclesExtended,
          path: '/pages/Teacher/Teacher_post'
        },
        {
          title: 'Committee',
          icon: GoogleCirclesExtended,
          path: '/pages/Teacher/Committee'
        }
      ]
    } else {
      return [
        {
          title: 'BackOffice',
          icon: GoogleCirclesExtended,
          path: '/pages/BackOffice/'
        }
      ]
    }
  }

  const menuItems = getMenuItems()

  return menuItems
}

export default Navigation
