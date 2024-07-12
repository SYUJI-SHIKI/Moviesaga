import React from "react";
import CustomRadioButton from "./CustomRadioButton";
import styles from './RadioGroup.module.css';
import { IoOptions } from "react-icons/io5";

interface Option {
  optionValue: string;
  label: string;
}

interface RadioGroupProps {
  title?: string;
  name: string;
  options: Option[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ title, name, options, selectedValue, onChange }) => {
  return(
    <div className={`${styles["select-card"]} p-5 rounded-lg shadow-md m-2 flex-1 flex flex-col`}>
      <label className="block text-2xl font-semibold mb-5">{title}</label>
      {options.map(({ optionValue , label }) => (
        <div key={optionValue} className="flex items-center mb-4">
          <CustomRadioButton
            id={`${name}-${optionValue}`}
            checked={selectedValue === optionValue}
            name={name}
            value={optionValue}
            onChange={onChange}
          />
          <label
            className="custom-radio-label ml-2 cursor-pointer"
            htmlFor={`${name}-${optionValue}`}>
              {label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup;