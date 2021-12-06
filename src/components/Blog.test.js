import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


jest.mock('axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Blog />', () => {

  test('renders content', () => {
    const setUpdatedBlog = () => {}

    const blog = {
      author: 'test',
      title: 'test-title',
      url: 'http://test.com',
      likes: 0,
      id: '1773',
      user: {
        username: 'test-user'
      }
    }
    const user = {
      username: 'test-user'
    }

    const component = render(
      <Blog loggedinUser={user} key={blog.id} blog={blog} setUpdatedBlog={setUpdatedBlog}/>
    )
    const authorP = component.container.querySelector('.blog-author')
    const titleStrong = component.container.querySelector('.blog-title')
    expect(authorP).toHaveTextContent('test')
    expect(titleStrong).toHaveTextContent('test-title')
  })

  test('renders toggable content', () => {
    const setUpdatedBlog = () => {}

    const blog = {
      author: 'test',
      title: 'test-title',
      url: 'http://test.com',
      likes: 0,
      id: '1773',
      user: {
        username: 'test-user'
      }
    }
    const user = {
      username: 'test-user'
    }

    const component = render(
      <Blog loggedinUser={user} key={blog.id} blog={blog} setUpdatedBlog={setUpdatedBlog}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-toggable-info')
    expect(div).not.toHaveStyle('display: none')
  })

  test('renders like content', () => {
    const blog = {
      author: 'test',
      title: 'test-title',
      url: 'http://test.com',
      likes: 0,
      id: '1773',
      user: {
        username: 'test-user',
        id: '1770'
      }
    }
    const user = {
      username: 'test-user',
      id: '1770'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog loggedinUser={user} key={blog.id} blog={blog} setUpdatedBlog={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})