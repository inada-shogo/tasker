import React, {useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./css/style.css";

type TaskList = {
  text: string,
  checked: boolean
}

export const App = () => {

  const [inputTextState, setInputTextState] = useState<string>("");

  const [taskList, setTaskList] = useState<TaskList[]>([]);

  const handlePressEnter = useCallback((e) => {
    if (e.key === "Enter" && inputTextState !== "") {
      setTaskList([...taskList, {text: inputTextState, checked: false}]);
      setInputTextState("");
    }
  }, [inputTextState, taskList]);

  const handleChangeCheckedFlg = useCallback((clickNum: number) => {
    setTaskList(
      taskList.map((info, i) => {
        return i === clickNum
          ? {text: info.text, checked: !info.checked}
          : info;
      })
    )
  }, [taskList]);

  const handleDeleteInputFunction = useCallback((clickNum: number) => {
    setTaskList(taskList.splice(clickNum, 1));
  }, [taskList]);

  const handleInputClickEvent = useCallback((event: React.MouseEvent<HTMLInputElement>, activeEventNum: number) => {
    if (event.ctrlKey) {
      handleDeleteInputFunction(activeEventNum);
    }
  }, [handleDeleteInputFunction]);

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              TASKER
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{marginBottom: 20}}/>
      <Grid container spacing={2}>
        <Grid item xs>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="standard-basic"
            label="please input task"
            variant="standard"
            size="medium"
            autoComplete='off'
            value={inputTextState}
            color={"success"}
            onChange={(e) => setInputTextState(e.target.value)}
            onKeyPress={(e) => handlePressEnter(e)}
          />
          {
            taskList.length === 0
              ? <></>
              : taskList.map((info, i) => {
                return (
                  <>
                    <input
                      id={`four${i}`}
                      type='checkbox'
                      checked={info.checked}
                      onChange={() => handleChangeCheckedFlg(i)}
                      onClick={(e) => handleInputClickEvent(e, i)}
                    />
                    <label htmlFor={`four${i}`}>
                      <span></span>
                      {info.text}
                      <ins><i>{info.text}</i></ins>
                    </label>
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
