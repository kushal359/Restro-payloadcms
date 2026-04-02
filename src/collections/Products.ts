import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
   access: {
        read: () => true,
    },
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'image',
      'name',
      'category',
      'price',
      'isAvailable',
      'isFeatured',
      'description',
      'tags',
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        components: {
          Field: 'src/components/RichTextContent',
        },
      },
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'Price ($)',
          type: 'number',
          required: true,
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'category',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isAvailable',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Spicy', value: 'spicy' },
        { label: 'Veg', value: 'veg' },
        { label: 'Popular', value: 'popular' },
      ],
    },
  ],
}
