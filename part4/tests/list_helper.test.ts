import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../src/utils/list_helper'

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs: any[] = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  const listWithOneBlog: any[] = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  const blogs: any[] = [
    { title: 'A', author: 'X', url: 'u', likes: 2 },
    { title: 'B', author: 'Y', url: 'u', likes: 5 },
    { title: 'C', author: 'X', url: 'u', likes: 3 },
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, { title: 'B', author: 'Y', likes: 5 })
  })
})

describe('most blogs', () => {
  const blogs: any[] = [
    { title: 'A', author: 'X', url: 'u', likes: 2 },
    { title: 'B', author: 'Y', url: 'u', likes: 5 },
    { title: 'C', author: 'X', url: 'u', likes: 3 },
  ]

  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'X', blogs: 2 })
  })
})

describe('most likes', () => {
  const blogs: any[] = [
    { title: 'A', author: 'X', url: 'u', likes: 2 },
    { title: 'B', author: 'Y', url: 'u', likes: 5 },
    { title: 'C', author: 'X', url: 'u', likes: 3 },
  ]

  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'X', likes: 5 })
  })
})
