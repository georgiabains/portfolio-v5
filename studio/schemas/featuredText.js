import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons'

export default defineType({
  type: 'object',
  name: 'featuredText',
  title: 'Featured Text',
  icon: TextIcon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => {
      const fixedTitle = 'Featured Text'
      return {
        title: fixedTitle,
        subtitle: title,
      }
    }
  }
})