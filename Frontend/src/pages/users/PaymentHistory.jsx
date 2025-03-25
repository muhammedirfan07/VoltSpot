import React from 'react'

const PaymentHistory = () => {

  const paymentHistory = [
    { id: '12345', date: '2025-02-28', amount: 2222, gmail: 'gmail', status: 'Completed' },
  ];

  // Sample booking history data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  return (
    <>
      <div className="bg-gradient-to-t from-gray-800 to-slate-950  drop-shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-500">
          <h2 className="text-xl text-amber-50 font-semibold">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Gmail
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-500">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-500">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {formatDate(payment.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-medium">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {payment.gmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paymentHistory.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No payment history available.
          </div>
        )}
      </div>
    </>
  )
}

export default PaymentHistory