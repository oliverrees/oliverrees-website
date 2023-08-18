import dynamic from "next/dynamic";
import React from "react";

interface Props {
  componentName: string;
}

const RenderComponent = ({ componentName }: Props) => {
  const Component = dynamic(
    () => import(`../_post_components/` + componentName),
    {
      ssr: false,
    }
  );

  return <Component />;
};

export default RenderComponent;
