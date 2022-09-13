import React from 'react'
import PresentsText from '../Icons/PresentsText'
import C2c from '../Icons/C2c'
import { Stack } from '@mui/material'
function Illustration() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
        <PresentsText width={256} height={96}/>
        <C2c/>
    </Stack>
  )
}

export default Illustration