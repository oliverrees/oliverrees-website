"use client";
import dynamic from "next/dynamic";
import { Loading } from "./Loading";

interface Props {
  componentName: string;
}

const RenderComponent = ({ componentName }: Props) => {
  const Component = dynamic(
    () => import(`../_post_components/` + componentName),
    {
      ssr: false,
      loading: () => <Loading />,
    }
  );

  return <Component />;
};

export default RenderComponent;
