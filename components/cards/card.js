'use client'
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Fragment, useRef, useState, useEffect } from "react";

export default function Card({ title, author, imgSrc }) {
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const card = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered. Card opened state: ", isCardOpened);

    if (isCardOpened) {
      console.log("Disabling body scroll");
      document.body.style.overflow = "hidden";  // Disable scroll
    } else {
      console.log("Restoring body scroll");
      document.body.style.overflow = "";  // Restore scroll
    }

    // Cleanup function when modal closes
    return () => {
      console.log("Cleaning up, restoring body scroll");
      document.body.style.overflow = ""; // Reset when unmounting or closing
    };
  }, [isCardOpened]);  // Effect depends on isCardOpened

  return (
    <Fragment>
      <CardLink
        ref={card}
        isCardOpened={isCardOpened}
        layout
        onClick={() => {
          setIsCardOpened(true);
          if (!isCardOpened) {
            setCardDimensions({
              width: card.current.clientWidth,
              height: card.current.clientHeight
            });
          }
        }}
      >
        <CardImage layout="scale" src={imgSrc} />
        <CardHeader isCardOpened={isCardOpened} layout="position">
          {title}
        </CardHeader>
        <CardSubtitle isCardOpened={isCardOpened} layout="position">
          {author}
        </CardSubtitle>

        {isCardOpened && (
          <CardDescription initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CardDescription>
        )}
      </CardLink>
      {isCardOpened && (
        <Fragment>
          <div
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height
            }}
          ></div>
          <CardBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsCardOpened(false)}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

const CardLink = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: black;
  ${(props) =>
    props.isCardOpened &&
    css`
      width: min(80rem, 95%);
      height: calc(100% - 10rem);
      overflow-y: auto;
      overflow-x: hidden;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 10;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    `}
`;

const CardHeader = styled(motion.h2)`
  margin: 0.5rem 0;
  font-size: 3em;
  font-weight: 700;
  color: ${(props) => (props.isCardOpened ? "#ffffff" : props.theme.primary)};
`;

const CardSubtitle = styled(motion.p)`
  font-weight: 700;
  font-size: 2em;
  margin: 0 0 1rem;
  color: ${(props) => (props.isCardOpened ? "#afafaf" : props.theme.subtitle)};
`;

const CardDescription = styled(motion.p)`
  font-weight: 100;
  font-size: 1.5em;
  color: #ffffff;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: auto;
`;

const CardBackground = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.7);
`;

const AbsoluteCardContainer = styled.div`
  width: min(50rem, 90vw);
  padding: 1rem;
  position: relative;
`;
