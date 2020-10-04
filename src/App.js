import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  List,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import Todo from "./Todo";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import { StylesProvider } from "@material-ui/core/styles";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const alert = <Alert severity="info">Add Your First Todo</Alert>;
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.length == 0 ? setMsg(alert) : setMsg("");
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            status: doc.data().status,
          }))
        );
      });
  }, []);

  const addTodo = (e) => {
    setMsg("");
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: false,
    });
    // setTodos([...todos, input]);
    setInput("");
  };
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <h1>Todo App</h1>

        <form>
          {/* <input value={input} onChange={(e) => setInput(e.target.value)} /> */}
          <FormControl>
            <InputLabel>Enter Todo</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            {/* <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText> */}
          </FormControl>
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            <AddIcon />
          </Button>
          {/* <AddCircleIcon 
          disabled={!input}  type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary" className={!input == false ? 'active addBtn':'disabled addBtn'}/> */}
          {/* <button type="submit" onClick={addTodo}>
          Add Todo
        </button> */}
          {/* <button
            disabled={!input}
            type="submit"
            className="addBtn"
            onClick={addTodo}
          >
            <AddIcon />
          </button> */}
        </form>

        <List>
          {todos.map((todo, index) => {
            return <Todo todo={todo} key={index} />;
            // <li key={index}>{todo}</li>;
          })}
        </List>
        <p className="msg">{msg}</p>
      </div>
    </StylesProvider>
  );
}

export default App;
