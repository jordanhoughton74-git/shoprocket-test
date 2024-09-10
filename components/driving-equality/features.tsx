'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CodeBracketIcon } from "@heroicons/react/16/solid"; 

const content = [
  {
    icon: CodeBracketIcon,
    title: "Forms",
    text: "Forms to capture end user data, as well custom workflows to get as much information that is needed.",
  },
  {
    icon: CodeBracketIcon,
    title: "Performance",
    text: "100 Lighthouse scores an improvement of 50% load speeds.",
  },
  {
    icon: CodeBracketIcon,
    title: "Cost Reduction",
    text: "Reduced monthly overheads",
  },
];

export const MoreFeatures = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const y = useTransform(scrollYProgress, [0.5, 1], ["0vh", "65vh"]);

  return (
    <motion.section
      ref={targetRef}
      style={{ opacity, y }}
      className="mx-auto grid w-full max-w-[1132px] grid-cols-3 gap-40 pt-[0vh] pb-[200px] text-left px-[30px]"
    >
      {content.map(({ icon: Icon, title, text }) => (
        <div key={title} className="mx-auto">
          <span className="padding-8 mb-4 flex h-[100px] w-[100px] items-center justify-center rounded-[1.8rem] bg-[#151515]">
            <Icon className="h-10 w-10 text-white" />
          </span>
          <h3 className="mb-2 text-2xl text-white mx-auto">{title}</h3>
          <p className="text-md mx-auto text-white/80">{text}</p>
        </div>
      ))}
    </motion.section>
  );
};
export default MoreFeatures