"use client"
import axios from "axios"
import React from "react"
import { redisConnect } from "../lib/redis"

export default function Home() {

	const newData = async () => {
		const { data } = await axios.post('api/redis', {
			text: 'hello',
			tags: ['TypeScript', 'CSS']
		})
		console.log(data)
	}

  return (
		<>
    <main className="class">
      <button onClick={newData}>bill-bot</button>
    </main>
		</>
  )
}
