type InputFieldProps = {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ name, value, onChange }: InputFieldProps) {
  return (
    <div className={`w-32 text-center`}>
      <h3 className="h5 mb-1">{name}</h3>
      {/* <style>
        {`
          // For WebKit browsers
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          // For Firefox
          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}
      </style> */}
      <input
        className={`max-w-24 border-2 border-primary rounded-lg text-lg text-center focus-visible:outline-none caret-primary`}
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
