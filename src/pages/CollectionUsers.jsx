import Header from "../component/particle/Header"
import Button from "../component/particle/molecule/Button"
import { useNavigate } from "react-router"

const CollectionUsers = () => {

  const navigate = useNavigate()

  return (
    <main className="w-screen flex flex-col justify-start items-center h-full">
      <Header
        header={'User Collection'}
        subHeader={'Administrator Tools'}
      />
      <main className="flex items-center justify-center gap-8">
        <Button
          buttonText={<i className="bi-person-add" />}
          title={`${'Create User'}`}
          buttonName={`${'Create User'}`}
          action={() => navigate('/collection/users/create')}
        />
        <Button
          buttonText={<i className="bi-people" />}
          title={`${'List Users'}`}
          buttonName={`${'List Users'}`}
          action={() => navigate('/collection/users/list')}
        />
      </main>

    </main>
  )
}

export default CollectionUsers