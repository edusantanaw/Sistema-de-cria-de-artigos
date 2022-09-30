import './App.css'
// import OutherRoutes from './routes/OtherRoutes';
// import SignRoutes from './routes/SignRoutes';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './pages/partials/Nav'
import Footer from './pages/partials/Footer'
import { RequireAuth } from './context/RequireAuth'
import CreateAccount from './pages/CreateAccount'
import CategoryaArticle from './pages/Articles/CategoryArticle'
import Article from './pages/Articles/Article'
import Articles from './pages/Articles/Articles'
import MyArticles from './pages/Articles/MyArticles'
import CreateArticle from './pages/Articles/CreateArticle'
import { AuthProvider } from './context/Auth'
import Password from './pages/Password'
import ChangeInfo from './pages/ChangeInfo'
import Admin from './pages/Admin/Admin'
import EditArticle from './pages/Articles/EditArticle'

function App() {

  let user = localStorage.getItem('@App:user')
  if(user){
    user = JSON.parse(user)
  }
  
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/category/:name' element={<CategoryaArticle />} />
          <Route path='/category/article/:id' element={<Article />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/myarticles/:id' element={<RequireAuth><MyArticles /></RequireAuth>} />
          <Route path='/craeteArticle' element={<RequireAuth><CreateArticle /></RequireAuth>} />
          <Route path = '/editPassword/:_id' element ={<RequireAuth><Password/></RequireAuth>} />
          <Route path = '/editEmail/:_id' element ={<RequireAuth><ChangeInfo/></RequireAuth>} />
          <Route path = '/admin' element={<RequireAuth>{user && user.admin && <Admin />}</RequireAuth>} />
          <Route path = '/article/edit/:_id' element = {<RequireAuth><EditArticle/></RequireAuth>} />
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  )
}

export default App;
