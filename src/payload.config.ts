import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Category } from './collections/Category'
import { Banner } from './globals/Banner'
import { Testimonial } from './collections/Testimonials'
import { Aboutus } from './globals/aboutus'
import { Contactus } from './globals/Contact'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Category, Testimonial],
  editor: lexicalEditor(),
  globals: [Banner,Aboutus,Contactus],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
