function TextArea({ label, value, onChange, placeholder, name, rows = 4 }) {
    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
        </label>
        <textarea
          rows={rows}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
    )
  }
  
  export default TextArea