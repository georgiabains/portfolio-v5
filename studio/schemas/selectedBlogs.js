import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'selectedBlogs',
  title: 'Selected Blogs',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
    }),
    defineField({
      name: 'useLatest',
      title: 'Use latest?',
      type: 'boolean',
    }),
    defineField({
      name: 'blogArray',
      title: 'Blog Array',
      type: 'array',
      of: [
        {
          title: 'Blog',
          name: 'blog',
          type: 'reference',
          to: [{ type: 'post' }],
          weak: true,
          options: {
            disableNew: true,
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      isLatest: 'useLatest',
    },
    prepare: ({ isLatest }) => {
      return {
        title: 'Blog Posts',
        subtitle: isLatest ? 'Latest' : 'Custom'
      }
    }
  }
})