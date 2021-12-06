import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './TestBlog'
import BlogForm from './TestBlogForm'


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

  test('triggers like handler', () => {
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

  test('triggers create handler', () => {
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
      <BlogForm setNewBlog={mockHandler} />
    )

    const form = component.container.querySelector('.blog-form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(
      author, {
        target: { value: blog.author }
      })
    fireEvent.change(
      title, {
        target: { value: blog.title }
      })
    fireEvent.change(
      url, {
        target: { value: blog.url }
      }
    )
    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0].author).toBe( 'test' )
    expect(mockHandler.mock.calls[0][0].title).toBe('test-title' )
    expect(mockHandler.mock.calls[0][0].url).toBe( 'http://test.com' )
  })
})