import React from "react";
import { motion } from "framer-motion";

// Word wrapper component
const Wrapper = (props) => {
  // This component prevents wrapping of words using CSS
  return <span className="whitespace-nowrap">{props.children}</span>;
};

// Map API "type" values to JSX tag names
const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2"
};

// AnimatedCharacters component
const AnimatedCharacters = ({ type, text }) => {
  // Framer Motion variant object for controlling animation
  const item = {
    hidden: {
      y: "200%",
      color: "#00FFFFFF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
    visible: {
      y: 0,
      color: "#FFFFFF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
    }
  };

  // Split text into words and characters
  const splitWords = text.split(" ").map(word => word.split(""));

  // Add a space ("\u00A0") to the end of each word
  splitWords.forEach(word => word.push("\u00A0"));

  // Get the tag name from tagMap
  const Tag = tagMap[type] || "p"; // Default to paragraph if type is not found

  return (
    <Tag className={`text-white ${type === 'heading1' ? 'text-6xl font-bold leading-tight mb-5' : ''} ${type === 'heading2' ? 'text-4xl font-normal leading-tight opacity-75' : ''}`}>
      {splitWords.map((word, index) => (
        <Wrapper key={index}>
          {word.map((char, charIndex) => (
            <span
              style={{ overflow: "hidden", display: "inline-block" }}
              key={charIndex}
            >
              <motion.span
                style={{ display: "inline-block" }}
                variants={item}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </Tag>
  );
};

export default AnimatedCharacters;
