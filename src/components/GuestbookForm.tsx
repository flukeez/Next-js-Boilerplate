'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { useGuestbook, useGuestbookSave } from '@/hooks/guestbook';
import { GuestbookValidation } from '@/validations/GuestbookValidation';

const GuestbookForm = ({ id = 0 }: { id: number }) => {
  const { data, isLoading, isPending } = useGuestbook(id);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof GuestbookValidation>>({
    resolver: zodResolver(GuestbookValidation),
    defaultValues: {
      username: '',
      body: '',
    },
  });
  const t = useTranslations('GuestbookForm');
  const mutationSave = useGuestbookSave();

  const handleCreate = handleSubmit(async (formData) => {
    try {
      const result = await mutationSave.mutateAsync(formData);
      if (result.id) {
        alert('บันทึกข้อมูลสำเร็จ');
        reset();
      } else {
        alert('ดำเนินการไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Failed to save guestbook', error);
    }
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  if (isLoading || isPending) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        <label
          className="text-sm font-bold text-gray-700"
          htmlFor={`username${id || ''}`}
        >
          {t('username')}
          <input
            id={`username${id || ''}`}
            className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...register('username')}
          />
        </label>
        {errors.username?.message && (
          <div className="my-2 text-xs italic text-red-500">
            {errors.username?.message}
          </div>
        )}
      </div>

      <div className="mt-3">
        <label
          className="text-sm font-bold text-gray-700"
          htmlFor={`body${id || ''}`}
        >
          {t('body')}
          <input
            id={`body${id || ''}`}
            className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...register('body')}
          />
        </label>
        {errors.body?.message && (
          <div className="my-2 text-xs italic text-red-500">
            {errors.body?.message}
          </div>
        )}
      </div>

      <div className="mt-5">
        <button
          className={`rounded ${mutationSave.isPending ? 'opacity-50' : ''} bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50`}
          type="submit"
          disabled={mutationSave.isPending}
        >
          {t('save')}
        </button>
      </div>
    </form>
  );
};

export { GuestbookForm };
