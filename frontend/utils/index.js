/**
 * Global utility functions.
 */

export function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, {nonTextBehavior: 'remove'}, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export function formatDate(date) {
  const dateObject = new Date(date)

  return Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObject)
}
