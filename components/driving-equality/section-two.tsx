"use client";
import { stylesWithCssVar } from "@/utils/motion";
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";

export const Collaboration = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const extendedRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: scrollYProgressIncludingOverlap } = useScroll({
    target: extendedRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(
    scrollYProgressIncludingOverlap,
    [0.1, 0.3, 0.8, 1],
    [1, 1.8, 1.8, 1]
  );
  const x = useTransform(
    scrollYProgressIncludingOverlap,
    [0.1, 0.3, 0.7, 1],
    ["0vw", "0vw", "40vw", "40vw"]
  );
  const y = useTransform(scrollYProgressIncludingOverlap, [0.25], ["0vh"]);
  const paragraph1Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.8, 0.95],
    [0, 1, 0]
  );
  const paragraph1TranslateY = useTransform(
    scrollYProgress,
    [0.6, 0.8, 0.95],
    ["4rem", "0rem", "-4rem"]
  );
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative z-10 mt-[-30vh] h-[300vh]">
      <div ref={extendedRef} className="mb-[-120vh] h-[420vh] w-full">
        <div className="sticky top-[10vh] 2xl:top-[20vh]">
        <motion.p
            style={stylesWithCssVar({
              opacity: paragraph1Opacity,
              "--y": paragraph1TranslateY,
              position,
            })}
            className="translate-y-centered-offset top-1/2 w-[300px] max-w-[250px] pl-16 text-2xl leading-tight text-white"
          >
            Bold visuals and SVG graphics create a captivating introduction. 
          </motion.p>
          <div className="flex justify-center">
            <motion.div style={{ scale, x, y }} className="origin-top">
              <motion.img
                style={{ opacity }}
                src="/images/de-img-one.png"
                className="h-auto max-h-none lg:w-[750px] 2xlw-[50vw]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Collaboration;
