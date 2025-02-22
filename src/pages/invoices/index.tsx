import * as React from 'react'
import LoginRequired from 'components/login-required'
import axios from 'utils/configured-axios'
import {isEmpty} from 'lodash'
import {format, parseISO} from 'date-fns'

const Invoices: React.FunctionComponent<any> = () => {
  const [transactions, setTransactions] = React.useState([])
  const [transactionsLoading, setTransactionsLoading] = React.useState(true)

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/transactions`)
      .then(({data}) => {
        setTransactionsLoading(false)
        setTransactions(data)
      })
  }, [])

  return (
    <LoginRequired>
      <main className="container py-5 mb-16">
        {transactionsLoading ? (
          <div></div>
        ) : (
          <div className="max-w-screen-md mx-auto">
            {isEmpty(transactions) ? (
              <h1 className="text-2xl font-bold">No Transactions</h1>
            ) : (
              <div className="flex flex-col space-y-8">
                <h1 className="text-2xl font-bold">Transactions:</h1>
                <div>
                  <ul className="space-y-6">
                    {transactions.map((transaction: any) => {
                      return (
                        <li key={transaction.stripe_transaction_id}>
                          <div className="flex space-x-4">
                            <div>
                              egghead membership: ${transaction.amount / 100}
                            </div>
                            <div>
                              {format(
                                parseISO(transaction.created_at),
                                'yyyy/MM/dd',
                              )}
                            </div>
                            <div>
                              <a
                                className="w-full px-2 py-1 font-semibold text-center text-white transition-all duration-150 ease-in-out bg-blue-600 rounded-md shadow-lg md:w-auto hover:bg-indigo-600 hover:scale-105"
                                href={`/invoices/${transaction.stripe_transaction_id}`}
                              >
                                full invoice
                              </a>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </LoginRequired>
  )
}

export default Invoices
