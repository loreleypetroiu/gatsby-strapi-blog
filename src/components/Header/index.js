import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

const Masthead = styled.header`
  padding: 2rem;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 1.6rem;
    margin-bottom: 0;
  }
`
const Header = ({ siteTitle }) => (
  <Masthead>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </Masthead>
)


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
