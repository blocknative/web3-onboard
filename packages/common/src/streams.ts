import type { Account } from './types'
import { Subject, take } from 'rxjs'

export const accounts$ = new Subject<Account[]>()

export const hideAccountSelect = (): void => {
  accounts$.pipe(take(1)).subscribe(() => {
    displayModal$.next(false)
  })
}

export const displayModal$ = new Subject<boolean>()
