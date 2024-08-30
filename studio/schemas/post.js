import { defineField, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
          description: 'Only used on blog pages (omitted from blog cards for brevity).'
        },
        {
          name: 'attribution',
          type: 'object',
          title: 'Attribution',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            }
          ]
        }
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
