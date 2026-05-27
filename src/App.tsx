import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-center" />
      </BrowserRouter>
    </div>
  )
}

export default App
