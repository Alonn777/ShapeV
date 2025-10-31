
import HeaderMain from '../components/HeaderMain'
import TrainneLayout from '../components/TrainneLayout'
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