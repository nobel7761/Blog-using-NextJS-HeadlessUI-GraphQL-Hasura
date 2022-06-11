import Loading from "../components/Loading/Loading";
import { useQuery } from "react-query";
import axios from "axios";

const useSubCategories = () => {
  const endpoint = "https://outgoing-yeti-60.hasura.app/v1/graphql";
  const headers = {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "jATXg2oxueJpZ23gw3QNIDscVC97dwPnldO0H6sp19dy4Jp7uZDWoife1vhQXj89",
  };
  const graphqlQuery = {
    operationName: "subCategories",
    query: `query subCategories{
        sub_categories{
          name
          id
        }
      }
        `,
    variables: {},
  };

  const { data: queryInfo, isLoading } = useQuery("subCategories", () =>
    axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    }).then((res) => res.data.data.sub_categories)
  );

  return [queryInfo, isLoading];
};

export default useSubCategories;
