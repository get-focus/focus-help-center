/** Component that displays an article as a line. */
export function ArticleLine({article}) {
    return <li>{article.title} {article.description} {article.content}</li>;
}
