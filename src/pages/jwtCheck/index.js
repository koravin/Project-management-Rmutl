import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const JwtCheck = () => {
  const router = useRouter()

  // Jwt Check
  const [role, setRole] = useState('')

  console.log('role:', role)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // ดึงค่า jwtToken และ jwtRole จาก localStorage
        const storedJwtToken = localStorage.getItem('jwtToken')
        const storedJwtRole = localStorage.getItem('jwtRole')

        // ส่ง token และ role ไปยัง API
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}api/project-mgt/verifyauthentication`, {
          token: storedJwtToken,
          tokenRole: storedJwtRole
        })

        // console.log('จงไรนํ้าแข็งไสxxxxx', response.data)
        setRole(response.data.stateRole)

        if (!response.data.stateRole) {
          router.push('/pages/login/')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchMenuItems()
  }, [role, router])

  return null
}

export default JwtCheck
