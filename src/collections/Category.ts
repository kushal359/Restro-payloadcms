import type { CollectionConfig } from 'payload'

export const Category: CollectionConfig = {
  slug: 'category',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['icon', 'name', 'order'],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      label: 'Serving Order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Use this number to sort categories',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
  ],
}
