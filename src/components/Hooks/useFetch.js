import { useState, useEffect } from "react";

export const useFetch = (url, method, body) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      let response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: method === "GET" ? null : body,
      });
      let data = await response.json();
      if (data.success) {
        setData(data);
        setLoading(false);
      } else {
        setError(data.data.error);
        setLoading(false);
      }
    };
    try{fetchData()}catch(err){setError(err)};
  }, [url, method, body]);
  return { data, isLoading, error };
};
