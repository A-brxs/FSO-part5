import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setNewBlog,showNotif,setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    console.log(event)
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      await blogService
        .create(blogObject)
      showNotif(`Blog ${title} created for author ${author}`)
    } catch (exception) {
      setErrorMessage('Missing information')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    setNewBlog(blogObject)
  }
  return (

    <form onSubmit={addBlog}>
      <div>
      title
        <input
          type="text"
          id='title'
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
      author
        <input
          type="text"
          id='author'
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url
        <input
          type="url"
          id='url'
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id='create-button'>Create</button>
    </form>
  )
}
export default BlogForm