import { defineField, defineType } from 'sanity'

export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Footer',
      type: 'string'
    },
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ]
}