import {
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import ExamIcon from "../Icons/ExamIcon";
import RoundStarter from "./RoundStarter";
function TestStarter() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
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
        <RoundStarter />

        {/* test results */}
        <Typography variant="h4" component="h1" color="white">
          Your Test Results
        </Typography>
        {/* divider */}
        <Divider color="white" />
        {/* test result generator */}
        <RoundStarter />
      </Stack>
      {/* divider */}
      {/* which round to begin */}
      {matches && <ExamIcon />}
    </Stack>
  );
}

export default TestStarter;
