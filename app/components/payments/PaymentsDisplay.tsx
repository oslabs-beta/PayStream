import axios from "axios"
import { NextResponse } from "next/server"
import React, {useEffect, useState} from "react"


// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties
interface ServerResponse {
  data: ServerData
}

interface ServerData {
  node: string[]
}

const PaymentRecord = () => {
	let fetchedData;
	const newData = async (): Promise<ServerResponse> => {
		const response =  await axios.request<ServerResponse>({url: 'api/salesforce', method: "post"})
		// map the data to properties for relevant records
		const { data } = response
		return data
	}

	// put axios request inside of useEffect hook and have "newData" update state
	const payments = newData()
	console.log(payments)

	// map payments info to props and then make individual payment record components

	return (
		<>
		<button onClick={newData}>bill-bot-baggins</button>
		</>
	)
}

export default PaymentRecord
