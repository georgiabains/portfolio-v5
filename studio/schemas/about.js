import { defineField, defineType } from 'sanity'

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'About',
      type: 'string'
    },
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ]
}