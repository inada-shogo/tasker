import React, {useState, useCallback} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./css/style.css";
import { info } from 'console';

type TaskList = {
    info: string,
    checked: boolean
}

export const App = () => {

    const [inputTextState, setInputTextState] = useState<string>("");

    const [taskList, setTaskList] = useState<string[]>([]);
    const [taskCheckedList, setTaskCheckedList] = useState<boolean[]>([]);

    const handlePressEnter = useCallback((e) => {
        if (e.key === "Enter" && inputTextState !== "") {
            setTaskList([...taskList, inputTextState]);
            setInputTextState("");
        }
    }, [inputTextState, taskList]);

    const handleChangeInputElement = useCallback((e) => {
        setInputTextState(e.target.value);
    }, []);

    const handleChangeCheckedFlg = useCallback((clickNum: number) => {
        setTaskCheckedList(
            taskCheckedList.map((info, i) => {
                return i === clickNum ? !taskCheckedList[i] : info;
            })
        )
    }, [taskCheckedList]);

    const handleDeleteInputFunction = useCallback((index: number) => {
        console.log(index);
    }, []);

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
            <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="please input task"
                        variant="standard"
                        size="medium"
                        value={inputTextState}
                        onChange={(e) => handleChangeInputElement(e)}
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
                                            checked={taskCheckedList[i]}
                                            onChange={() => {
                                                handleChangeCheckedFlg(i)
                                            }}
                                            onClick={(e) => handleInputClickEvent(e, i)}
                                        />
                                        <label htmlFor={`four${i}`}>
                                            <span></span>
                                            {info}
                                            <ins><i>{info}</i></ins>
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
