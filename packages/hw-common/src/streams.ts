import type { Account } from './types'
import { Subject } from 'rxjs'

export const accounts$ = new Subject<Account[]>()
