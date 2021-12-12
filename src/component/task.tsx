import React, {useState, useCallback, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {getLocalStorageItem, setLocalStorageItem} from '../Action/localStorageManager'

export type TaskList = {
  text: string,
  checked: boolean
}

export const Task = () => {

  const [inputTextState, setInputTextState] = useState<string>("");

  const [taskList, setTaskList] = useState<TaskList[]>([]);

  /** ステートとローカルストレージの更新を同時に行う */
  const changeTaskList = useCallback((data: TaskList[]) => {
    setTaskList(data);
    setLocalStorageItem(data);
  },[]);

  /** 選択 task 削除 */
  const handleDeleteInputFunction = useCallback((clickNum: number) => {
    changeTaskList(taskList.splice(clickNum, 1));
  }, [changeTaskList, taskList]);

  /** チェック反転 */
  const handleChangeCheckedFlg = useCallback((clickNum: number) => {
    changeTaskList(taskList.map((info, i) => {
      return i === clickNum
        ? {text: info.text, checked: !info.checked}
        : info;
    }));
  }, [changeTaskList, taskList]);

  /** press + Enter */
  const handlePressEnter = useCallback((e) => {
    if (e.key === "Enter" && inputTextState !== "") {
      changeTaskList([...taskList, {text: inputTextState, checked: false}]);
      setInputTextState("");
    }
  }, [changeTaskList, inputTextState, taskList]);

  /** ctrl + enter */
  const handleInputClickEvent = useCallback((event: React.MouseEvent<HTMLInputElement>, activeEventNum: number) => {
    if (event.ctrlKey) {
      handleDeleteInputFunction(activeEventNum);
      setTimeout(() => {
        for (let i = 1; i <= taskList.length; i++) {
          handleChangeCheckedFlg(activeEventNum + i);
        }
      }, 10);
    }
  }, [handleDeleteInputFunction, handleChangeCheckedFlg]);

  /** 一括 task 削除 */
  const setKeyEvent = useCallback(() => {
    document.addEventListener("keydown", (e) => { if (e.keyCode === 27) {changeTaskList([]); }});
  }, [changeTaskList]);

  useEffect(() => {
    setTaskList(getLocalStorageItem());
    setKeyEvent();
  }, [setKeyEvent]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
        </Grid>
        <Grid item xs={10}>
          <div>
          <TextField
            key={"textField"}
            autoFocus 
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
          </div>
          {
            taskList.length === 0
              ? <></>
              : taskList.map((info, i) => {
                return (
                  <>
                    <input
                      id={`four${i}`}
                      key={`input${i}`}
                      type='checkbox'
                      checked={info.checked}
                      onChange={() => handleChangeCheckedFlg(i)}
                      onClick={(e) => handleInputClickEvent(e, i)}
                    />
                    <label htmlFor={`four${i}`}>
                      <span />
                      {info.text}
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