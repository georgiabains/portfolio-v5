/**
 * Projects section.
 * - TODO: Update to match Blog system - option to pull latest, ignore featured
 */

// defineArrayMember({
//   type: 'object',
//   name: 'indexProjects',
//   title: 'Projects',
//   icon: DesktopIcon,
//   fields: [
//     {
//       name: 'indexProjectCopy',
//       title: 'Projects copy',
//       type: 'text',
//     },
//     {
//       name: 'indexProjectArray',
//       title: 'Project Array',
//       type: 'array',
//       of: [
//         {
//           title: 'Project',
//           name: 'indexProject',
//           type: 'reference',
//           to: [{ type: 'project' }],
//           options: {
//             disableNew: true,
//           }
//         }
//       ]
//     }
//   ],
//   preview: {
//     select: {
//       subtitle: 'indexProjectCopy',
//     },
//     prepare: ({ subtitle }) => {
//       const fixedTitle = 'Project Container'
//       return {
//         title: fixedTitle,
//         subtitle: subtitle ? `${subtitle}` : ''
//       }
//     }
//   }
// }),