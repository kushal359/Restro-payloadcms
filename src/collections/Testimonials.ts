import { CollectionConfig } from 'payload'

export const Testimonial: CollectionConfig = {
  slug: 'testimonial',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Person Name',
      type: 'text',
      required: true,
    },
    {
      name: 'personimage',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'testimony',
      label: 'Testimony',
      type: 'textarea',
    },
    {
      name: 'featured',
      label: 'Show on homepage',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.featured) {
          const existing = await req.payload.find({
            collection: 'testimonial',
            where: {
              featured: {
                equals: true,
              },
            },
          })

          if (existing.totalDocs >= 3) {
            throw new Error('You can only have 3 featured testimonials.')
          }
        }

        return data
      },
    ],
  },
}
