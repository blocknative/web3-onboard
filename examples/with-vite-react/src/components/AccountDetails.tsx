import type { Account } from '../types'

const trunc = (address: string) => address.slice(0, 8) + '...' + address.slice(-8)

interface Props {
  className?: string
  account?: Account | null
}

const AccountDetails = ({ className = '', account }: Props) => {
  const { address, ens, balance } = account ?? {}
  return (
    <div
      className={`${className} px-4 h-12 rounded-lg text-sm flex flex-col self-end justify-center border border-gray-300`}
    >
      <div className="flex items-center">
        <div className="">
          {balance != null && (
            <div>
              {Object.keys(balance).map((key) => (
                <div key={key}>
                  {Number(balance[key]).toFixed(2)} {key}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`avatar mx-2 ${account ? 'online' : 'offline'}`}>
          <div className="w-9 rounded-full">
            {ens?.avatar ? (
              <img src={ens?.avatar} alt="" />
            ) : (
              <div className="bg-slate-300 w-full h-full" />
            )}
          </div>
        </div>
        <div className="">
          {ens?.name ? ens.name : address ? <span>{trunc(address)}</span> : 'Not Connected'}
        </div>
      </div>
    </div>
  )
}

export default AccountDetails
