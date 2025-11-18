import React from "react";
import { Link } from "react-router-dom";

export default function Pagination({ links, onPageChange }) {
  return (
    <>
      <div className="d-flex gap-2 my-4 justify-content-center">
        {links.map(
          (link, i) =>
            link.url && (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof onPageChange === "function")
                    onPageChange(link.url);
                }}
                className={
                  link.active
                    ? "py-2 px-4 btn btn-prev"
                    : "py-2 px-4 rounded-md btn"
                }
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )
        )}
      </div>
    </>
  );
}
