import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { RouterBeforeEach } from './routes/guard/RouterBeforeEach'

function App() {
  const ElementRouter = useRoutes(routes)

  return (
    <>
      <RouterBeforeEach>
        {ElementRouter}
      </RouterBeforeEach>
    </>
  )
}

export default App
