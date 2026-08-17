function SectionHead({ eyebrow, title, text, align = 'left', id }) {
  return (
    <header className={`section-head${align === 'center' ? ' section-head--center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  )
}

export default SectionHead
