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
        cache:"no-cache",
        headers: {
          "Content-Type": "application/json"
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
    try{if(url)fetchData()}catch(err){console.log(error);setError(err)};
  }, [url, method, body]);
  return { data, isLoading, error };
};
