import React from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { motion } from "framer-motion";

function Navigator({ pageCounter, setPageCounter }) {
  return (
    <>
      <motion.div className="page-counter" layout={true}>
        <AiFillLeftCircle
          onClick={() => {
              if (pageCounter > 1) {
                setPageCounter(pageCounter - 1);
              }
          }}
          size="1.75rem"
          style={{ color: "#EBD671" }}
        />
        <span className="pager"> {pageCounter} </span>
        <AiFillRightCircle
          onClick={() => setPageCounter(pageCounter + 1)}
          size="1.75rem"
          style={{ color: "#EBD671" }}
        />
      </motion.div>
    </>
  );
}

export default Navigator;
