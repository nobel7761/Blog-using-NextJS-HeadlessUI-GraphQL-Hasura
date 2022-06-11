import React from "react";
import Link from "next/link";

const SubCategory = ({ catId, subId, name }) => {
  // console.log("props", name);
  return (
    <div>
      <div className="bg-orange-500 hover:bg-black text-white text-center p-2 rounded mr-3 my-4">
        <Link href={`${catId}/${subId}`}>{name}</Link>
      </div>
    </div>
  );
};

export default SubCategory;
