import { GlobalConfig } from "payload";
export const Banner: GlobalConfig = {
    slug: 'banner',
     access: {
        read: () => true,
    },
    fields: [
        {
            name: 'welcomeText',
            label: 'Welcome Text',
            type: 'text',
            defaultValue: 'Welcome to',
        },
         {
            name: 'mainHeadingLine1',
            label: 'Main Heading Line 1',
            type: 'text',
            required: true,
            defaultValue: 'Restro Land Restaurant',
        },
        {
            name: 'mainHeadingLine2',
            label: 'Main Heading Line 2',
            type: 'text',
            required: true,
            defaultValue: 'and Enjoy',
        },
        {
            name: 'highlightText',
            label: 'Highlighted Text',
            type: 'text',
            defaultValue: 'The Food',
        },
        {
            name: 'paragraphtext',
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
            name: 'heroImage',
            label: 'Hero Image',
            type: 'upload',
            relationTo: 'media', 
            required: true,
        },
    ]
}


   
    