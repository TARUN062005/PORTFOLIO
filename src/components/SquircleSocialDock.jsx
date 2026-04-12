const SquircleSocialDock = ({ items, size = 'md', className = '' }) => {
  return (
    <div className={`social-login-icons social-login-icons--${size} ${className}`.trim()}>
      {items.map(({ name, href, icon: Icon, topColor, bottomColor, borderColor }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          className="social-account-btn"
          style={{
            '--social-top': topColor,
            '--social-bottom': bottomColor,
            '--social-border': borderColor,
          }}
        >
          <span className="social-account-btn__icon">
            <Icon />
          </span>
          <span className="social-account-btn__label">{name}</span>
        </a>
      ))}
    </div>
  )
}

export default SquircleSocialDock