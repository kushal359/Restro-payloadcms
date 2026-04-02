import { GlobalConfig } from "payload";

export const Contactus: GlobalConfig = {
    slug: 'contactus',
     access: {
        read: () => true,
    },
    fields: [
        {
            name: 'contactText',
            label: 'Heading Text',
            type: 'text',
            defaultValue: 'Contact Us On',
        },
        {
            name: 'contactTexthighlight',
            label: 'Heading Text Highted',
            type: 'text',
            defaultValue: 'Restro Land',
        },
        {
            name: 'contactusparagraphtext',
            label: 'Paragraph Text',
            type: 'textarea',
            required: true,
        },
        {
            name: 'contactph',
            label: 'Contact Highlited',
            type: 'text',
            defaultValue: 'Contact:',
        },
         {
            name: 'contactdetails',
            label: 'Contact No',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Email Highlited',
            type: 'text',
            defaultValue: 'Email:',
        },
        {
            name: 'emaildetails',
            label: 'Email ID',
            type: 'text',
        },

         {
            name: 'bgimagecontactus',
            label: 'Background For ContactUs',
            type: 'upload',
            relationTo: 'media', 
            required: true,
        },
    ]
}


   
    