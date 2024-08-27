import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiConnector } from "../components/util/api";

export const useData = ({ key, endpoint }) => {
  const { data, isPending } = useQuery({
    queryFn: () => apiConnector(endpoint, { method: "GET" }),
    queryKey:key,
    retry:false,
  });

  return {data,isPending}
};
