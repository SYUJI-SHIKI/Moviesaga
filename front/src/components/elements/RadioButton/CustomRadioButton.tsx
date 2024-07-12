import React from "react";
import { IoIosRadioButtonOff } from "react-icons/io";
import { GiFilmSpool } from "react-icons/gi";
import styles from "./CustomRadioButton.module.css";

interface CustomRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ id, name, value, checked, onChange }) => {
  return (
    <label className={styles.customRadioButton}>
      <input
        id={id}
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
      />
      {checked ? <GiFilmSpool className={styles.icon} /> : <IoIosRadioButtonOff className={styles.icon} />  }
    </label>
  );
};

export default CustomRadioButton;