import { defineField, defineType } from 'sanity'
import { BlockContentIcon, DesktopIcon } from '@sanity/icons'

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
          icon: BlockContentIcon,
          fields: [
            {
              title: 'Featured text',
              name: 'featuredText',
              type: 'array',
              of: [{
                type: 'text',
              }]
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'featuredText'
            },
            prepare: ({ subtitle }) => {
              const fixedTitle = 'Featured Text'
              return {
                title: fixedTitle,
                subtitle: `${subtitle[0]}`
              }
            }
          }
        },
        {
          type: 'object',
          name: 'indexProjects',
          title: 'Projects',
          icon: DesktopIcon,
          fields: [
            {
              name: 'indexProjectCopy',
              title: 'Projects copy',
              type: 'text',
            },
            {
              name: 'indexProjectArray',
              title: 'Project Array',
              type: 'array',
              of: [
                {
                  title: 'Project',
                  name: 'indexProject',
                  type: 'reference',
                  to: [{ type: 'project' }],
                  options: {
                    disableNew: true,
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              subtitle: 'indexProjectCopy',
            },
            prepare: ({ subtitle }) => {
              const fixedTitle = 'Project Container'
              return {
                title: fixedTitle,
                subtitle: `${subtitle}`
              }
            }
          }
        }
      ],
    }),
  ],
})