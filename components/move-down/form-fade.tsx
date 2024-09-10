"use client";
import { stylesWithCssVar } from "@/utils/motion";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const animationOrder = {
  initial: 0,
  fadeInStart: 0.2,
  fadeInEnd: 0.3,
  // showParagraphOne: 0.25,
  // hideParagraphOne: 0.3,
  // showParagraphTwoStart: 0.35,
  // showParagraphTwoEnd: 0.4,
  // hideParagraphTwo: 0.5,
  // showLoadingScreenStart: 0.53,
  // showLoadingScreenEnd: 0.58,
  showParagraphOne: 0.44,
  hideParagraphOne: 0.55,
  showParagraphTwoStart: 0.65,
  showParagraphTwoEnd: 0.75,
  hideParagraphTwo: 0.85,
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
      animationOrder.fadeInStart,
      animationOrder.fadeInEnd,
      animationOrder.hideParagraphTwo,
      animationOrder.endTextFadeInStart,
    ],
    [0, 0.5, 1, 0.8, 1]
  );
  const scale = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.showLoadingScreenEnd,
    ],
    [1, 1, 1]
  );
  const x = useTransform(scrollYProgress, [animationOrder.initial], ["0%"]);

  const imgOpacity = useTransform(
    scrollYProgress,
    [animationOrder.initial, animationOrder.hideParagraphOne, animationOrder.showParagraphTwoStart],
    [1, 0.8, 0]
  );
  const imgOpacityFade = useTransform(
    scrollYProgress,
    [animationOrder.hideParagraphOne, animationOrder.showParagraphTwoStart, animationOrder.showParagraphTwoEnd],
    [0, 0.5, 1]
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
      <div className="relative h-[600vh]">
        <div className="sticky top-1/2 flex origin-center -translate-y-1/2 justify-center">
          <motion.div
            className="translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[556px] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center "
            style={stylesWithCssVar({
              opacity,
              "--x": x,
              "--scale": scale,
            })}
          >
            <div className="relative w-full max-w-[1132px]">
              <motion.div className="absolute left-0 top-0"
              
              style={stylesWithCssVar({
                opacity: imgOpacityFade,
              })}
              >
                <img
                  src="/images/jb-fade-too.png"
                  className="h-auto w-full rounded-[10px]"
                />
              </motion.div>
              <motion.div
                style={stylesWithCssVar({
                  opacity: imgOpacity,
                })}
              >
                <img
                  src="/images/jb-form.png"
                  className="z-[1] h-auto w-full rounded-[10px]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.p
          style={stylesWithCssVar({
            opacity: paragraph1Opacity,
            "--y": paragraph1TranslateY,
            position,
          })}
          className="max-w-[250px] translate-y-centered-offset top-1/2 w-[300px] pl-16 text-2xl leading-tight text-white"
        >
          Capturing the essential 
          <br />
          <span className="text-primary">data the client requires.</span>
        </motion.p>
        <motion.div
          style={stylesWithCssVar({
            opacity: paragraph2Opacity,
            position,
          })}
          className="left-1/2 -translate-x-1/2 top-0 h-full w-full max-w-[1132px] text-xl leading-tight text-white"
        >
        <motion.p
          style={stylesWithCssVar({
            opacity: paragraph2Opacity,
            "--y": paragraph2TranslateY,
          })}
          className="max-w-[200px] translate-y-centered-offset absolute right-0 top-1/2 -translate-y-1/2 mr-10"
        >
          Delivering a Smooth, Effortless Interactive Experience.
          <br />
          <span className="text-primary">
          </span>
        </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
export default SamePage;
