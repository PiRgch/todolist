import { Todo } from "@/lib/types";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (newTodo: Todo) => void;
  putTodo: (updatedTodo: Todo) => Promise<void>; // Nouvelle fonction
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,

  // Récupérer les todos depuis l'API
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/todo");
      const data = await response.json();
      set({ todos: data, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos",
        loading: false,
      });
    }
  },

  // Ajouter un todo
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),

  // Mettre à jour un todo existant
  putTodo: async (updatedTodo) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/todo/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // Mise à jour du store localement
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : "Failed to update todo",
        loading: false,
      });
    }
  },
}));
