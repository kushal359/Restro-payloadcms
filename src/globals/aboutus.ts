import { GlobalConfig } from 'payload'

export const Aboutus: GlobalConfig = {
  slug: 'aboutus',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'aboutText',
      label: 'Heading Text',
      type: 'text',
      defaultValue: 'About Restaurant',
    },
    {
      name: 'aboutTexthighlight',
      label: 'Heading Text Highted',
      type: 'text',
      defaultValue: 'Restro Land',
    },
    {
      name: 'aboutusparagraphtext',
      label: 'Paragraph Text',
      type: 'textarea',
      admin: {
        components: {
          Field: 'src/components/RichTextContent',
        },
      },
      required: true,
    },

    {
      name: 'bgimageaboutus',
      label: 'Background For AboutUs',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
