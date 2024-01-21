import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

//** Topbar Import
import User_navigate_topbar from 'src/@core/components/user-navigate/User_navigate_topbar'
import User_footer from 'src/@core/components/user-navigate/User_footer'

// component imports
import Slider_Main from './pages/Main_page/Silder_Main'
import Project_preview from './pages/Main_page/Project_preview'
import Headercard from './pages/Main_page/Headercard'
import Content01 from './pages/Main_page/Content01'
import Content02 from './pages/Main_page/Content02'

// import JwtCheck from './jwtCheck'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      {/* ตรวจสอบ Role */}
      {/* <JwtCheck /> */}

      {/* Topbar */}
      <User_navigate_topbar />
      <Headercard />
      <div style={{ marginTop: '5vh', marginLeft: '3vh', marginBottom: '1vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Content01 />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Content02 />
        </div>
        <div style={{ marginTop: '5vh' }}>
          <Project_preview />
        </div>
      </div>
      <div style={{ marginTop: '5vh' }}>
        <User_footer />
      </div>
      {/* content */}
    </ApexChartWrapper>
  )
}

Dashboard.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Dashboard
