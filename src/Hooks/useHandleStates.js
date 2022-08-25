import { useState, useEffect } from "react";
import { submitFormApi } from "../services/apis";
import { throwError } from "../services/errorServices";
import { validateEmail } from "../services/utils";

function useHandleStates() {
  const [loading, setLoading] = useState(false);

  const [snackBarStatus, setSnackBarStatus] = useState({
    type: "SUCCESS",
    message: null,
  });

  const [_formData, _setFormData] = useState({
    email: "",
    userName: "",
    file: null,
  });

  const [_formErrors, _setFormErrors] = useState({
    email: null,
    userName: null,
    file: null,
  });

  useEffect(() => {
    let tempFormData = {
      email: null,
      userName: null,
      file: null,
    };

    if (_formData.email.trim().length === 0) {
      tempFormData.email = null;
    } else if (
      _formData.email.trim().length > 0 &&
      _formData.email.trim().length < 4
    ) {
      tempFormData.email = "Please enter a valid email";
    } else if (validateEmail(_formData.email) === false) {
      tempFormData.email = "Please enter a valid email";
    }

    if (_formData.userName.trim().length === 0) {
      tempFormData.userName = null;
    } else if (
      _formData.userName.trim().length > 0 &&
      _formData.userName.trim().length < 3
    ) {
      tempFormData.userName = "Please enter a valid name with min 3 char";
    } else if (_formData.userName.trim().length > 3) {
      tempFormData.userName = null;
    }

    if (_formData.file === null) {
      tempFormData.file = null;
    } else if (
      _formData.file &&
      typeof _formData.file === "object" &&
      typeof _formData.file.name === "string"
    ) {
      tempFormData.file = null;
    } else {
      tempFormData.file = "Please upload a valid XLSX file 2";
    }
    _setFormErrors({ ...tempFormData });
    console.log(_formData.file);
  }, [_formData]);

  const getFormData = (fieldKey) => {
    return {
      value: _formData[fieldKey],
      errorMessage: _formErrors[fieldKey],
    };
  };

  const setFormData = (fieldKey, value) => {
    _setFormData((prevState) => {
      return {
        ...prevState,
        [fieldKey]: value,
      };
    });
  };

  const clearSnackBarStatus = () => {
    setSnackBarStatus({
      type: snackBarStatus.type,
      message: null,
    });
  };

  const submitForm = async () => {
    setLoading(true);

    try {
      const submitFormApiResponse = await submitFormApi({
        userName: "",
        email: "",
        file: "",
      });

      if (submitFormApiResponse.status === false) {
        return throwError(submitFormApiResponse.error.message);
      }

      setSnackBarStatus({
        type: "success",
        message: "Successfully Submitted form",
      });
      setLoading(false);
      _setFormData({
        email: "",
        userName: "",
        file: null,
      });
    } catch (error) {
      console.error("Error : ", error);
      setSnackBarStatus({
        type: "error",
        message: error.message,
      });
      setLoading(false);
    }
  };

  return [
    getFormData,
    setFormData,
    loading,
    snackBarStatus,
    clearSnackBarStatus,
    submitForm,
  ];
}

export default useHandleStates;
