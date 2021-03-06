import React,{ useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog,setUpdatedBlog,loggedinUser }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const updateBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      url: blog.url,
      author: blog.author,
      title: blog.title
    }
    console.log('this is object: ',blogObject)
    try {
      await blogService
        .like( blog.id, blogObject )
      setUpdatedBlog(blog)
    } catch (exception) {
      // console.log(exception)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Do you really want to delete blog: ${blog.title}?`)) {
      try {
        await blogService
          .deleteBlog( blog.id )
        setUpdatedBlog(blog)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div className='blog-tile' id='blog-tile'>
      <strong className="blog-title">{blog.title}</strong> <button onClick={toggleVisibility} id='view-button'>view</button>
      <p className="blog-author">{blog.author}</p>
      <div style={showWhenVisible} className='blog-toggable-info'>
        <p className='blog-url'>{blog.url}</p>
        <p className='blog-likes'>Likes: {blog.likes} <button id='like-button' className='like-button' onClick={updateBlog}>like</button></p>
        {loggedinUser.username === blog.user.username &&
        <button className='delete-button'id='delete-button' onClick={() => deleteBlog()}>DELETE</button> }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setUpdatedBlog: PropTypes.func.isRequired,
  loggedinUser: PropTypes.object.isRequired
}

export default Blog