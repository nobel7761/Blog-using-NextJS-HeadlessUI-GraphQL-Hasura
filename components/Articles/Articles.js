import React from "react";
import Loading from "./../Loading/Loading";

import { useQuery } from "react-query";
import axios from "axios";
import Article from "./Article";

const Articles = ({ id }) => {
  const endpoint = "https://outgoing-yeti-60.hasura.app/v1/graphql";
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "jATXg2oxueJpZ23gw3QNIDscVC97dwPnldO0H6sp19dy4Jp7uZDWoife1vhQXj89",
  };
  const graphqlQuery = {
    query: `query articles($id: Int!) {
        articles(where: {sub_category_id: {_eq: $id}}) {
          id
          title
          content
        }
      }
      `,
    variables: { id },
  };

  const { data: queryInfo, isLoading } = useQuery(
    "articles",
    () =>
      axios.post(endpoint, graphqlQuery, {
        headers: headers,
      }),
    { enabled: !!id }
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const allArticles = queryInfo.data.data.articles;
  console.log("articles", allArticles);

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="w-3/4 mx-auto grid grid-cols-3 gap-10 mt-10 ">
      {allArticles.map((article) => (
        <Article key={article.id} article={article}></Article>
      ))}
    </div>
  );
};

export default Articles;
