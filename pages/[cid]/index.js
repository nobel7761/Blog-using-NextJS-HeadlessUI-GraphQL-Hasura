import React from "react";
import { useRouter } from "next/router";
import SubCategories from "../../components/SubCategories/SubCategories";

const Index = () => {
  const router = useRouter();
  const categoryId = router.query.cid;
  return (
    <div>
      <SubCategories id={categoryId}></SubCategories>
    </div>
  );
};

export default Index;
