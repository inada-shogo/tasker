import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Task} from "./component/task";
import { styled } from '@mui/material/styles';
import "./css/style.css";

const CustomAppBar = styled(AppBar)({
  marginBottom: `20px`
});

export const App = () => {
  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <CustomAppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              TASKER
            </Typography>
          </Toolbar>
        </CustomAppBar>
      </Box>
      <Task />
    </>
  )
}
