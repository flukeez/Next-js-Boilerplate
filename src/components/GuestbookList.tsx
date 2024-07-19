'use client';

import { useEffect } from 'react';

import { useGuestbookFilter, useGuestbooks } from '@/hooks/guestbook';

import { DeleteGuestbookEntry } from './DeleteGuestbookEntry';
import { EditableGuestbookEntry } from './EditableGuestbookEntry';

const GuestbookList = () => {
  const { filter, updateFilter } = useGuestbookFilter();

  const setCondition = () => {
    const condition = {
      activePage: filter.activePage - 1,
    };
    return condition;
  };
  const { data, isLoading, setFilter, error } = useGuestbooks(setCondition());

  const onFilter = async () => {
    setFilter(setCondition());
  };
  useEffect(() => {
    onFilter();
  }, [filter.activePage]);

  if (isLoading) {
    return <h2 className="mt-5">กำลังโหลดข้อมูล ...</h2>;
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-5" data-testid="guestbook-list">
      {data?.row.map((elt) => (
        <div key={elt.id} className="mb-1 flex items-center gap-x-1">
          <DeleteGuestbookEntry id={elt.id} />

          <EditableGuestbookEntry
            id={elt.id}
            username={elt.username}
            body={elt.body}
          />
        </div>
      ))}
      <div className="mt-4 flex justify-between">
        <div>
          <h4>จำนวนรายการทั้งหมด : {data?.totalItem}</h4>
        </div>
        <div>
          {Array.from(Array(data?.totalPage), (e, i) => {
            return (
              <button
                key={i}
                type="button"
                className={`mx-1 rounded ${filter.activePage === i + 1 ? 'bg-blue-500' : 'bg-gray-500'} px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50`}
                onClick={() => updateFilter({ activePage: i + 1 })}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { GuestbookList };
