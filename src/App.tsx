import React, {useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./css/style.css";

export const App = () => {

  const [inputTextState, setInputTextState] = useState<string>("");

  const [taskList, setTaskList] = useState<string[]>([]);

  const handlePressEnter = useCallback((e) => {
    if (e.key === "Enter") {
      setTaskList([...taskList, inputTextState]);
      setInputTextState("");

    }
  }, [inputTextState, taskList]);

  const handleChangeInputElement = useCallback((e) => {
    setInputTextState(e.target.value);
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
          <TextField
            fullWidth
            id="standard-basic"
            label="タスクを入力"
            variant="standard"
            value={inputTextState}
            onChange={(e) => handleChangeInputElement(e)}
            onKeyPress={(e) => handlePressEnter(e)}
          />
          {
            taskList.length === 0
              ? <></>
              : taskList.map((info,i) => {
                return (
                  <>
                    <div style={{marginTop: 10}}>
                      <input type="checkbox" id={`cbtest${i}`}/>
                      <label htmlFor={`cbtest${i}`} className="check-box"/>
                      <span>{info}</span>
                    </div>
                  </>
                )
              })
          }
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
    </>
  )
}