export function buildPagination({ page = 1, limit = 10 }) {
  page = Math.max(1, parseInt(page))
  limit = Math.max(1, Math.min(50, parseInt(limit)))
  const skip = (page - 1) * limit
  return { page, limit, skip }
}
