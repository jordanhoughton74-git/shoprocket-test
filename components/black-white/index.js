// components/AnimatedImage.js
'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AnimatedImage = () => {
  const ref = useRef(null);
  const [filterStyle, setFilterStyle] = useState("grayscale(100%)");

  // Hook into the scroll position
  const { scrollYProgress } = useScroll({
    target: ref, // Track the ref's scroll position
    offset: ["0 1", "1 0"], // Adjust this if necessary for different effect
  });

  // Map scrollYProgress (0 - 1) to grayscale percentage (100% -> 0%)
  // Full color when scrollYProgress is 0.5 or above, grayscale when less
  const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ["100%", "0%", "0%", "100%"]);

  // Update the grayscale filter as the user scrolls
  useEffect(() => {
    return grayscale.onChange((latest) => {
      setFilterStyle(`grayscale(${latest})`);
    });
  }, [grayscale]);

  return (
    <motion.div ref={ref}>
      <motion.img
        src="/scroll.png"
        alt="Your Image"
        style={{
          width: "400px",
          height: "1000px",
          filter: filterStyle, // Apply the dynamically updated grayscale filter
        }}
      />
    </motion.div>
  );
};

export default AnimatedImage;
