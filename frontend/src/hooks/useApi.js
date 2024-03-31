import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { apiConnector } from '../components/util/api';

export const useApi = ({success,error}) => {
    const { mutate,isPending } = useMutation({
        mutationFn:({endpoint,options}) => apiConnector(endpoint,options),
        onSuccess:(data)=>{
          success(data);
        },
        onError:(err)=>{
          error(err.message);
        }
      })
  return { mutate,isPending }
}
