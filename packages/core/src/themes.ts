export const themes = {
  default: {
    '--w3o-background-color': 'unset',
    '--w3o-text-color': 'unset',
    '--w3o-border-color': 'unset',
    '--w3o-accent-background-color': 'unset',
    '--w3o-accent-text-color': 'unset',
    '--w3o-secondary-text-color': 'unset',
    '--w3o-border-radius': 'unset',
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
--onboard-font-family-normal: var(--w3o-font-family, unset);
--onboard-connect-sidebar-border-color: var(--w3o-border-color, unset);
--onboard-connect-sidebar-background: var(--w3o-accent-background-color, unset);
--onboard-connect-sidebar-color: var(--w3o-text-color, unset);
--onboard-connect-sidebar-progress-background: var(--w3o-text-color, unset);
--onboard-connect-sidebar-progress-color: var(--w3o-accent-text-color, unset);
--onboard-connect-header-background: var(--w3o-background-color, unset);
--onboard-connect-header-color: var(--w3o-text-color, unset);
--onboard-connect-text-color: var(--w3o-text-color, unset);
--onboard-connect-accent-text-color: var(--w3o-secondary-text-color, unset);
--onboard-main-scroll-container-background: var(--w3o-background-color, unset);
--onboard-link-color: var(--w3o-accent-text-color, unset);
--onboard-wallet-button-background: var(--w3o-background-color, unset);
--onboard-wallet-button-background-hover: var(--w3o-accent-background-color, unset);
--onboard-wallet-button-border-color: var(--w3o-border-color, unset);
--onboard-wallet-app-icon-border-color: var(--w3o-border-color, unset);
--onboard-close-button-background: var(--w3o-accent-background-color, unset);
--onboard-wallet-button-color-hover: var(--w3o-text-color, unset);
--onboard-wallet-button-color: var(--w3o-text-color, unset);
--onboard-wallet-button-border-radius: var(--w3o-border-radius, unset);
--onboard-modal-border-radius: var(--w3o-border-radius, unset);


/* ACCOUNT CENTER THEMING */
--account-center-minimized-background: var(--w3o-background-color, unset);
--account-center-minimized-address-color: var(--w3o-text-color, unset);
--account-center-minimized-balance-color: var(--w3o-secondary-text-color, unset);

--account-center-maximized-info-section-background: var(
  --w3o-background-color, unset
);
--account-center-maximized-network-section-background: var(
  --w3o-accent-background-color, unset
);
--account-center-maximized-upper-background: var(
  --w3o-secondary-accent-background, unset
);
--account-center-maximized-address-color: unset;
--account-center-maximized-account-section-background-hover: unset;
--account-center-maximized-balance-color: unset;
--account-center-maximized-upper-action-color: var(--w3o-accent-text-color, unset);
--account-center-maximized-network-text-color: var(
  --w3o-secondary-accent-background, unset);
--account-center-maximized-info-section-background-color: var(
  --w3o-background-color, unset);
--account-center-maximized-app-name-color: var(
  --w3o-secondary-accent-background, unset);
--account-center-maximized-app-info-color: var(
  --w3o-secondary-accent-background, unset);
--account-center-app-btn-background: var(--w3o-secondary-accent-background, unset);
--account-center-app-btn-text-color: var(--w3o-background-color, unset);

/* NOTIFY THEMING */
--notify-onboard-background: var(--w3o-accent-background-color, unset);
--notify-onboard-transaction-status: var(--w3o-text-color, unset);
--notify-onboard-address-hash-color: var(--w3o-secondary-text-color, unset);
--notify-onboard-anchor-color: var(--w3o-accent-text-color, unset);
--notify-onboard-timer-color: var(--w3o-secondary-text-color, unset);
--notify-onboard-dropdown-background: var(--w3o-background-color, unset);
--notify-onboard-dropdown-text-color: var(--w3o-accent-text-color, unset);
--notify-onboard-dropdown-btn-hover-background: var(--w3o-accent-background-color, unset);
--notify-onboard-close-icon-hover: var(--w3o-text-color, unset);

/* TRANSACTION PREVIEW THEMING */
--w3o-tp-accent-background: var(--w3o-accent-background-color, unset);
--w3o-tp-background: var(--w3o-background-color, unset);
--w3o-tp-border-radius: var(--w3o-border-radius, unset);
--w3o-tp-close-icon-hover: var(--w3o-text-color, unset);
--w3o-tp-text-color: var(--w3o-text-color, unset);
--w3o-tp-secondary-secondary-text-color: var(--w3o-text-color, unset);
--w3o-tp-border-color: var(--w3o-border-color, unset);

`
