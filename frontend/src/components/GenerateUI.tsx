import React from "react";
import Box from "./Box"; // Adjust import path as needed
import { GenerateUIProps } from "@/types/generateUI";

// Type for all HTML element tag names
type HTMLElementTag = keyof React.JSX.IntrinsicElements;



export default function GenerateUI({
  UIComponents,
  wrapperComponent,
  wrapperClassName,
}: GenerateUIProps) {
  // Handle the wrapper component properly
  const Wrapper = wrapperComponent ? wrapperComponent : React.Fragment;

  return (
    <Wrapper {...(wrapperComponent ? { className: wrapperClassName } : {})}>
      {UIComponents.map((item, index) => {
        const { component, className, children, key, ...restProps } = item;

        return (
          <Box
            key={key ?? index}
            as={component}
            className={className}
            {...restProps}
          >
            {children}
          </Box>
        );
      })}
    </Wrapper>
  );
}
