<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { STORAGE_KEYS } from '../../constants.js'
  import { delLocalStore, getLocalStore, setLocalStore } from '../../utils'
  import { shareReplay, startWith } from 'rxjs'
  import { state } from '../../store/index.js'

  export let agreed: boolean

  const {
    terms: termsAgreed,
    privacy: privacyAgreed,
    version: versionAgreed
  } = JSON.parse(getLocalStore(STORAGE_KEYS.TERMS_AGREEMENT) || '{}')

  const blankAgreement = { termsUrl: '', privacyUrl: '', version: '' }

  const appMetadata$ = state
    .select('appMetadata')
    .pipe(startWith(state.get().appMetadata), shareReplay(1))

  const { termsUrl, privacyUrl, version } =
    ($appMetadata$ && $appMetadata$.agreement) || blankAgreement

  const showTermsOfService = !!(
    (termsUrl && !termsAgreed) ||
    (privacyUrl && !privacyAgreed) ||
    (version && version !== versionAgreed)
  )

  agreed = !showTermsOfService

  $: if (agreed) {
    setLocalStore(
      STORAGE_KEYS.TERMS_AGREEMENT,
      JSON.stringify({
        version,
        terms: !!termsUrl,
        privacy: !!privacyUrl
      })
    )
  } else if (agreed === false) {
    delLocalStore(STORAGE_KEYS.TERMS_AGREEMENT)
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
