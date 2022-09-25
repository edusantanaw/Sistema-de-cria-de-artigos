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
import CategoryaArticle from './pages/CategoryArticle'
import Article from './pages/Article'
import Articles from './pages/Articles'
import MyArticles from './pages/MyArticles'
import CreateArticle from './pages/CreateArticle'


function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path='/' element={ <Home />} />
        <Route path = '/category/:name'  element ={<CategoryaArticle/>}/>
        <Route path = '/category/article/:id' element = {<Article/>}/>
        <Route path='/login' element={ <Login />} />
        <Route path = '/createAccount' element = {<CreateAccount/>}  />
        <Route path = '/articles' element ={<Articles />} />
        <Route path = 'myarticles/:id' element = {<RequireAuth><MyArticles /></RequireAuth>} />
        <Route path = 'craeteArticle' element = {<RequireAuth><CreateArticle/></RequireAuth>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
