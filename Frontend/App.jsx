import TodoItem from "./TodoItem"
import { useState, useEffect } from "react"
import "./App.css"

const API_URL = import.meta.env.VITE_API_URL || "https://despliegue-backend-qe21.onrender.com/api/tareas";

export default function App() {

  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarTarea = async () => {
    if (input.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input.trim() }),
        });
        const nuevaTarea = await response.json();
        setTareas([...tareas, nuevaTarea]);
        setInput("");
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const tareaActualizada = await response.json();
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? tareaActualizada : tarea
        )
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-2  rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">TODO LIST APP</h1>
      <div className="flex gap-3 mb-5">
        <input className="flex-1 p-2 border rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Añadir Tarea" />
        <button className="bg-blue-500 text-white px-4 p-y-2 rounded" onClick={agregarTarea} disabled={loading}>Añadir Tareas</button>
      </div>

      <div className="space-y-2 ">
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          tareas.map((tarea) => (<TodoItem key={tarea.id} tarea={tarea} toggleCompleted={toggleCompleted} eliminarTarea={eliminarTarea} />))
        )}
      </div>

    </div>
  )
}