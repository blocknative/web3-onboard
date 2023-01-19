export const themes = {
  default: {
    '--w3o-background-color': 'unset',
    '--w3o-foreground-color': 'unset',
    '--w3o-text-color': 'unset',
    '--w3o-border-color': 'unset',
    '--w3o-action-color': 'unset',
    '--w3o-border-radius': 'unset',
  },
  light: {
    '--w3o-background-color': '#ffffff',
    '--w3o-foreground-color': '#EFF1FC',
    '--w3o-text-color': '#1a1d26',
    '--w3o-border-color': '#d0d4f7',
    '--w3o-action-color': '#6370E5',
    '--w3o-border-radius': '16px',
  },
  dark: {
    '--w3o-background-color': '#1A1D26',
    '--w3o-foreground-color': '#242835',
    '--w3o-text-color': '#EFF1FC',
    '--w3o-border-color': '#33394B',
    '--w3o-action-color': '#929bed',
    '--w3o-border-radius': '16px',
  }
}

export const themeMapping = `/* THEME MAPPING */
--onboard-font-family-normal: var(--w3o-font-family, unset);

--onboard-connect-header-background: unset;
--onboard-connect-header-color: unset;
--onboard-connect-text-color: unset;
--onboard-connect-accent-text-color: unset;
--onboard-main-scroll-container-background: unset;
--onboard-link-color: unset;
--onboard-wallet-button-background: unset;
--onboard-wallet-button-background-hover: unset;
--onboard-wallet-button-border-color: unset;
--onboard-wallet-app-icon-border-color: unset;
--onboard-close-button-background: unset;
--onboard-wallet-button-color-hover: unset;
--onboard-wallet-button-color: unset;
--onboard-wallet-button-border-radius: unset;
--onboard-modal-border-radius: unset;

/* ACCOUNT CENTER THEMING */
--account-center-minimized-background: unset;
--account-center-minimized-address-color: unset;
--account-center-minimized-balance-color: unset;
--account-center-maximized-info-section-background: unset;
--account-center-maximized-network-section-background: unset;
--account-center-maximized-upper-background: unset;
--account-center-maximized-address-color: unset;
--account-center-maximized-account-section-background-hover: unset;
--account-center-maximized-balance-color: unset;
--account-center-maximized-upper-action-color: unset;
--account-center-maximized-network-text-color: unset;
--account-center-maximized-info-section-background-color: unset;
--account-center-maximized-app-name-color: unset;
--account-center-maximized-app-info-color: unset;
--account-center-app-btn-background: unset;
--account-center-app-btn-text-color: unset;

/* NOTIFY THEMING */

--notify-onboard-transaction-status: unset;
--notify-onboard-address-hash-color: unset;
--notify-onboard-anchor-color: unset;
--notify-onboard-timer-color: unset;
--notify-onboard-dropdown-background: unset;
--notify-onboard-dropdown-text-color: unset;
--notify-onboard-dropdown-btn-hover-background: unset;
--notify-onboard-close-icon-hover: unset;

/* TRANSACTION PREVIEW THEMING */
--w3o-tp-accent-background: unset;
--w3o-tp-background: unset;
--w3o-tp-border-radius: unset;
--w3o-tp-close-icon-hover: unset;
--w3o-tp-text-color: unset;
--w3o-tp-secondary-secondary-text-color: unset;
--w3o-tp-border-color: unset;

`
