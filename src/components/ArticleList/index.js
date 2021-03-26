import * as React from "react"
import ArticleItem from '../ArticleItem';
import styled from "styled-components"

const ArticleList = ({ articles }) => {

    return (
        <ArticlesGrid>
            {
                articles.map(article =>
                    <ArticleItem key={article.node.strapiId} article={article.node} />
                )
            }
        </ArticlesGrid>
    )
}

const ArticlesGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
grid-gap: 32px;
grid-auto-flow: dense;
`

export default ArticleList
