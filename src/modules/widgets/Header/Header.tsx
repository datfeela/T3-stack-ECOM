import { Auth } from './Auth/Auth'

export const Header: React.FC = () => {
    return (
        <header style={{ background: '#000' }}>
            nu tut header
            <div style={{ marginLeft: 'auto', width: 'fit-content' }}>
                <Auth />
            </div>
        </header>
    )
}
