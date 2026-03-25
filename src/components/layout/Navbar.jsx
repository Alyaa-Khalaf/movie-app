import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Heart, Search, Sun, Moon, User, LogOut, Globe, Menu, X } from 'lucide-react'
import { useWishlistStore, useAuthStore, useThemeStore } from '@/store'

const LANGUAGES = ['en', 'ar', 'fr', 'zh']

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const wishlist = useWishlistStore((s) => s.wishlist)
  const { isAuthenticated, user, logout } = useAuthStore()
  const { isDark, toggleDark, language, setLanguage } = useThemeStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLangChange = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    setLangOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl text-primary tracking-widest shrink-0">
          CineVault
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
          <Link to="/search" className="hover:text-primary transition-colors">{t('nav.search')}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 ms-auto">
          {/* Search icon (mobile) */}
          <button onClick={() => navigate('/search')} className="md:hidden p-2 hover:text-primary transition-colors">
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 hover:text-primary transition-colors">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Dark mode */}
          <button onClick={toggleDark} className="p-2 hover:text-primary transition-colors" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language */}
          <div className="relative">
            <button onClick={() => setLangOpen((p) => !p)} className="p-2 hover:text-primary transition-colors flex items-center gap-1 text-sm uppercase font-semibold">
              <Globe size={16} />
              {language}
            </button>
            {langOpen && (
              <div className="absolute end-0 mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden w-24">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangChange(lang)}
                    className={`block w-full text-start px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors uppercase font-semibold ${language === lang ? 'text-primary' : ''}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/account" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <User size={18} />
                <span className="hidden lg:inline">{user?.username}</span>
              </Link>
              <button onClick={handleLogout} className="p-2 hover:text-primary transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors px-3 py-1.5">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">
                {t('nav.register')}
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen((p) => !p)} className="md:hidden p-2">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link to="/" onClick={() => setMobileOpen(false)}>{t('nav.home')}</Link>
          <Link to="/search" onClick={() => setMobileOpen(false)}>{t('nav.search')}</Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" onClick={() => setMobileOpen(false)}>{t('nav.account')}</Link>
              <button onClick={handleLogout} className="text-start text-red-500">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)}>{t('nav.login')}</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>{t('nav.register')}</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}