import { ClientLogin } from "./login";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <>
    <Navbar />
    <ClientLogin />
    </>
  )
}

export default page