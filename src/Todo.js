import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Input,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpen(false);
  };
  const updateTodo = (e) => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h1>Update</h1>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>Update Me</Button>
        </div>
      </Modal>
     
        <ListItem className="listData">
          <EditIcon color="primary"  onClick={(e) => setOpen(true)} className="editIcon"/>
        {/* <Button onClick={(e) => setOpen(true)}>Edit Me</Button> */}
        <DeleteForeverIcon color="secondary" className="deleteIcon"
          onClick={(e) => {
            db.collection("todos").doc(props.todo.id).delete();
          }}
        />
          <ListItemText primary={props.todo.todo} className="todoText"/>
        </ListItem>
    </>
  );
}

export default Todo;
