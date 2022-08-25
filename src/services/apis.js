import { api } from "./utils";

export const submitFormApi = async (formData) => {
  let headersList = {
    Accept: "*/*",
  };

  let bodyContent = new FormData();
  bodyContent.append("userName", formData.userName);
  bodyContent.append("email", formData.email);
  bodyContent.append("req_file", formData.file);

  // EX to show loading_state
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // });

  const response = await fetch(`${api.baseUrl}/api/v0.1/forms/uploadForm`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  const result = await response.json();

  return result;
};
