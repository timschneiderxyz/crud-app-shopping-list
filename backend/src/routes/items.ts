/*  ========================================================================
    # Backend - Routes - Items
    ========================================================================  */

import express, { type Request as ExpressRequest, type Response as ExpressRespone } from 'express';
import { ObjectId } from 'mongodb';
import db from '@/db';

const router = express.Router();

/**
 * Returns the shopping list.
 *
 * @route GET /items
 */
router.get('/', async (_req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  try {
    const database = await db;
    const items = await database.collection('items').find({}).sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});

/**
 * Adds a new item to the shopping list.
 *
 * @route POST /items
 */
router.post('/', async (req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Item name is required.' });
      return;
    }

    const database = await db;
    const newItem = {
      name,
      bought: false,
      createdAt: new Date()
    };

    const result = await database.collection('items').insertOne(newItem);
    res.status(201).json({ ...newItem, _id: result.insertedId });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to add item.' });
  }
});

/**
 * Updates the "bought" status of an item.
 *
 * @route PUT /items/:id
 */
router.put('/:id', async (req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    if (typeof bought !== 'boolean') {
      res.status(400).json({ error: 'Bought status must be a boolean.' });
      return;
    }

    const database = await db;
    const result = await database
      .collection('items')
      .updateOne({ _id: new ObjectId(id) }, { $set: { bought } });

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Item not found.' });
      return;
    }

    res.json({ message: 'Item updated successfully.' });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to update item.' });
  }
});

/**
 * Deletes an item from the shopping list.
 *
 * @route DELETE /items/:id
 */
router.delete('/:id', async (req: ExpressRequest, res: ExpressRespone): Promise<void> => {
  try {
    const { id } = req.params;
    const database = await db;
    const result = await database.collection('items').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found.' });
      return;
    }

    res.status(204).send();
  } catch (_error) {
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});

export default router;
