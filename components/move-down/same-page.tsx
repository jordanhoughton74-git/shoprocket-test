"use client";
import { stylesWithCssVar } from "@/utils/motion";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const animationOrder = {
  initial: 0,
  fadeInEnd: 0.3,
  showParagraphOne: 0.4,
  hideParagraphOne: 0.5,
  showParagraphTwoStart: 0.6,
  showParagraphTwoEnd: 0.65,
  hideParagraphTwo: 0.75,
  showLoadingScreenStart: 0.89,
  showLoadingScreenEnd: 0.9,
  endTextFadeInStart: 0.95,
  endTextFadeInEnd: 1,
};

export const SamePage = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.hideParagraphTwo,
      animationOrder.endTextFadeInStart,
    ],
    [0, 1, 0.8, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.showLoadingScreenEnd,
    ],
    [3, 1, 1]
  );
  const x = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
      animationOrder.showLoadingScreenStart,
    ],
    ["50%", "50%", "55%", "-50%", "-50%", "-55%", "0%"]
  );

  const paragraph1Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    [0, 1, 0]
  );
  const paragraph1TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const paragraph2Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    [0, 1, 0]
  );
  const paragraph2TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  return (
    <section ref={targetRef}>
      <div className="relative h-[700vh]">
        <div className="sticky top-1/2 flex origin-center -translate-y-1/2 justify-center">
          <motion.div
            className="translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[566px] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center "
            style={stylesWithCssVar({
              opacity,
              "--x": x,
              "--scale": scale,
            })}
          >
            <img
              src="/images/jb-ps.png"
              className="h-auto w-full rounded-[10px]"
            />
          </motion.div>
        </div>
        <motion.p
          style={stylesWithCssVar({
            opacity: paragraph1Opacity,
            "--y": paragraph1TranslateY,
            position,
          })}
          className="translate-y-centered-offset top-1/2 w-[500px] pl-16 text-2xl leading-tight text-white"
        >
          High-Performance Website.
          <br />
          <span className="text-primary">Perfect 100 Lighthouse Score</span>
        </motion.p>
        <motion.div
          style={stylesWithCssVar({
            opacity: paragraph2Opacity,
            position,
          })}
          className="left-1/2 -translate-x-1/2 top-0 h-full w-full max-w-[1132px] text-xl leading-tight text-white"
        >
          <motion.p
          className="translate-y-centered-offset absolute right-0 top-1/2 -translate-y-1/2 mr-16"
            style={stylesWithCssVar({
              opacity: paragraph2Opacity,
              "--y": paragraph2TranslateY
            })}
          >
            Great looking User Interface,
            <br />
            <span className="text-primary">
              Simple User Experience.
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
export default SamePage;
