import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import Category from "./../components/Category/Category";

const MainComponent = () => {
  const endpoint = "https://outgoing-yeti-60.hasura.app/v1/graphql";
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "jATXg2oxueJpZ23gw3QNIDscVC97dwPnldO0H6sp19dy4Jp7uZDWoife1vhQXj89",
  };
  const graphqlQuery = {
    operationName: "categories",
    query: `query categories{
        categories{
          name
          id
        }
      }
      `,
    variables: {},
  };

  const { data: queryInfo, isLoading } = useQuery("categories", () =>
    axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    })
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  const categories = queryInfo.data.data.categories;
  return (
    <div>
      <div className="w-3/4 mx-auto flex">
        {categories.map((category) => (
          <Category
            key={category.id}
            categoryId={category.id}
            name={category.name}
          ></Category>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
