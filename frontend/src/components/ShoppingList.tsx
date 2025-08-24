/*  ========================================================================
    # Frontend - Components - Shopping List
    ========================================================================  */

import { BACKEND_URL } from 'astro:env/client';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Plus as PlusIcon, Check as CheckIcon, Trash2 as TrashIcon } from 'lucide-react';
import clsx from 'clsx';

type ShoppingItem = {
  _id: string;
  name: string;
  bought: boolean;
};

const ShoppingList = () => {
  const itemsApiEndpoint = `${BACKEND_URL}/items`;
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initial fetch of shopping list items.
   */
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await fetch(itemsApiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch items.');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError('Failed to fetch items. Please try again later.');
        // biome-ignore lint/suspicious/noConsole: Client logging
        console.log('Failed to fetch items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllItems();
  }, [itemsApiEndpoint]);

  /**
   * Add a new item to the shopping list.
   */
  const addItem = async (event: FormEvent) => {
    event.preventDefault();
    if (!newItemName.trim()) return;

    try {
      setError(null);
      const response = await fetch(itemsApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newItemName.trim() })
      });
      if (!response.ok) throw new Error('Failed to add item.');
      const newItem = await response.json();
      setItems([newItem, ...items]);
      setNewItemName('');
    } catch (error) {
      setError('Failed to add item. Please try again later.');
      // biome-ignore lint/suspicious/noConsole: Client logging
      console.log('Failed to add item:', error);
    }
  };

  /**
   * Toggle the "bought" status of an item.
   */
  const toggleBought = async (id: string, bought: boolean) => {
    try {
      setError(null);
      const response = await fetch(`${itemsApiEndpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bought: !bought })
      });
      if (!response.ok) throw new Error('Failed to update item.');
      setItems(items.map(item => (id === item._id ? { ...item, bought: !item.bought } : item)));
    } catch (error) {
      setError('Failed to update item. Please try again later.');
      // biome-ignore lint/suspicious/noConsole: Client logging
      console.log('Failed to update item:', error);
    }
  };

  /**
   * Delete an item from the shopping list.
   */
  const deleteItem = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`${itemsApiEndpoint}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete item.');
      setItems(items.filter(item => id !== item._id));
    } catch (error) {
      setError('Failed to delete item. Please try again later.');
      // biome-ignore lint/suspicious/noConsole: Client logging
      console.log('Failed to delete item:', error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={addItem}>
        <div className="flex flex-col gap-3">
          <label htmlFor="add-new-item-input" className="text-sm font-semibold leading-none">
            Add new item
          </label>
          <input
            id="add-new-item-input"
            type="text"
            value={newItemName}
            placeholder="e.g. butter"
            onChange={e => setNewItemName(e.target.value)}
            className="w-full h-9 px-3 py-1 bg-transparent border border-gray-200 rounded-md outline-none shadow-xs text-sm transition-[color,box-shadow] placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-[3px] focus-visible:ring-gray-400/50"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center items-center gap-2 h-9 px-4 bg-blue-600 rounded-md outline-none shadow-xs text-sm font-semibold text-white whitespace-nowrap transition-color cursor-pointer hover:bg-blue-600/90"
        >
          Add
          <PlusIcon className="pointer-events-none" size={16} />
        </button>
      </form>
      {error ? (
        <div className="mt-8 p-4 bg-red-50 rounded-md text-sm text-red-600" role="alert">
          <strong>Error:</strong> {error}
        </div>
      ) : null}
      {!isLoading && items.length > 0 ? (
        <ul className="flex flex-col gap-3 mt-8">
          {items.map(item => (
            <li
              key={item._id}
              className="flex justify-between gap-6 p-2 border border-gray-200 rounded-md shadow-xs"
            >
              <label
                htmlFor={`item-${item._id}-checkbox`}
                className="flex-1 flex gap-3 cursor-pointer"
              >
                <input
                  id={`item-${item._id}-checkbox`}
                  type="checkbox"
                  checked={item.bought}
                  onChange={() => toggleBought(item._id, item.bought)}
                  className="hidden"
                />
                <div
                  className={clsx(
                    'inline-flex justify-center items-center size-9 rounded-md outline-none shadow-xs text-white transition-color cursor-pointer',
                    item.bought ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                >
                  <CheckIcon className="pointer-events-none" size={16} />
                </div>
                <p
                  className={clsx('flex-1', {
                    'text-gray-400 line-through': item.bought
                  })}
                >
                  {item.name}
                </p>
              </label>
              <button
                type="button"
                aria-label={`Delete ${item.name}`}
                onClick={() => deleteItem(item._id)}
                className="inline-flex justify-center items-center size-9 bg-red-600 rounded-md outline-none shadow-xs text-white transition-color cursor-pointer hover:bg-red-600/90"
              >
                <TrashIcon className="pointer-events-none" size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {!isLoading && items.length === 0 ? (
        <p className="mt-8 text-gray-600 text-center">No items.</p>
      ) : null}
      {isLoading ? <p className="mt-8 text-gray-600 text-center">Loading items...</p> : null}
    </>
  );
};

export default ShoppingList;
