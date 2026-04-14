function Input({ label, type = 'text', value, onChange, placeholder, name }) {
    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
    )
  }
  
  export default Input