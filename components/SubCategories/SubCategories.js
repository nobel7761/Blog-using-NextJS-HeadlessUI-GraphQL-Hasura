import React from "react";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import SubCategory from "./SubCategory/SubCategory";

const SubCategories = ({ id }) => {
  // console.log("id", id);
  const endpoint = "https://outgoing-yeti-60.hasura.app/v1/graphql";
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "jATXg2oxueJpZ23gw3QNIDscVC97dwPnldO0H6sp19dy4Jp7uZDWoife1vhQXj89",
  };
  const graphqlQuery = {
    query: `query subCategories($id: Int!) {
        sub_categories(where: {category_id: {_eq: $id}}) {
          id
          name
        }
      }
      
    `,
    variables: { id },
  };

  const { data: queryInfo, isLoading } = useQuery(
    "subCategoriesOfCategories",
    () =>
      axios.post(endpoint, graphqlQuery, {
        headers: headers,
      }),
    { enabled: !!id }
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const subCategories = queryInfo?.data?.data?.sub_categories;
  // console.log(subCategories);
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div>
      <div className="w-3/4 mx-auto flex">
        {subCategories?.map((sCategory) => (
          <SubCategory
            key={sCategory.id}
            catId={id}
            subId={sCategory.id}
            name={sCategory.name}
          ></SubCategory>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
