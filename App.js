import { useState, useEffect } from "react";
import { NativeBaseProvider, Box } from "native-base";
import { auth } from "./app/fbConfig";
import Login from "./app/Login";
import TodoList from "./app/TodoList";

export default function App() {
  const [user, setUser] = useState()
  const [todos, setTodos] = useState()

  useEffect(() => {
    const _user = auth.currentUser;
    setUser(_user);
  }, [])

  return (
    <NativeBaseProvider>
      <Box flex={1} bg={"darkBlue.900"} alignItems="center" justifyContent="center">
        {!user
          ? <Login setUser={setUser} />
          : <TodoList user={user} todos={todos} setTodos={setTodos} />
        }
      </Box>
    </NativeBaseProvider>
  );
}
