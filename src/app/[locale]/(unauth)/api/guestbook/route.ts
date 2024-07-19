import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';
import { GuestbookValidation } from '@/validations/GuestbookValidation';

const getAll = async (page: number) => {
  try {
    const limit = 10;
    const offset = page * limit;

    const guestbooks = await db
      .select()
      .from(guestbookSchema)
      .offset(offset)
      .limit(limit);

    const totalItem = (await db.select().from(guestbookSchema)).length;
    const totalPage = Math.ceil(totalItem / limit);

    logger.info('Fetched all guestbook entries');

    return NextResponse.json({ row: guestbooks, totalItem, totalPage });
  } catch (error) {
    logger.error(error, 'An error occurred while fetching guestbook entries');

    return NextResponse.json({}, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  const params = new URL(request.url).searchParams;

  const result = await getAll(parseInt(params.get('activePage') || '0', 10));

  return result;
};

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = GuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    const guestbook = await db
      .insert(guestbookSchema)
      .values(parse.data)
      .returning();

    logger.info('A new guestbook has been created');

    return NextResponse.json({
      id: guestbook[0]?.id,
    });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};
