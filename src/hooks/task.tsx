import { useContext } from "react";
import { TaskContext } from "../context/taskcontext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('errouuu');
  }
  return context;
};