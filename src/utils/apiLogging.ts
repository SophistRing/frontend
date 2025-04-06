import { AxiosResponse } from "axios";

function apiLogging(response: AxiosResponse) {
  if (import.meta.env.VITE_NODE_ENV === "development")
    console.log(
      `응답 코드:${response.status}, 요청url:${response.config.url}, params:${
        JSON.stringify(response.config.params) || "없음"
      }`,
      response
    );
}

export default apiLogging;
