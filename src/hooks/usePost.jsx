import { useState, useEffect } from "react";

export const UsePost = (url) => {
  const [config, SetConfig] = useState(null);
  const [method, SetMethod] = useState(null);
  const [fetchData, SetCallFetch] = useState(false);
  // POST DO DADOS
  const httpConfig = (data, method) => {
    if (method === "POST") {
      SetConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      SetMethod(method);
    }
  };
  useEffect(() => {
    const httpRequest = async () => {
      const fetchOptions = [url, config];
      if (method === "POST") {
        const data = await fetch(...fetchOptions);
        const res = await data.json();
        
      }
    };
    httpRequest();
  }, [url, config, method]);
  return {httpConfig };
};
