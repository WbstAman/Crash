import { useState, useRef, useEffect } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import profile from '../../assets/images/profile.jpg'
import CustomButton from '../UI/Buttons/CustomButton'

const Header = () => {
   const [isSearchOpen, setIsSearchOpen] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const inputRef = useRef(null)

   // Auto focus when search opens
   useEffect(() => {
      if (isSearchOpen && inputRef.current) {
         inputRef.current.focus()
      }
   }, [isSearchOpen])

   const toggleSearch = () => {
      setIsSearchOpen((prev) => {
         const next = !prev
         // When closing, clear the value
         if (!next) {
            setSearchValue('')
         }
         return next
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Search:', searchValue)
   }

   console.log('isSearchOpen', isSearchOpen)

   return (
      <header className="w-full px-4 pt-6 pb-3 flex items-center justify-end">
         <div className="flex items-center gap-4">
            {/* Right block: Search + Buttons */}
            <div className="flex items-center gap-3 ">
               {/* Single animated search wrapper */}


               {!isSearchOpen ?
                  <div className='bg-gray-light rounded-md p-[9.5px]  hidden sm:block' onClick={() => toggleSearch()}>
                     <IoSearchSharp className="text-white text-[25px] cursor-pointer" />
                  </div>
                  :
                  <div className={`absolute top-[75px] right-[35px] sm:relative sm:top-auto sm:right-auto flex items-center rounded-md overflow-hidden bg-gray-light transition-all duration-300 ease-in-out w-full ${isSearchOpen ? 'max-w-[260px] px-3 py-2' : 'w-10 p-2 cursor-pointer justify-center'}
`}
                     onClick={() => {
                        // Only toggle on click when closed
                        if (!isSearchOpen) {
                           toggleSearch()
                        }
                     }}
                  >
                     <IoSearchSharp
                        className={`
                text-white shrink-0
                ${isSearchOpen ? 'text-md2' : 'text-[24px]'}
              `}
                     />

                     <form
                        onSubmit={handleSubmit}
                        className={`flex items-center flex-1 ml-2 transition-opacity duration-200 ease-in-out ${isSearchOpen ? 'opacity-100' : 'opacity-0pointer-events-none'}`}
                     >
                        <input
                           ref={inputRef}
                           id="headerSearchInput"
                           type="text"
                           value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}
                           placeholder="Search..."
                           className="bg-transparent outline-none text-white text-sm flex-1 placeholder:text-gray-400 w-full"
                        />

                        {isSearchOpen && (
                           <button
                              type="button"
                              onClick={toggleSearch}
                              className="ml-2 text-gray-300 hover:text-white text-lg leading-none"
                           >
                              ✕
                           </button>
                        )}
                     </form>
                  </div>
               }
               {/* Buttons */}
               <div className="flex items-center gap-2">
                  <CustomButton
                     title="LOGIN"
                     onClick={() => { }}
                     size="77"
                     variant="primary"
                  />
                  <CustomButton
                     title="REGISTER"
                     onClick={() => { }}
                     size="102"
                  />
               </div>
            </div>

            {/* Profile */}
            <div className="sm:pl-4  sm:border-l sm:border-gray-light flex items-center">
               <img
                  src={profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
               />
            </div>

            <div className='bg-gray-light rounded-md p-[9.5px]  block sm:hidden' onClick={() => toggleSearch()}>
               <IoSearchSharp className="text-white text-[25px] cursor-pointer" />
            </div>
         </div>
      </header>
   )
}

export default Header