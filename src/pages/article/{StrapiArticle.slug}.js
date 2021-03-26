import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby"
import Img from "gatsby-image";
import Layout from "../../components/layout";
import Markdown from "react-markdown";
import styled from "styled-components"
import dayjs from "dayjs";

export const query = graphql`
  query GetArticle($slug: String!) {
    strapiArticle(slug: { eq: $slug }, status: { eq: "published" }) {
      title
      description
      content
      publishedAt
      categories {
          id
          name
          slug
      }
      image {
        publicURL
        childImageSharp {
          fluid(maxWidth:600) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      author {
        name
        slug
        picture {
          childImageSharp {
            fixed(width: 35, height: 35) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

const Article = ({ data }) => {
    const article = data.strapiArticle;
    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        shareImage: article.image,
        article: true,
    };

    return (
        <Layout seo={seo}>
            <Categories>
                {
                    article.categories.length > 0 && article.categories.map(category =>
                        <li key={`categ-${category.slug}`}><Link to={`/category/${category.slug}`}>{category.name}</Link></li>
                    )
                }
            </Categories>
            <h1 className='text-center mb-1'>{article.title}</h1>
            <AuthorInfo>
                {
                    article.author.picture &&
                    <Img fixed={article.author.picture.childImageSharp.fixed} />
                }
                <div className='authorName'><Link to={`/writer/${article.author.slug}`}>{article.author.name}</Link></div>
                <div className='publishedAt'>{dayjs(article.publishedAt).format('MMM D, YYYY')}</div>
            </AuthorInfo>

            <Img fluid={article.image.childImageSharp.fluid} />
            <ArticleContent>
                <Markdown source={article.content} escapeHtml={false} />
            </ArticleContent>
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
const ArticleContent = styled.section`
  max-width: 75rem;
  margin: 2rem auto;
  h1 {
    text-align:center;
    font-size: 2.6rem;
  }
  iframe {
    margin: 3rem auto;
    display: block;
  }
`

const Categories = styled.ul`
    text-align:center;
    margin-bottom: 1rem;
    li {
        display: inline-block;
        margin: 0 .5rem .5rem 0;
        font-size: 1.2rem;
        a {
            display: block;
            background: #f2f2f2;
            padding: 0.3rem 1rem;
            border-radius: 3px;
        }
    }
`



export default Article;
