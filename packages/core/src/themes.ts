import { fromEvent, takeUntil } from 'rxjs'
import { reset$ } from './streams'
import type { BuiltInThemes, Theme, ThemingMap } from './types'

export const themes = {
  default: {
    '--w3o-background-color': 'unset',
    '--w3o-foreground-color': 'unset',
    '--w3o-text-color': 'unset',
    '--w3o-border-color': 'unset',
    '--w3o-action-color': 'unset',
    '--w3o-border-radius': 'unset',
    '--w3o-font-family': 'inherit'
  },
  light: {
    '--w3o-background-color': '#ffffff',
    '--w3o-foreground-color': '#EFF1FC',
    '--w3o-text-color': '#1a1d26',
    '--w3o-border-color': '#d0d4f7',
    '--w3o-action-color': '#6370E5',
    '--w3o-border-radius': '16px',
    '--w3o-font-family': 'inherit'
  },
  dark: {
    '--w3o-background-color': '#1A1D26',
    '--w3o-foreground-color': '#242835',
    '--w3o-text-color': '#EFF1FC',
    '--w3o-border-color': '#33394B',
    '--w3o-action-color': '#929bed',
    '--w3o-border-radius': '16px',
    '--w3o-font-family': 'inherit'
  }
}

export const returnTheme = (theme: Theme): void | ThemingMap => {
  if (typeof theme === 'string' && theme === 'system') {
    return watchForSystemThemeChange()
  }
  return returnThemeMap(theme)
}

export const returnThemeMap = (theme: Theme): void | ThemingMap => {
  if (typeof theme === 'string' && theme in themes) {
    return themes[theme as BuiltInThemes]
  }
  if (typeof theme === 'object') {
    return theme
  }
}

export const handleThemeChange = (update: ThemingMap): void => {
  Object.keys(update).forEach(targetStyle => {
    document.documentElement.style.setProperty(
      targetStyle,
      update[targetStyle as keyof ThemingMap]
    )
  })
}

export const watchForSystemThemeChange = (): void => {
  const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)')
  systemThemeDark.matches
    ? handleThemeChange(themes['dark'])
    : handleThemeChange(themes['light'])

  fromEvent(systemThemeDark, 'change')
    .pipe(takeUntil(reset$))
    .subscribe((changes: Event) => {
      const themeChange = changes as MediaQueryListEvent
      themeChange.matches
        ? handleThemeChange(themes['dark'])
        : handleThemeChange(themes['light'])
    })
}
