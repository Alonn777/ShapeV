
import HeaderMain from '../components/HeaderMain.jsx'
import TrainneLayout from './TrainneLayout'
import { ArrowLeft } from 'lucide-react'
import { Outlet } from 'react-router-dom'
const ShapevMain = () => {
  
  return (
    <div id="dashboard">
    <HeaderMain/>
  
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default ShapevMain