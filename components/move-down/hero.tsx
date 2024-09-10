"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative mb-[8rem] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40"
    >
      <motion.div
        style={{ position, scale, x: "-50%" }}
        className="fixed left-1/2 z-10 flex flex-col items-center"
      >
        <h1 className="font-heading mb-12 text-center text-5xl leading-[1.2]">
          Jake Bryant
          <br />
          Creative.
        </h1>
        <p>
          Nunc et risus porttitor, semper orci vel, rhoncus ex. In tristique
          elit a eleifend commodo. Morbi luctus nunc nibh, at dictum urna porta
          vitae. Nunc tristique nibh quis mauris iaculis, quis tristique ligula
          auctor. Vivamus libero nunc, bibendum nec venenatis vel, imperdiet vel
          lacus. Integer eu eleifend nibh. Suspendisse potenti. Phasellus
          ultricies fermentum mattis.
        </p>
      </motion.div>
    </motion.section>
  );
};
export default Hero;
