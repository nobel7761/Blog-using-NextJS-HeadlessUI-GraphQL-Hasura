import React from "react";

const Article = (props) => {
  const { id, title, content } = props.article;
  //console.log(id, title, content);
  return (
    <div className="px-4 py-2 rounded shadow-xl">
      <h1>
        <strong>Title:</strong> {title}
      </h1>
      <p>
        <strong>Content:</strong> {content}
      </p>
    </div>
  );
};

export default Article;
