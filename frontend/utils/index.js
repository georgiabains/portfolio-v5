/**
 * Global utility functions.
 */

export function formatDate(date) {
  const dateObject = new Date(date)

  return Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObject)
}
