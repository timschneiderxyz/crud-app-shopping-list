/*  ========================================================================
    # Backend - Routes - Items
    ========================================================================  */

import express, { type Request as ExpressRequest, type Response as ExpressRespone } from 'express';
// import db from '@/db';

const router = express.Router();

/**
 * Returns the shopping list.
 *
 * @route GET /items
 */
router.get('/', async (_req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  // const database = await db;
  res.json({ hello: 'World' });
});

/**
 * Adds a new item to the shopping list.
 *
 * @route POST /items
 */
router.post('/', async (_req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  // const database = await db;
  res.json({ hello: 'World' });
});

/**
 * Updates the "bought" status of an item.
 *
 * @route PUT /items/:id
 */
router.put('/:id', async (_req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  // const database = await db;
  res.json({ hello: 'World' });
});

/**
 * Deletes an item from the shopping list.
 *
 * @route DELETE /items/:id
 */
router.delete('/:id', async (_req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  // const database = await db;
  res.json({ hello: 'World' });
});

export default router;
