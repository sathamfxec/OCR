import { config } from "./../../config";

const CommonService = {
  OCR: (data: any) => {
    return fetch(config.apiUrlPrefix + "/v1/ocr", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
  },
};

export default CommonService;
