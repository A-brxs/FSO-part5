import React,{useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({blog,setUpdatedBlog,loggedinUser}) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  

  const updateBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title
    }
    console.log('this is object: ',blogObject)
    try {
      await blogService
        .like( blog.id, blogObject )
        setUpdatedBlog(blog)
    } catch (exception) {
        console.log(exception)
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
  <div className='blog-tile'>
    <strong className="blog-title">{blog.title}</strong> <button onClick={toggleVisibility}>view</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={updateBlog}>like</button></p>
      <p>{blog.author}</p>
      {loggedinUser.username === blog.user.username && 
        <button className='delete-button'onClick={() => deleteBlog()}>DELETE</button> }
    </div>
  </div>
  )
}
export default Blog