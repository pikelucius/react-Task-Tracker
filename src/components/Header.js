import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, title2, onAdd, showAdd}) => {

    const location = useLocation()
    const onClick = () => {
        onAdd()
    }

    return (



        <header className='header'>
           <h1>{title} {title2}</h1>
           {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onClick} />}

        </header>
    )
}

Header.defaultProps = {
    title2: 'Tracker'
}


export default Header
