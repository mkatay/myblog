import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonThroughWindow,faCircle,faCheck} from '@fortawesome/free-solid-svg-icons'

export const NotFound = () => {
  return (
    <div>NotFound
     <FontAwesomeIcon icon={faPersonThroughWindow} className='fa-fade fa-10x' transform={{ rotate: 42 }} border/>


     <div>
    <div>
    <span className="fa-layers fa-fw fa-lg">
  <FontAwesomeIcon icon={faCircle}className='fa-10x'/>
  <FontAwesomeIcon icon={faCheck} transform="shrink-6" inverse className='fa-10x'/>
  <span className='text-white'>számláló</span>
</span>

    </div>
     
     </div>
    </div>
  )
}
