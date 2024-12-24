import React from 'react'

interface FormattedAmountProp {
    amount: number | undefined;
}

const FormattedAmount: React.FC<FormattedAmountProp> = ({ amount }) => {
    const formattedAmount = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
    }).format(amount!);

    const formattedWithoutSymbol = formattedAmount.replace('KES', '').trim();

    return (
        <span>{`${formattedWithoutSymbol}`}</span>
    )
}

export default FormattedAmount