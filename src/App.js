import React, { useState, useEffect } from 'react'
import { ErrorNotification, PositiveNotification } from './components/Notifications'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [updateBlog, setUpdatedBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [positiveMessage, setPositiveMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user,newBlog,updateBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLougout = () => {
    console.log('Logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort( (a,b) => b.likes - a.likes )
        .map(blog =>
          <Blog loggedinUser={user} key={blog.id} blog={blog} setUpdatedBlog={setUpdatedBlog}/>
        )
      }
    </div>
  )

  const logoutForm = () => (
    <button onClick={() => handleLougout()}>LOGOUT</button>
  )
  const showNotif = (msg) => {
    if (errorMessage === null) {
      setPositiveMessage(msg)
      setTimeout(() => {
        setPositiveMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blog system</h1>
      <ErrorNotification message={errorMessage} />
      <PositiveNotification message={positiveMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <Toggle buttonLabel='Create blog'>
            <BlogForm showNotif={showNotif} setErrorMessage={setErrorMessage} setNewBlog={setNewBlog} />
          </Toggle>
          {logoutForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App