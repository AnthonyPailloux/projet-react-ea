





import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <Link to="/">Accueil</Link> |{" "}
      <Link to="/facts/1">Fact 1</Link> |{" "}
      <Link to="/facts/2">Fact 2</Link>
    </nav>
  )
}

export default Nav
