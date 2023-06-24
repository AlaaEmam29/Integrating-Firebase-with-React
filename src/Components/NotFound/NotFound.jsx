import React from 'react'
const style = {
    fontSize: "2.6rem",
    margin: "8rem auto",
    textAlign:"center"
}
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

export default function NotFound() {
  return (
      <div style={style}>

          <h1 >
     404 Page not found
          </h1>
      <Link to={ROUTES.LANDING}>Landing Page</Link>
      </div>
  )
}
