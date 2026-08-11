type Blog = {
  _id?: string
  title: string
  author: string
  url: string
  likes: number
}

export const dummy = (blogs: Blog[]): number => {
  return 1
}

export const totalLikes = (blogs: Blog[]): number => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

export const favoriteBlog = (blogs: Blog[]) => {
  if (blogs.length === 0) return null
  const fav = blogs.reduce((prev, curr) => (curr.likes > prev.likes ? curr : prev))
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  }
}

export const mostBlogs = (blogs: Blog[]) => {
  if (blogs.length === 0) return null
  const counts: Record<string, number> = {}
  blogs.forEach((b) => {
    counts[b.author] = (counts[b.author] || 0) + 1
  })
  let topAuthor = ''
  let max = 0
  for (const author in counts) {
    if (counts[author] > max) {
      max = counts[author]
      topAuthor = author
    }
  }
  return { author: topAuthor, blogs: max }
}

export const mostLikes = (blogs: Blog[]) => {
  if (blogs.length === 0) return null
  const sums: Record<string, number> = {}
  blogs.forEach((b) => {
    sums[b.author] = (sums[b.author] || 0) + (b.likes || 0)
  })
  let topAuthor = ''
  let max = 0
  for (const author in sums) {
    if (sums[author] > max) {
      max = sums[author]
      topAuthor = author
    }
  }
  return { author: topAuthor, likes: max }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
