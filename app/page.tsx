"use client"
import axios from "axios";


export default function Home() {

	const newData = async () => {
		const { data } = await axios.post('api/redis', {
			text: 'hello',
			tags: ['TypeScript']
		})
		console.log(data)
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Bill bot baggins
			<button onClick={newData}> billbot </button>
    </main>
  )
}
