import { useNavigate } from "react-router";
import { UseUser } from "../hook/UseUser";
import Logo from "../component/particle/Logo";
import Button from '../component/particle/molecule/Button';

const UserPanel = () => {

  const navigate = useNavigate();

  const { logOutUser, user, deleteUser } = UseUser()
  
  return (
    <main className="w-screen flex justify-center">

      <header className='top-7 fixed mx-auto'>
        <Logo
          action={() => navigate('/')}
        />
      </header>

      {user &&
        <div className='flex flex-col gap-2'>

          <div className="flex items-center justify-center gap-2">
            <aside className="flex flex-col text-amber-950 dark:text-amber-500 gap-2">
              <label className={`ml-auto select-none`}
              > {'Username:'} </label>
              <label className={`ml-auto select-none`}
              > {'Email address:'} </label>
              <label className={`ml-auto select-none`}
              > {'User location:'} </label>
            </aside>
            <aside className="flex flex-col gap-2">
              <div className="">{user.username}</div>
              <div className="">{user.email}</div>
              <div className="">{user.location}</div>
            </aside>

          </div>

          <footer className='flex justify-center gap-3 mt-8'>
            <Button
              buttonColor={`
              dark:hover:bg-red-500/80 dark:bg-red-700/80
              hover:bg-red-600 bg-red-700 text-slate-100`}
              buttonText={<i className="bi bi-trash" />}
              buttonName={'Delete User'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => {
                if (confirm(`Delete user account: '${user.username}'?`)) {
                  navigate('/')
                  logOutUser()
                  deleteUser(user._id)
                };
              }}
            />

            < Button
              buttonText={< i className="bi bi-box-arrow-in-left" />}
              buttonName={'Logout'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => {
                navigate('/')
                logOutUser()
              }}
            />

            <Button
              buttonColor={`
              dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80
              hover:bg-emerald-600 bg-emerald-700 text-slate-100`}
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName={'Edit Account'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => navigate(`/user/edit/${user._id}`)}
            />
          </footer>
        </div>}
    </main>
  )
}

export default UserPanel;
