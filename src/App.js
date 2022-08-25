import React, { forwardRef } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PublishIcon from "@mui/icons-material/Publish";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useHandleStates from "./Hooks/useHandleStates";
import "./App.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const [
    getFormData,
    setFormData,
    loading,
    snackBarStatus,
    clearSnackBarStatus,
    submitForm,
  ] = useHandleStates();

  const handleClose = (event, reason) => {
    clearSnackBarStatus();
    if (reason === "clickaway") {
      return;
    }
  };

  const isSubmitButtonDisabled = () => {
    if (loading === true) {
      return true;
    } else if (
      getFormData("email").value.trim().length > 1 &&
      getFormData("userName").value.trim().length > 1 &&
      getFormData("file").value &&
      typeof getFormData("file").value.name === "string"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: "40px",
        }}
      >
        <center className="padding-horizontal-medium">
          <h3 className="font-color-blue">Instrive Form</h3>
        </center>
      </Box>
      <Container maxWidth="sm">
        <TextField
          disabled={loading}
          error={typeof getFormData("email").errorMessage === "string"}
          id="email-text-field-id-tab-0"
          name="email"
          label="email"
          helperText={
            typeof getFormData("email").errorMessage === "string"
              ? getFormData("email").errorMessage
              : ""
          }
          value={getFormData("email").value}
          onChange={(event) => setFormData("email", event.target.value)}
          sx={{
            width: "100%",
          }}
        />
        <TextField
          disabled={loading}
          error={typeof getFormData("userName").errorMessage === "string"}
          id="userName-text-field-id-tab-0"
          name="userName"
          label="Name"
          value={getFormData("userName").value}
          helperText={
            typeof getFormData("userName").errorMessage === "string"
              ? getFormData("userName").errorMessage
              : ""
          }
          onChange={(event) => setFormData("userName", event.target.value)}
          style={{
            marginTop: "20px",
            width: "100%",
          }}
        />

        <div className="custom-file-input-field-wrapper">
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id={"id-file"}
            name={`upload-file`}
            className="file-upload-input-filed"
            disabled={loading}
            onChange={(event) => {
              console.log("Got the event");
              setFormData("file", event.target.files[0]);
            }}
          />
          <Button
            disabled={loading}
            style={{
              width: "100%",
            }}
            variant="outlined"
            startIcon={<AttachmentIcon />}
            onClick={(event) => event.stopPropagation()}
            {...(typeof getFormData("file").errorMessage === "string"
              ? { color: "error" }
              : {})}
          >
            {getFormData("file").value
              ? getFormData("file").value.name
              : "Upload"}
          </Button>
          <p className="file-upload-input-filed-info-text">
            {typeof getFormData("file").errorMessage === "string"
              ? getFormData("file").errorMessage
              : "Upload .xlsx file"}
          </p>
        </div>

        <LoadingButton
          onClick={submitForm}
          loading={loading}
          style={{
            width: "100%",
          }}
          loadingPosition="center"
          startIcon={<PublishIcon />}
          variant="contained"
          disabled={isSubmitButtonDisabled()}
        >
          Submit Form
        </LoadingButton>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={typeof snackBarStatus.message === "string"}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarStatus.type}
          sx={{ width: "100%" }}
        >
          {snackBarStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
