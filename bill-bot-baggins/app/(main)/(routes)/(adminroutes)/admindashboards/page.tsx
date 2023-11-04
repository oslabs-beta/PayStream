import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import Graph from '@/components/admincomponents/Graph';
import Overview from '@/components/admincomponents/Overview';
import { auth } from '@clerk/nextjs';

export default function Home() {

  const { userId, sessionId } = auth();

  if (!userId) {
    return null;
  }

  return (
<Overview></Overview>

  );
}

//import {useSession} from "next-auth/react";

// export default function () {
//   const {data: session} = useSession();
//   return {
  //   <div>
  //     <h2>
  //       Hello, <b>{session?.user?.name}</b>
  //     </h2>
  //     <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
  //       <span className="px-2">
  //         {session?.user?.name}
  //       </span>
  //     </div>
  //   </div>
  // }
//}