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
import { AddCircle, Edit, Delete, Visibility, Settings } from '@mui/icons-material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PublicIcon from '@mui/icons-material/Public'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeIcon from '@mui/icons-material/Home'
import RecommendIcon from '@mui/icons-material/Recommend'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice'

const Navigation = () => {
  const [jwtToken, setJwtToken] = useState(null)
  const [jwtRole, setJwtRole] = useState(null)

  // Variable
  const [role, setRole] = useState('')

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
          icon: Settings,
          path: '/pages/BackOffice'
        },
        {
          title: 'Section',
          icon: OpenInNewIcon,
          path: '/pages/Instructor/Section_Mg'
        },
        {
          title: 'Form upload',
          icon: PostAddIcon,
          path: '/pages/Instructor/Templat_Upload'
        },
        {
          title: 'Study Management',
          icon: Visibility,
          path: '/pages/Instructor/Manage'
        },
        {
          title: 'Committee',
          icon: PeopleAltIcon,
          path: '/pages/Teacher/Committee'
        },
        {
          title: 'Post form teacher',
          icon: Diversity1Icon,
          path: '/pages/Student/Post_Teacher'
        },
        {
          title: 'Public Document',
          icon: PublicIcon,
          path: '/pages/Instructor/Public_Document_Upload'
        }
      ]
    } else if (role === 'นักศึกษา') {
      return [
        {
          title: 'Home',
          icon: HomeIcon,
          path: '/pages/Student/HomeStudent'
        },
        {
          title: 'Document Form',
          icon: AssignmentIcon,
          path: '/pages/Student/Document_Form'
        },
        {
          title: 'Recommend Project',
          icon: RecommendIcon,
          path: '/pages/Student/Recommend_Project'
        },
        {
          title: 'Post form teacher',
          icon: Diversity1Icon,
          path: '/pages/Student/Post_Teacher'
        }
      ]
    } else if (role === 'อาจารย์') {
      return [
        {
          title: 'Teacher Load',
          icon: HomeRepairServiceIcon,
          path: '/pages/Teacher/Teacher_load'
        },
        {
          title: 'Post project',
          icon: LocalPostOfficeIcon,
          path: '/pages/Teacher/Teacher_post'
        },
        {
          title: 'Committee',
          icon: PeopleAltIcon,
          path: '/pages/Teacher/Committee'
        }
      ]
    } else {
      return [
        {
          title: 'BackOffice',
          icon: GoogleCirclesExtended,
          path: '/pages/BackOffice'
        }
      ]
    }
  }

  const menuItems = getMenuItems()

  return menuItems
}

export default Navigation
