import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  activeClassName: string;
  defaultClassName: string;
}

export function ActiveLink({ children, activeClassName, defaultClassName,  ...rest }:ActiveLinkProps) {

  const { asPath } = useRouter();

  const className = asPath === rest.href
   ? `${activeClassName} ${defaultClassName}`
   : defaultClassName;

  return(
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}