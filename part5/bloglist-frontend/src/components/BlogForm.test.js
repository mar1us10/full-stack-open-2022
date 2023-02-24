import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('#blog-form')

  fireEvent.change(title, { target: { value: 'new title' } })
  fireEvent.change(author, { target: { value: 'new author' } })
  fireEvent.change(url, { target: { value: 'new url' } })

  fireEvent.submit(form)

  expect(addBlog.mock.calls[0][0].title).toBe('new title')
  expect(addBlog.mock.calls[0][0].author).toBe('new author')
  expect(addBlog.mock.calls[0][0].url).toBe('new url')
  expect(addBlog.mock.calls).toHaveLength(1)
})