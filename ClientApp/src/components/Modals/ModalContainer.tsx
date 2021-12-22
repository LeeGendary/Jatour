import { Container, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";

const useStyles = makeStyles({
  Modal: {
    width: 650,
    margin: "auto",
  },
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    backgroundColor: "white",
  },
});
export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  const classes = useStyles();

  return (
    <Modal
      className={classes.Modal}
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
    >
      <Container className={classes.container}>
        {modalStore.modal.body}
      </Container>
    </Modal>
  );
});
