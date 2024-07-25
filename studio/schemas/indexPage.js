import { defineField, defineType } from 'sanity'
import { BookIcon, BlockContentIcon, DesktopIcon, DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'indexPage',
  title: 'Index page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Index',
      type: 'string'
    },
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
              title: 'Title',
              name: 'title',
              type: 'string'
            },
            {
              title: 'Featured text',
              name: 'featuredText',
              type: 'array',
              of: [{
                type: 'object',
                name: 'featuredRichText',
                title: 'Rich Text',
                fields: [
                  defineField({
                    name: 'text',
                    title: 'Text',
                    type: 'blockContent',
                  })
                ]
              }]
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'featuredText'
            },
            prepare: ({ title }) => {
              const fixedTitle = 'Featured Text'
              return {
                title: fixedTitle,
                subtitle: title,
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
                subtitle: subtitle ? `${subtitle}` : ''
              }
            }
          }
        },
        {
          type: 'object',
          name: 'indexBlogPosts',
          title: 'Blog posts',
          icon: BookIcon,
          fields: [
            {
              name: 'title',
              title: 'Blog title',
              type: 'string',
            },
            {
              name: 'indexBlogCopy',
              title: 'Blogs copy',
              type: 'text',
            },
            {
              name: 'indexBlogUseLatest',
              title: 'Use latest?',
              type: 'boolean',
            },
            {
              name: 'indexBlogArray',
              title: 'Blog Array',
              type: 'array',
              of: [
                {
                  title: 'Blog',
                  name: 'indexBlog',
                  type: 'reference',
                  to: [{ type: 'post' }],
                  weak: true,
                  options: {
                    disableNew: true,
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              isLatest: 'indexBlogUseLatest',
            },
            prepare: ({ isLatest }) => {
              return {
                title: 'Blog Posts',
                subtitle: isLatest ? 'Latest' : 'Custom'
              }
            }
          }
        },
        {
          type: 'object',
          name: 'indexFeaturedBlog',
          title: 'Featured Blog',
          icon: DocumentIcon,
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title',
            },
            {
              title: 'Featured Blog',
              name: 'indexFeaturedBlogPost',
              type: 'reference',
              to: [{ type: 'post' }],
              weak: true,
              options: {
                disableNew: true,
              },              
            },
          ],
          preview: {
            select: {
              media: 'indexFeaturedBlogPost.mainImage',
              title: 'indexFeaturedBlogPost.title',
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
        },
      ],
      preview: {
        select: {
          title: 'title'
        }
      }
    }),
  ],
})