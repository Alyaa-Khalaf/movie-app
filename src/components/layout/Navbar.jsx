import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Heart, User, LogOut, Globe, Menu, X, Sun, Moon } from 'lucide-react'
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
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-bold text-black text-lg tracking-wide">
          Movie App
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Dark mode */}
          <button onClick={toggleDark} className="text-black" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1 text-black font-semibold text-sm"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute end-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-24 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangChange(lang)}
                    className={`block w-full text-start px-4 py-2 text-sm hover:bg-primary transition-colors uppercase font-semibold ${language === lang ? 'text-primary' : 'text-black'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/account" className="flex items-center gap-1 text-black text-sm font-semibold">
                <User size={18} />
                <span className="hidden md:inline">{user?.username}</span>
              </Link>
              <button onClick={handleLogout} className="text-black">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="text-black text-sm font-semibold hover:underline">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="text-black text-sm font-semibold hover:underline">
                {t('nav.register')}
              </Link>
            </div>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative flex items-center gap-1 text-black font-semibold text-sm">
            <Heart size={20} fill="black" />
            <span>watchlist</span>
            {wishlist.length > 0 && (
              <span className="min-w-[18px] h-[18px] bg-black text-primary text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button onClick={() => setMobileOpen((p) => !p)} className="md:hidden text-black">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary px-4 py-4 flex flex-col gap-3 text-sm font-semibold text-black border-t border-yellow-400">
          <Link to="/" onClick={() => setMobileOpen(false)}>{t('nav.home')}</Link>
          <Link to="/search" onClick={() => setMobileOpen(false)}>{t('nav.search')}</Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" onClick={() => setMobileOpen(false)}>{t('nav.account')}</Link>
              <button onClick={handleLogout} className="text-start">{t('nav.logout')}</button>
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