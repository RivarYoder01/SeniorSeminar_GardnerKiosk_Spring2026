import { useState } from 'react';

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState("*");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <label className="w-full bg-[var(--color-slate)] border border-[var(--color-bur-light)] rounded-2xl px-4 py-3 flex items-center gap-2 text-left col-span-2">
      <span className="whitespace-nowrap">Sort by {props.label}:</span>
      <select
        className="flex-1 min-w-0 bg-[var(--color-slate)] text-[var(--color-gold-light)] rounded-lg px-2 py-1"
        value={selectedValue}
        onChange={handleChange}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Dropdown;