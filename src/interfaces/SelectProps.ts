export interface SelectProps {
    options: string[];
    value: string;
    onSelect: (val: string) => void;
}
