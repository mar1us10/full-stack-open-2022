import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const test_user = {
  username: 'tester',
  name: 'The Tester'
}

const test_blog = {
  title: 'Testing',
  author: 'Testman',
  url: 'https://test.com/testman',
  likes: 35,
  user: test_user
}

test('component displays only the title and author by default', () => {
  const element = render(<Blog blog={test_blog} user={test_user} updateBlog={() => {}} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  expect(element.container.querySelector('.title')).toHaveTextContent(test_blog.title)
  expect(element.container.querySelector('.author')).toHaveTextContent(test_blog.author)
  expect(element.queryByText(test_blog.url)).not.toBeInTheDocument()
  expect(element.queryByText(test_blog.likes)).not.toBeInTheDocument()
})

test('component renders blog\'s url and number of likes when view button is clicked', () => {
  const element = render(<Blog blog={test_blog} user={test_user} updateBlog={() => {}} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  const button = element.getByText('view')
  fireEvent.click(button)

  expect(element.container).toHaveTextContent('https://test.com/testman')
  expect(element.container).toHaveTextContent(35)
})

test('if the like button is clicked twice, the event handler is called twice as well', () => {
  const mockHandler = jest.fn()
  const element = render(<Blog blog={test_blog} user={test_user} updateBlog={mockHandler} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  const button = screen.getByText('view')
  fireEvent.click(button)

  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

