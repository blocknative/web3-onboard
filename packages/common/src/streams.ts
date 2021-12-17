import AccountSelect from './views/AccountSelect.svelte'
import type { SelectAccountOptions, Account } from './types'
import { firstValueFrom, Subject, take } from 'rxjs'

export const accounts$ = new Subject<Account[]>()

export const hideAccountSelect = ():void  => {
  accounts$.pipe(take(1)).subscribe(() => {
    displayModal$.next(false)
  })
}

export const displayModal$ = new Subject<boolean>()

