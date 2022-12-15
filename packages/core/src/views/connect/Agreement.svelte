<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { STORAGE_KEYS } from '../../constants.js'
  import { configuration } from '../../configuration.js'
  export let agreed: boolean

  const {
    terms: termsAgreed,
    privacy: privacyAgreed,
    version: versionAgreed
  } = JSON.parse(localStorage.getItem(STORAGE_KEYS.TERMS_AGREEMENT) || '{}')

  const blankAgreement = { termsUrl: '', privacyUrl: '', version: '' }
  const { appMetadata } = configuration

  const { termsUrl, privacyUrl, version } =
    (appMetadata && appMetadata.agreement) || blankAgreement

  const showTermsOfService = !!(
    (termsUrl && !termsAgreed) ||
    (privacyUrl && !privacyAgreed) ||
    (version && version !== versionAgreed)
  )

  agreed = !showTermsOfService

  $: if (agreed) {
    localStorage.setItem(
      STORAGE_KEYS.TERMS_AGREEMENT,
      JSON.stringify({
        version,
        terms: !!termsUrl,
        privacy: !!privacyUrl
      })
    )
  } else if (agreed === false) {
    localStorage.removeItem(STORAGE_KEYS.TERMS_AGREEMENT)
  }
</script>

<style>
  .container {
    padding: var(--onboard-spacing-4, var(--spacing-4));
    font-size: var(--onboard-font-size-6, var(--font-size-6));
    line-height: 24px;
  }

  input {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
</style>

{#if showTermsOfService}
  <div class="container flex items-center">
    <label class="flex">
      <input class="" type="checkbox" bind:checked={agreed} />
      <span>
        {$_('connect.selectingWallet.agreement.agree')}
        {' '}
        {#if termsUrl}<a href={termsUrl} target="_blank"
            >{$_('connect.selectingWallet.agreement.terms')}</a
          >{privacyUrl
            ? ' ' + $_('connect.selectingWallet.agreement.and') + ' '
            : '.'}
        {/if}
        {#if privacyUrl}<a href={privacyUrl} target="_blank"
            >{$_('connect.selectingWallet.agreement.privacy')}</a
          >.{/if}
      </span>
    </label>
  </div>
{/if}
