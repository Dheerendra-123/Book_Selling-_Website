import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Dashboard= () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '90vh'}}>
      <Sidebar></Sidebar>
       <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt:'5px',
          bgcolor: '#faf9f7',
          borderRadius:'5px'
        }}
      >
        <Outlet />
      </Box>
      </Box>
    
  )
}

export default Dashboard