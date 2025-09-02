import Header from "./particle/Header"
import Button from "./particle/molecule/Button"
import { useNavigate } from "react-router"

const Collections = () => {

    const navigate = useNavigate()

    return (
        <div className="mb-15">
            <Header
                header={'Administrator Tools'}
                subHeader={"Collections, roles and permissions"}
            />

            <main className="flex items-center justify-center gap-8">
                <Button
                    buttonText={<i className="bi-people" />}
                    title={`${'Users'}`}
                    buttonName={`${'Users'}`}
                    action={() => navigate('/collection/users')}
                />
                <Button
                    buttonText={<i className="bi-people" />}
                    title={`${'Radio Markers'}`}
                    buttonName={`${'Radio Markers'}`}
                    action={() => navigate('/collection/radios')}
                />
                <Button
                    buttonText={<i className="bi-globe" />}
                    title={`${'Countries'}`}
                    buttonName={`${'Countries'}`}
                    action={() => navigate('/collection/countries')}
                />
            </main>
        </div>
    )
}

export default Collections