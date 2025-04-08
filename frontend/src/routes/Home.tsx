import React from "react";
import { AuthProvider, useAuth } from "../components/AuthProvider";
import { getAuthInstance } from "../service/api";
import Centered from "../components/Centered";

const HomeWrapper = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

function Todo({ todo }: { todo: any }) {
  const [checked, setChecked] = React.useState<boolean>(todo.completed);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  function handleClick() {
    setChecked((c) => {
      const completed = !c;

      getAuthInstance()
        .patch(`/todo/${todo.id}?done=${completed}`, {
          completed,
        })
        .catch((err) => {
          console.error("Error updating todo:", err);
        });

      return completed;
    });
  }

  return (
    <div
      onClick={handleClick}
      data-completed={checked}
      className="data-[completed=true]:line-through cursor-pointer border flex gap-2 items-center p-2 m-2 rounded-md"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="checkbox checkbox-primary"
      />
      <div>
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
    </div>
  );
}

function CreateTodo({ add }: { add: (fn: any) => void }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    try {
      const resp = await getAuthInstance().post("/todo", {
        title,
        description,
        completed: false,
      });

      add((todos: any) => [...todos, resp.data]);

      formRef.current.reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
    }
  };

  return (
    <form action="" ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full mb-2"
        name="title"
      />
      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-2"
        name="description"
      />
      <button className="btn btn-primary w-full" ref={buttonRef}>
        Add Todo
      </button>
    </form>
  );
}

function Home() {
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    async function getTodo() {
      setLoading(true);
      try {
        const resp = await getAuthInstance().get("/todo");
        setTodos(resp.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    }

    getTodo();
  }, []);

  return (
    <Centered>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Hello, {user!.name}</h1>
        <div className="left-left">
          <h2 className="text-xl font-bold">Your Todos: </h2>
          {loading && <p>Loading...</p>}
          {loading == false && todos.length}

          <div className="border p-4 m-2 rounded-md">
            <h3 className="text-lg font-bold mb-2">Create Todo</h3>
            <CreateTodo add={setTodos} />
          </div>

          {loading == false && todos.length == 0 && (
            <p className="text-gray-500">No todos found</p>
          )}
          <div>
            {todos.map((todo: any) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </Centered>
  );
}

export default HomeWrapper;
