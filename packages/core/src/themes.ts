export const themes = {
  default: {
    '--w3o-background-color': 'initial',
    '--w3o-text-color': 'initial',
    '--w3o-border-color': 'initial',
    '--w3o-accent-background-color': 'initial',
    '--w3o-accent-text-color': 'initial',
    '--w3o-secondary-text-color': 'initial',
    '--w3o-border-radius': 'initial',
  },
  light: {
    '--w3o-background-color': '#ffffff',
    '--w3o-text-color': '#1a1d26',
    '--w3o-border-color': '#d0d4f7',
    '--w3o-accent-background-color': '#EFF1FC',
    '--w3o-accent-text-color': '#929bed',
    '--w3o-secondary-text-color': '#707481',
    '--w3o-border-radius': '24px',
  },
  dark: {
    '--w3o-background-color': '#1A1D26',
    '--w3o-text-color': '#EFF1FC',
    '--w3o-border-color': '#33394B',
    '--w3o-accent-background-color': '#242835',
    '--w3o-accent-text-color': '#929bed',
    '--w3o-secondary-text-color': '#999CA5',
    '--w3o-border-radius': '24px',
  }
}

export const themeMapping = `/* THEME MAPPING */
--onboard-font-family-normal: var(--w3o-font-family, initial);
--onboard-connect-sidebar-border-color: var(--w3o-border-color, initial);
--onboard-connect-sidebar-background: var(--w3o-accent-background-color, initial);
--onboard-connect-sidebar-color: var(--w3o-text-color, initial);
--onboard-connect-sidebar-progress-background: var(--w3o-text-color, initial);
--onboard-connect-sidebar-progress-color: var(--w3o-accent-text-color, initial);
--onboard-connect-header-background: var(--w3o-background-color, initial);
--onboard-connect-header-color: var(--w3o-text-color, initial);
--onboard-connect-text-color: var(--w3o-text-color, initial);
--onboard-connect-accent-text-color: var(--w3o-secondary-text-color, initial);
--onboard-main-scroll-container-background: var(--w3o-background-color, initial);
--onboard-link-color: var(--w3o-accent-text-color, initial);
--onboard-wallet-button-background: var(--w3o-background-color, initial);
--onboard-wallet-button-background-hover: var(--w3o-accent-background-color, initial);
--onboard-wallet-button-border-color: var(--w3o-border-color, initial);
--onboard-wallet-app-icon-border-color: var(--w3o-border-color, initial);
--onboard-close-button-background: var(--w3o-accent-background-color, initial);
--onboard-wallet-button-color-hover: var(--w3o-text-color, initial);
--onboard-wallet-button-color: var(--w3o-text-color, initial);
--onboard-wallet-button-border-radius: var(--w3o-border-radius, initial);
--onboard-modal-border-radius: var(--w3o-border-radius, initial);


/* ACCOUNT CENTER THEMING */
--account-center-minimized-background: var(--w3o-background-color, initial);
--account-center-minimized-address-color: var(--w3o-text-color, initial);
--account-center-minimized-balance-color: var(--w3o-secondary-text-color, initial);

--account-center-maximized-info-section-background: var(
  --w3o-background-color, initial
);
--account-center-maximized-network-section-background: var(
  --w3o-accent-background-color, initial
);
--account-center-maximized-upper-background: var(
  --w3o-secondary-accent-background, initial
);
--account-center-maximized-address-color: var(--w3o-background-color, initial);
--account-center-maximized-account-section-background-hover: var(
  --w3o-text-color, initial);
--account-center-maximized-balance-color: var(--w3o-border-color, initial);
--account-center-maximized-upper-action-color: var(--w3o-accent-text-color, initial);
--account-center-maximized-network-text-color: var(
  --w3o-secondary-accent-background, initial);
--account-center-maximized-info-section-background-color: var(
  --w3o-background-color, initial);
--account-center-maximized-app-name-color: var(
  --w3o-secondary-accent-background, initial);
--account-center-maximized-app-info-color: var(
  --w3o-secondary-accent-background, initial);
--account-center-app-btn-background: var(--w3o-secondary-accent-background, initial);
--account-center-app-btn-text-color: var(--w3o-background-color, initial);

/* NOTIFY THEMING */
--notify-onboard-background: var(--w3o-accent-background-color, initial);
--notify-onboard-transaction-status: var(--w3o-text-color, initial);
--notify-onboard-address-hash-color: var(--w3o-secondary-text-color, initial);
--notify-onboard-anchor-color: var(--w3o-accent-text-color, initial);
--notify-onboard-timer-color: var(--w3o-secondary-text-color, initial);
--notify-onboard-dropdown-background: var(--w3o-background-color, initial);
--notify-onboard-dropdown-text-color: var(--w3o-accent-text-color, initial);
--notify-onboard-dropdown-btn-hover-background: var(--w3o-accent-background-color, initial);
--notify-onboard-close-icon-hover: var(--w3o-text-color, initial);

/* TRANSACTION PREVIEW THEMING */
--w3o-tp-accent-background: var(--w3o-accent-background-color, initial);
--w3o-tp-background: var(--w3o-background-color, initial);
--w3o-tp-border-radius: var(--w3o-border-radius, initial);
--w3o-tp-close-icon-hover: var(--w3o-text-color, initial);
--w3o-tp-text-color: var(--w3o-text-color, initial);
--w3o-tp-secondary-secondary-text-color: var(--w3o-text-color, initial);
--w3o-tp-border-color: var(--w3o-border-color, initial);

`