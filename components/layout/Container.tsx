import { ReactNode } from "react";
import cn from "@/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        `max-w-screen-xl container mx-auto px-5 sm:px-10 md:px-12 lg:px-16`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
