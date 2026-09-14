// Paths lifted from the original Webflow build: each glyph is drawn inside the 48px
// action circle, so the full viewBox keeps its size and offset without extra math.
import type { ReactNode } from "react";

interface UtilityIconProps {
  className?: string;
}

function UtilityIcon({ className, children }: UtilityIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function BookmarkIcon({ className }: UtilityIconProps) {
  return (
    <UtilityIcon className={className}>
      <path d="M30.3085 16.8966V31.9865L24.4249 26.4932C24.361 26.4081 24.2607 26.3579 24.1543 26.3579C24.0478 26.3579 23.9475 26.4081 23.8836 26.4932L18 32V16.8966C18.0045 16.6578 18.1023 16.4303 18.2723 16.2627C18.4424 16.0952 18.6714 16.0009 18.9102 16H29.3986C29.6374 16.0009 29.8664 16.0952 30.0365 16.2627C30.2066 16.4303 30.304 16.6578 30.3085 16.8966Z" />
    </UtilityIcon>
  );
}

export function CopyIcon({ className }: UtilityIconProps) {
  return (
    <UtilityIcon className={className}>
      <path d="M20.1997 16.9112V28.1105C20.1997 28.5532 20.5571 28.9105 20.9996 28.9105H30.599C31.0417 28.9105 31.3989 28.5531 31.3989 28.1105V16.9112C31.3989 16.4686 31.0416 16.1113 30.599 16.1113H20.9996C20.5571 16.1113 20.1997 16.4687 20.1997 16.9112Z" />
      <path d="M17.7999 32.1115H28.1992V30.5117H18.5998V20.1123H17V31.3116C16.9999 31.7541 17.3572 32.1115 17.7998 32.1115L17.7999 32.1115Z" />
    </UtilityIcon>
  );
}

export function ShareIcon({ className }: UtilityIconProps) {
  return (
    <UtilityIcon className={className}>
      <path d="M27.086 19.8279C28.6754 19.8279 29.9999 18.5299 29.9999 16.914C29.9999 15.2981 28.7019 14 27.086 14C25.4701 14 24.172 15.298 24.172 16.914C24.172 17.4703 24.3309 17.9734 24.5959 18.424L18.9271 22.106C18.3974 21.6027 17.6821 21.2849 16.914 21.2849C15.3245 21.2849 14 22.5829 14 24.1988C14 25.8148 15.298 27.1128 16.914 27.1128C17.7087 27.1128 18.3973 26.795 18.9271 26.2917L24.4635 29.841C24.2779 30.2119 24.1721 30.6358 24.1721 31.086C24.1721 32.6755 25.4701 34 27.086 34C28.7019 34 30 32.702 30 31.086C30 29.4702 28.7019 28.1721 27.086 28.1721C26.3179 28.1721 25.629 28.4635 25.0993 28.9668L19.5365 25.3908C19.722 25.02 19.8014 24.5961 19.8014 24.1722C19.8014 23.7483 19.6956 23.3244 19.5365 22.9536L25.3377 19.2451C25.8146 19.616 26.4238 19.8279 27.0861 19.8279H27.086Z" />
    </UtilityIcon>
  );
}
