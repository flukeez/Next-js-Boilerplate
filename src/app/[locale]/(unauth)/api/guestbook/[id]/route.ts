import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';
import { EditGuestbookValidation } from '@/validations/GuestbookValidation';

const getById = async (id: number) => {
  try {
    const guestbook = await db
      .select()
      .from(guestbookSchema)
      .where(eq(guestbookSchema.id, id))
      .limit(1);

    if (guestbook.length === 0) {
      return NextResponse.json(
        { message: 'Guestbook entry not found' },
        { status: 404 },
      );
    }

    logger.info('Fetched guestbook entry by ID');

    return NextResponse.json(guestbook[0]);
  } catch (error) {
    logger.error(
      error,
      'An error occurred while fetching guestbook entry by ID',
    );

    return NextResponse.json({}, { status: 500 });
  }
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.href.split('/').pop();

  try {
    return await getById(parseInt(id!, 10));
  } catch (error) {
    logger.error('Error handling GET request:', error);
  }
}

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  try {
    await db
      .update(guestbookSchema)
      .set({
        body: parse.data.body,
        username: parse.data.username,
      })
      .where(eq(guestbookSchema.id, parse.data.id));

    logger.info('A guestbook entry has been updated');

    return NextResponse.json({ id: parse.data.id });
  } catch (error) {
    logger.error(error, 'An error occurred while updating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const url = new URL(request.url);
  const id = url.href.split('/').pop();

  try {
    await db
      .delete(guestbookSchema)
      .where(eq(guestbookSchema.id, parseInt(id || '0', 10)));

    logger.info('A guestbook entry has been deleted');

    return NextResponse.json(1);
  } catch (error) {
    logger.error(error, 'An error occurred while deleting a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};
