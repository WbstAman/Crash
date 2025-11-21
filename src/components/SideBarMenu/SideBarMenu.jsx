import SideBarBottomMenu from './components/SideBarBottomMenu'
import SideBarTopMenu from './components/SideBarTopMenu'

const SideBarMenu = () => {
  return (
    <div className='w-full max-w-[250px]'>
      <SideBarTopMenu />
      <SideBarBottomMenu />
    </div>
  )
}

export default SideBarMenu