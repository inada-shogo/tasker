import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export const App = () => {

  const handlePressEnter = useCallback((e) => {
    if (e.key === "Enter") {
      console.log('dkdk');
    }
  }, []);

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              TASKER
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{marginBottom: 20}}/>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth id="standard-basic" label="タスクを入力" variant="standard" onKeyPress={(e) => handlePressEnter(e)}/>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
    </>
  )
}