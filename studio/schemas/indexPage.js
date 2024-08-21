import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'indexPage',
  title: 'Index page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Index',
      type: 'string'
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'sections',
    })
  ],
})