import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  // const serverAddress = "localhost"
  const serverAddress = "tranquil-journey-91725.herokuapp.com"
  const serverPort = ""

  useEffect(() => {
      })
  return (
      <div className='container'>
        <Link href='/'></Link>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
        <Footer className="footer"></Footer>
      </div>
  )
}

export default App
