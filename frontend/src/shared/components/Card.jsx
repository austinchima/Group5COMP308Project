function Card({ title, children }) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
        {title && <h3 className="mb-3 text-lg font-semibold text-slate-800">{title}</h3>}
        {children}
      </div>
    )
  }
  
  export default Card