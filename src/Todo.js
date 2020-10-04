import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import EditIcon from "@material-ui/icons/Edit";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Input,
  Button,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
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
  let ti = input;
  // const [status, setStatus] = useState("");
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpen(false);
  };
  const updateTodo = (e) => {
    // if (input == undefined) {
    // input = props.todo.todo;
    // console.log(props.todo.todo);
    // setInput(props.todo.todo);
    // }
    // console.log("er : " + input);
    // return false;
    input === undefined ? (ti = props.todo.todo) : (ti = input);
    // return false;
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: ti,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const updateStatus = (e) => {
    // db.collection("todos")
    //   .doc(props.todo.id)
    //   .get()
    //   .then((doc) => {
    //     const data = doc.data();
    //     db.collection("todos").doc(props.todo.id).set(
    //       {
    //         status: !data.status,
    //       },
    //       { merge: true }
    //     );
    //     setStatus(data.status);
    //   });

    db.collection("todos").doc(props.todo.id).set(
      {
        status: !props.todo.status,
      },
      { merge: true }
    );
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Update </h2>
            <Input
              id="transition-modal-description"
              placeholder={props.todo.todo}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {/* <Button onClick={updateTodo}>Update Me</Button> */}
            <Button onClick={updateTodo} variant="contained" color="primary">
              <EditIcon />
            </Button>
          </div>
        </Fade>
      </Modal>
      {/* <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h1>Update</h1>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>Update Me</Button>
        </div>
      </Modal> */}

      <ListItem className="listData">
        {props.todo.status === true ? (
          <CheckBoxIcon onClick={updateStatus} className="checkColor" />
        ) : (
          <CheckBoxOutlineBlankIcon
            onClick={updateStatus}
            className="checkColor"
          />
        )}
        {/* <CheckBoxOutlineBlankIcon onClick={updateStatus} /> */}
        <EditIcon
          color="primary"
          onClick={
            props.todo.status ? (e) => setOpen(false) : (e) => setOpen(true)
          }
          className="editIcon"
        />
        {/* <Button onClick={(e) => setOpen(true)}>Edit Me</Button> */}
        <DeleteForeverIcon
          color="secondary"
          className="deleteIcon"
          onClick={(e) => {
            db.collection("todos").doc(props.todo.id).delete();
          }}
        />
        <ListItemText
          style={
            props.todo.status
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
          //style={{ textDecoration: "line-through" }}
          primary={props.todo.todo}
          className="todoText"
        />
      </ListItem>
    </>
  );
}

export default Todo;
