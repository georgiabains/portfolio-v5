import { defineArrayMember, defineType } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'

export default defineType({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'sectionBlockContent',
      title: 'Block Content',
      icon: BlockContentIcon,
      fields: [
        {
          title: 'Block Content',
          name: 'blockContent',
          type: 'blockContent'
        },
      ]
    }),
    defineArrayMember({
      type: 'code'
    }),
    defineArrayMember({
      type: 'featuredText',
    }),
    defineArrayMember({
      type: 'selectedBlogs',
    }),
    defineArrayMember({
      type: 'featuredBlog'
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})