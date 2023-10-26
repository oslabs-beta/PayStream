// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Listbox } from '@headlessui/react';

// import { SearchFilterProps } from '@/lib/types';
// import { updateSearchParams } from '@/lib/utils';

// export default function SearchFilter({
//   title,
//   options,
//   onFilter,
// }: SearchFilterProps) {
//   const router = useRouter();
//   const [selected, setSelected] = useState(options[0]);

//   const handleUpdateParams = (e: { title: string; value: string }) => {
//     const newPathName = updateSearchParams(title, e.value.toLowerCase());

//     router.push(newPathName);
//   };

//   return (
//     <div className='w-fit'>
//       <Listbox
//         value={selected}
//         onChange={(e) => {
//           setSelected(e);
//           onFilter(e.value);
//           console.log(e.value);
//           handleUpdateParams(e);
//         }}
//       >
//         <div className='relative z-10 w-fit'>
//           {/* Button for the listbox */}
//           <Listbox.Button className=''>
//             <span className=''>{selected.title}</span>
//             <Image
//               src='/up-down.svg'
//               width={20}
//               height={20}
//               className='ml-4 object-contain'
//               alt='up-down'
//             />
//           </Listbox.Button>

//           <Listbox.Options className='custom-filter__options'>
//             {options.map((option) => (
//               <Listbox.Option
//                 key={option.title}
//                 className={({ active }) =>
//                   `relative cursor-default select-none px-4 py-2 ${
//                     active ? 'bg-primary-blue text-white' : 'text-primary-blue'
//                   }`
//                 }
//                 value={option}
//               >
//                 {({ selected }) => (
//                   <>
//                     <span
//                       className={`${selected ? 'font-medium' : 'font-normal'}`}
//                     >
//                       {option.title}
//                     </span>
//                   </>
//                 )}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </div>
//       </Listbox>
//     </div>
//   );
// }
