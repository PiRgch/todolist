import { useTodoStore } from "@/store/useTodoStore";
import { useEffect } from "react";

const useTodo = () => {
  const { todos, loading, error, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, loading, error };
};

export default useTodo;
