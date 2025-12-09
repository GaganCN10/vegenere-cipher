import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <span className="lock-icon">🔐</span>
          <h1 className="title">Vigenère Cipher</h1>
        </div>
        <p className="subtitle">Classical Encryption & Decryption Tool</p>
      </div>
      <div className="header-glow"></div>
    </header>
  )
}

export default Header
