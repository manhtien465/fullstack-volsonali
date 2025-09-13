export function buildStrapiQueryParams(populate: Record<string, any> = {}): string {
  const params = new URLSearchParams()

  // Add populate parameters
  Object.entries(populate).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        params.append(`populate[${key}][${nestedKey}]`, String(nestedValue))
      })
    } else {
      params.append(`populate[${key}]`, String(value))
    }
  })

  return params.toString()
}