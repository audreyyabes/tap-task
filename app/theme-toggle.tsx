'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const storageKey = 'tap-task-theme'
const themeSubscribers = new Set<() => void>()

function applyTheme(theme: Theme) {
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

function emitThemeChange() {
  themeSubscribers.forEach((subscriber) => subscriber())
}

function subscribeToTheme(listener: () => void) {
  themeSubscribers.add(listener)

  return () => {
    themeSubscribers.delete(listener)
  }
}

function getThemeSnapshot(): Theme {
  if (typeof document === 'undefined') {
    return 'light'
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  const storedTheme = window.localStorage.getItem(storageKey)

  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
}

function getPreferredTheme(): Theme {
  return getStoredTheme() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => 'light'
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const preferredTheme = getPreferredTheme()

    applyTheme(preferredTheme)
    emitThemeChange()

    const handleSystemThemeChange = () => {
      if (getStoredTheme()) {
        return
      }

      const nextTheme = mediaQuery.matches ? 'dark' : 'light'

      applyTheme(nextTheme)
      emitThemeChange()
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  function toggleTheme() {
    window.localStorage.setItem(storageKey, nextTheme)
    applyTheme(nextTheme)
    emitThemeChange()
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${nextTheme} mode`}
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 grid size-11 place-items-center rounded-full border border-zinc-200/80 bg-white/85 text-zinc-800 shadow-lg shadow-zinc-950/10 backdrop-blur transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:bg-zinc-900/85 dark:text-zinc-100 dark:shadow-black/40 dark:hover:bg-zinc-800"
    >
      {theme === 'dark' ? (
        <SunIcon className="size-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}
