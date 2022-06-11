export const CREATE_NEW_ARTICLE = `
mutation postArticle($title: String!, $content: String!, $sub_category_id: Int!) {
    insert_articles_one(object: {title: $title, content: $content, sub_category_id: $sub_category_id}) {
      id
      title
      content
      sub_category {
        name
      }
      title
      content
    }
  }
`;
