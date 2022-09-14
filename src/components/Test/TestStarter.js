import {
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ExamIcon from "../Icons/ExamIcon";
function TestStarter() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      minHeight="80vh"
    >
      {/* header */}
      <Stack style={{ margin: "2rem" }} direction="column">
        {/* Tes details viewer */}
        <Typography variant="h4" component="h1" color="white">
          Your Test Details
        </Typography>
        {/* divider */}
        <Divider color="white" />
        {/* round starter button*/}
        <Stack color="white" width="fit-content">
        <Button variant="contained" color="warning" width="fit-content" sx={{margin:"2rem"}} onClick={()=>{navigate('exam/1')}}>
            Click here to start your test.
        </Button>
    </Stack>

        {/* test results */}
        <Typography variant="h4" component="h1" color="white">
          Your Test Results
        </Typography>
        {/* divider */}
        <Divider color="white" />
        {/* test result generator */}
        <Stack color="white" width="fit-content">
        <Button variant="contained" color="warning" width="fit-content" sx={{margin:"2rem"}} onClick={()=>{navigate('exam/1')}}>
            Click here to start your test.
        </Button>
    </Stack>
      </Stack>
      {/* divider */}
      {/* which round to begin */}
      {matches && <ExamIcon />}
    </Stack>
  );
}

export default TestStarter;
