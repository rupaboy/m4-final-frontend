import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../component/particle/Header";
import Logo from "../component/particle/Logo";

const PageNotFound = () => {
    const [seconds, setSeconds] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        if (seconds === 0) {
            navigate('/');
            return;
        }

        const interval = setInterval(() => setSeconds(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [seconds, navigate]);

    return (
        <aside>
            <main className="flex flex-col gap-4 mt-8">

                <header className='flex justify-center z-200'>
                    <Logo action={() => navigate('/')} />
                </header>

                <Header
                    header={'Error 404: Page not found'}
                    subHeader={`Redirecting in ${seconds} second${seconds !== 1 ? 's' : ''}...`}
                />

            </main>
        </aside>
    );
}

export default PageNotFound;
