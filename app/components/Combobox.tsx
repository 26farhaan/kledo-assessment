import React from 'react';

type ComboboxProps = {
  label?: string;
  name: string;
  onChange?: (value: string) => void;
  datas?: {
    name: string;
    id: number;
  }[];
  value?: number | null;
  disabled?: boolean;
};
export default function Combobox({
  label,
  name,
  onChange,
  datas,
  value,
  disabled,
}: ComboboxProps) {
  return (
    <form name={name}>
      <label
        htmlFor='countries'
        className='block mb-2.5 text-sm font-medium text-heading text-gray-500'
      >
        {label || 'Select an option'}
      </label>
      <select
        id='countries'
        name={name}
        value={value || undefined}
        onChange={(e) => onChange && onChange(e.target.value)}
        className='block w-full px-3 py-2.5 border border-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400'
        disabled={disabled}
      >
        <option selected>Choose a {name}</option>
        {datas?.map((data) => (
          <option key={data.id} value={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </form>
  );
}
