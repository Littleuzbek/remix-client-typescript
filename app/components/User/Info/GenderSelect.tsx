import { useEffect, useState } from "react";
import "./gender.css";
import { translateText } from "~/components/Extra/Translation";

interface genderSelection {
  onChange: (gender: string) => void;
  defaultValue: string;
  name: string;
  className?: string;
}

export function GenderSelection({
  onChange,
  defaultValue = "",
  name = "gender",
  className = "",
}: genderSelection) {
  const [selectedGender, setSelectedGender] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setSelectedGender(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (defaultValue === "male") {
      setSelectedGender("male");
    }
  }, [defaultValue]);

  return (
    <div className={`gender-selection ${className}`}>
      <div className="gender-option">
        <input
          type="radio"
          id="male"
          name={name}
          value="male"
          checked={selectedGender === "male"}
          onChange={handleChange}
          className="gender-radio"
        />
        <label htmlFor="male" className="gender-label">
          <span className="radio-custom"></span>
          {translateText()?.userGenderMan}
        </label>
      </div>

      <div className="gender-option">
        <input
          type="radio"
          id="female"
          name={name}
          value="female"
          checked={selectedGender === "female"}
          onChange={handleChange}
          className="gender-radio"
        />
        <label htmlFor="female" className="gender-label">
          <span className="radio-custom"></span>
          {translateText()?.userGenderWoman}
        </label>
      </div>
    </div>
  );
}
