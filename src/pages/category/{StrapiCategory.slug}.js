import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import ArticleList from '../../components/ArticleList';

export const query = graphql`
  query GetCategory($slug: String!) {
    strapiCategory(slug: { eq: $slug }) {
        name
    }
    articles: allStrapiArticle(
        filter: { status: { eq: "published" }, categories: {elemMatch: {name: {eq: $slug}}}},
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
              slug
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

const Article = ({ data }) => {
    const category = data.strapiCategory;
    const articles = data.articles.edges;
    const seo = {
        metaTitle: category.name,
        metaDescription: `Articles for ${category.name}`
    };

    return (
        <Layout seo={seo}>
            <h1 className='text-center'>Category: {category.name}</h1>
            <ArticleList articles={articles} />
        </Layout>
    );
};

export default Article;
