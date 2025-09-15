import { BrowserRouter } from "react-router"
import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
