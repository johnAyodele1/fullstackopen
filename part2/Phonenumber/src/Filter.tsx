import type { ChangeEvent } from "react";

type FilterProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Filter = ({ value, onChange }: FilterProps) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

export default Filter;
