import { api } from "./utils";

export const submitFormApi = async (formData) => {
  let headersList = {
    Accept: "*/*",
  };

  let bodyContent = new FormData();
  bodyContent.append("userName", formData.userName);
  bodyContent.append("email", formData.email);
  bodyContent.append("req_file", formData.file);

  // let response = await fetch(`${api.baseUrl}/api/v0.1/form/uploadForm`, {
  //   method: "POST",
  //   body: bodyContent,
  //   headers: headersList,
  // });

  // let _data = await response.text();

  const dump = await new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise Done");
      resolve();
    }, [5000]);
  });

  return {
    success: true,
    data: {},
    error: null,
  };
};
