"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const SvgOne = ({ isOn }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={isOn ? true : false}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={clsx(
      "absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 transition duration-150 ease-in-out",
      { "opacity-0": isOn }
    )}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
    />
    <foreignObject className="sr-only">Desktop</foreignObject>
  </svg>
);

const SvgTwo = ({ isOn }) => (
  <svg
    aria-hidden={isOn ? false : true}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={clsx(
      "absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 transition duration-150 ease-in-out",
      { "opacity-100": isOn },
      { "opacity-0": !isOn }
    )}
  >
        <foreignObject className="sr-only">Mobile</foreignObject>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

function Switch({ isOn, toggle }) {
  console.log("Switch component received isOn:", isOn);

  return (
    <motion.div
      className={`switch ${isOn ? "on" : "off"}`}
      onClick={toggle}
      initial={{ backgroundColor: "#dddddd" }}
      animate={{ backgroundColor: isOn ? "#D3D3D3" : "#dddddd" }}
      transition={{ backgroundColor: { duration: 0.6 } }}
    >
      <motion.div layout transition={{ type: "spring", bounce: 0.25 }}>
        <div className="relative">
          <SvgTwo isOn={isOn} />
          <SvgOne isOn={isOn} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ToggleButton({ isOn, toggle }) {
  return <Switch isOn={isOn} toggle={toggle} />;
}
