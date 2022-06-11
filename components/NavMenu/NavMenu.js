import Link from "next/link";
import React from "react";

const NavMenu = () => {
  return (
    <div>
      <div className="w-3/4 mx-auto flex justify-between py-2">
        <Link href="/">
          <p className="cursor-pointer font-extrabold text-3xl ">BLOG SITE</p>
        </Link>
        <p className="font-medium">
          <Link href="/create">Create New Article</Link>
        </p>
      </div>
    </div>
  );
};

export default NavMenu;
