import type { Account } from './types.js'
import { Subject } from 'rxjs'

export const accounts$ = new Subject<Account[]>()
