'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { queryKeys } from '../queryKeys';
import useAxiosUnAuth from '../useAxiosPublic';

type GuestbookEntry = {
  id: number;
  username: string;
  body: string;
  updatedAt: Date;
  createdAt: Date;
};

type ResultData = {
  row: GuestbookEntry[];
  totalPage: number;
  totalItem: number;
};

interface Filter {
  activePage: number;
}

const url = '/guestbook';

export function useGuestbooks(condition: Filter) {
  const api = useAxiosUnAuth();
  const [filter, setFilter] = useState(condition);

  const findAll = async () => {
    const params = new URLSearchParams([
      ['activePage', filter.activePage.toString() || '0'],
    ]);
    const response = await api.get(url, { params });
    return response.data;
  };

  const query = useQuery<ResultData, Error>({
    queryKey: [queryKeys.guestbooks, filter],
    queryFn: findAll,
  });
  return { ...query, setFilter };
}

/**
 * GET One by ID
 * @param id
 * @returns
 */
export function useGuestbook(id: number) {
  const api = useAxiosUnAuth();
  const [filter, setFilter] = useState(id);

  const findById = async () => {
    if (!id) {
      return {};
    }
    const { data } = await api.get(`${url}/${filter}`);
    return data;
  };

  const query = useQuery({
    queryKey: [queryKeys.guestbookGet, filter],
    queryFn: findById,
  });

  return { ...query, setFilter };
}
