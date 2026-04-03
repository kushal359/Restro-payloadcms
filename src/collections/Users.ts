import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: { placeholder: 'Enter First Name' },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: { placeholder: 'Enter Last Name' },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: 'src/components/PhoneInput#PhoneInput',
        },
      },
    },
    {
      name: 'currentuser',
      type: 'ui',
      admin: {
        components: {
          Field: 'src/components/CurrentLoggedUser#MyComponent',
        },
      },
    },
  ],
  hooks: {
    /**
     * Preventing Users with role except admin to login
     */
    beforeLogin: [
      async ({ user }) => {
        if (user.role === 'user') {
          throw new Error('You are not Allowed to login')
        }
      },
    ],
    /**
     * Prevent non admin user from upgrading their role.
     */
    beforeOperation: [
      async ({
        req,
        args,
        operation,
        context,
      }: {
        req: any
        args: any
        operation: string
        context: any
      }) => {
        if (operation === 'create' || operation === 'update') {
          if (args.data?.role === 'admin') {
            if (!req.user || req.user.role !== 'admin') {
              args.data.role = 'user'
              context.customError = {
                type: 'role',
                message: 'You are not allowed to assign admin role',
              }
              throw new Error('You are Not admin')
            }
          }
        }
        return args
      },
    ],
  },
}
