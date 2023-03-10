const InputField = ({ htmlFor, label, type, value, onChange }) => (
  <div>
    <label htmlFor={htmlFor}>{label}</label>
    <input type={type} id={htmlFor} value={value} onChange={onChange} />
  </div>
);

export default InputField;
