import { Button, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import NotFound from "../Notfound/NotFound";
import Actions from "./Actions";

function EditUser() {
  const params = useParams();
  const round = params.id ? params.id : 1;
  const { data, isLoading, error } = useFetch(
    `https://${process.env.REACT_APP_BASE_URL}/admin/getScoreSort`,
    "POST",
    JSON.stringify({ round: round })
  );
  return (
    <>
    Edit
    </>
  );
}

export default EditUser;
