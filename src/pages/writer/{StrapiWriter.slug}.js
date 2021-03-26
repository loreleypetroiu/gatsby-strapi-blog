import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../../components/layout";
import styled from "styled-components"
import ArticleList from '../../components/ArticleList';

export const query = graphql`
  query GetWriter($slug: String!) {
    strapiWriter(slug: { eq: $slug }) {
        name
    }
    articles: allStrapiArticle(
      filter: { status: { eq: "published" }, author: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          strapiId
          title
          description
          publishedAt
          slug
          author {
            name
          }
          categories {
            name
          }
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;

const Writer = ({ data }) => {

  const writer = data.strapiWriter;
  const articles = data.articles.edges;

  const seo = {
    metaTitle: writer.name,
    metaDescription: `Articles by ${writer.name}`
  };

  return (
    <Layout seo={seo}>
      <h1 className='text-center'>{writer.name}</h1>
      <AuthorInfo>
        {
          writer.picture &&
          <Img fixed={writer.picture.childImageSharp.fixed} />
        }
      </AuthorInfo>
      <ArticleList articles={articles} />
    </Layout>
  );
};

const AuthorInfo = styled.header`
  display: flex;
  align-items:center;
  margin-bottom: 2rem;
  justify-content: center;
  img {
    border-radius: 50%;
  }
  .authorName {
    margin: 0 1rem;
  }
  .publishedAt {
    color: ${({ theme }) => theme.colors.muted};
  }
`

export default Writer;
