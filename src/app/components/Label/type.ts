export type LabelVariant = "default" | "error";

export type Props = {
    children: React.ReactNode;
    className?: string;
    variant?: LabelVariant;
};