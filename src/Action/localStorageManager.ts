import {TaskList} from '../component/task';

export const setLocalStorageItem = (data: TaskList[]) => {
  localStorage.setItem("taskList", JSON.stringify(data));
}

export const getLocalStorageItem = (): TaskList[] => {
  const storageData = localStorage.getItem("taskList");
  return storageData != null ? JSON.parse(storageData) : [];
}