import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import dayjs from 'dayjs'

const Article = ({ article }) => {
    return (
        <ArticleItem>
            <Link to={`/article/${article.slug}`}>
                {article.image && article.image.childImageSharp && (
                    <ArticleImg>
                        <ArticleImgInner>
                            <Img fluid={article.image.childImageSharp.fluid} />
                        </ArticleImgInner>
                    </ArticleImg>
                )}

                <Meta>
                    {article.author && <span>By {article.author.name}</span>}
                    <p>{dayjs(article.publishedAt).format('MMM D, YYYY')}</p>
                </Meta>
                <h3>{article.title}</h3>
            </Link>
        </ArticleItem>
    )
}

const ArticleImgInner = styled.div`
    transition: opacity .2s ease-in;
}
`
const ArticleItem = styled.article`
    a {
        color: ${({ theme }) => theme.colors.text};
    }
    &:hover {
        h3 {
            color: ${({ theme }) => theme.colors.primary};
        }
        ${ArticleImgInner} {
            opacity: 0.5
        }
    }
`
const ArticleImg = styled.div`
    margin-bottom: 1rem;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.primary};
}
`

const Meta = styled.div`
   font-size: 1.25rem;
   margin-bottom: 0rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   color: ${({ theme }) => theme.colors.muted};

`

export default Article
