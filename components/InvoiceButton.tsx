import React from "react";
import axios from "axios";
import Link from "next/link";

const InvoiceButton = ({invoice} : any) => {
    const handlePayment = async (e: any) => {
        e.preventDefault();
        const {data} = await axios.post('/api/payment',
        {
            invoiceId: invoice
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        })
        window.location.assign(data)    
    }
async function test() {
    const res = await axios.post('/api/payment', {})
    console.log(res);
}

    return (
        <button className = "mt-8 flex w-full justify-center border border-transparent py-2 px-4 text-sm font-medium" onClick={handlePayment}>
            Pay Invoice
        </button>
    )
}

export default InvoiceButton