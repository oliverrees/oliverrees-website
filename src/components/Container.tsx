import { classNames } from "@/lib/classNames";

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const Container = ({ children, maxWidth }: ContainerProps) => {
  return (
    <div
      className={classNames(
        maxWidth ? maxWidth : "max-w-4xl",
        "container flex w-full px-8 md:px-12 md:py-10 dark:text-white"
      )}
    >
      {children}
    </div>
  );
};
