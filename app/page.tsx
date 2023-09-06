
"use client"
import axios from "axios"
//import  { Hero } from '@/components';
import React from "react"
import Link from "next/link"
import { Theme } from '@radix-ui/themes';
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
	  <>
		<p><Link href="/clientLogin">
        Client Login
      </Link></p>
	  {/* <p><Hero /></p> */}
		</>
    </main>
		</>
  )
}
