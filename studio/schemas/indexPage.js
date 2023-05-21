import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'indexPage',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'indexBlockContent',
          title: 'Block Content',
          fields: [
            {
              title: 'Block Content',
              name: 'blockContent',
              type: 'blockContent'
            },
          ]
        },
        {
          type: 'code'
        },
        {
          type: 'object',
          name: 'indexFeaturedText',
          title: 'Featured Text',
          fields: [
            {
              title: 'Featured text',
              name: 'featuredText',
              type: 'text'
            }
          ]
        }
      ],
    }),
  ],
})