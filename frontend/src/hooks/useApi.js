import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { apiConnector } from '../components/util/api';

export const useApi = ({success,error,getProgress}) => {
    const { mutate,isPending } = useMutation({
        mutationFn:({endpoint,options}) => apiConnector(endpoint,options,getProgress),
        onSuccess:(data)=>{
          success(data);
        },
        onError:(err)=>{
          error(err.message);
        }
      })
  return { mutate,isPending }
}
