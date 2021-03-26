import * as React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleList from '../components/ArticleList';
import Pager from '../components/Pager';

const ListArticles = ({ data, pageContext }) => {

  return (
    <Layout>
      <SEO title="Blog" />
      <h2>Articles</h2>
      <ArticleList articles={data.allStrapiArticle.edges} />
      {pageContext.numPages > 1 && <Pager pageContext={pageContext} />}
    </Layout>
  )

};

export default ListArticles

export const query = graphql`
query($skip: Int, $limit: Int) {
  allStrapiArticle(skip: $skip, limit: $limit, filter: { status: { eq: "published" } }) {
    edges {
      node {
        strapiId
        slug
        title
        publishedAt
        categories {
          name
          slug
        }
        image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        author {
          name
          id
          picture {
            childImageSharp {
              fixed(width: 30, height: 30) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
}
`;