import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'featuredBlog',
  title: 'Featured Blog',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      title: 'Featured Blog',
      name: 'featuredBlogPost',
      type: 'reference',
      to: [{ type: 'post' }],
      weak: true,
      options: {
        disableNew: true,
      },              
    }),
  ],
  preview: {
    select: {
      media: 'featuredBlogPost.mainImage',
      title: 'featuredBlogPost.title',
    },
    prepare(selection) {
      const { media, title } = selection
      return {
        media: media,
        title: 'Featured Blog',
        subtitle: title
      }
    }
  },
})