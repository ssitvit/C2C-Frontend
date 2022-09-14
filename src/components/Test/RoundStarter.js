import { Button, Stack } from '@mui/material'
import React from 'react'

function RoundStarter() {
  return (
    <Stack color="white" width="fit-content">
        <Button variant="contained" color="warning" width="fit-content" sx={{margin:"2rem"}}>
            Click here to start your test.
        </Button>
    </Stack>

  )
}

export default RoundStarter