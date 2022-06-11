import React from "react";
import Link from "next/link";

const Category = ({ categoryId, name }) => {
  return (
    <div>
      <p className="bg-orange-500 hover:bg-black text-white text-center p-2 rounded mr-3 my-4">
        <Link href={`/${categoryId}`}>{name}</Link>
      </p>
    </div>
  );
};

export default Category;
