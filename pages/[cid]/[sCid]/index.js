import React from "react";
import { useRouter } from "next/router";
import Articles from "./../../../components/Articles/Articles";

const Index = () => {
  const router = useRouter();
  const sCid = router.query.sCid;
  return (
    <div>
      <Articles id={sCid}></Articles>
    </div>
  );
};

export default Index;
