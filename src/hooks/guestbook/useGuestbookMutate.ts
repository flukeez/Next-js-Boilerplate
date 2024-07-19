import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';
import useAxiosUnAuth from '../useAxiosPublic';

const url = '/guestbook';

export function useGuestbookSave() {
  const api = useAxiosUnAuth();
  const queryClient = useQueryClient();

  const saveOne = async (data: any) => {
    let response;
    if (data.id) {
      response = await api.put(`${url}/${data.id}`, data);
    } else {
      response = await api.post(url, data);
    }
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (formData: any) => saveOne(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.guestbooks] });
    },
  });
  return mutation;
}

export function useGuestbookDelete() {
  const api = useAxiosUnAuth();
  const queryClient = useQueryClient();

  const deleteOne = async (id: number) => {
    const data = await api.delete(`${url}/${id}`);
    return data;
  };

  const mutation = useMutation({
    mutationFn: (id: number) => deleteOne(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.guestbooks] });
    },
  });

  return mutation;
}
