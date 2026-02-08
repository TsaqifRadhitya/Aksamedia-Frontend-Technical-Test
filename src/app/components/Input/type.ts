import type{ ComponentProps } from "react";

export interface Props extends ComponentProps<"input"> {
  error?: string;
}