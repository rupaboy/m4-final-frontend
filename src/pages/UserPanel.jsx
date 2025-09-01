import { useNavigate } from "react-router";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseUser } from "../hook/UseUser";
import UserApi from "../api/UserApi";
import Header from '../component/particle/Header'
import Logo from "../component/particle/Logo";
import Button from '../component/particle/molecule/Button';

const UserPanel = () => {

  const navigate = useNavigate();
  const { notify } = UseNotification();
  const { runFetch } = UseFetchStatus()

  const {
    removeStoredUser,
    logOutUser,
    user,
  } = UseUser();

  if (!user) return null;

  const handleDelete = async () => {
      if (confirm(`Delete user account: '${user.username}'?`)) {        
        await runFetch('delete-user', async () => {
          const userId = user._id;
          const deletedUser = await UserApi.delete(userId);
          if (!deletedUser) throw new Error('Deletion failed');
          removeStoredUser(user.email)
          logOutUser();
          return deletedUser; // returned data is passed to onSuccess
        }, () => {
          notify({ id: 'delete-user', notificationTag: 'Success deleting user!', duration: 8000, withProgress: false });
          navigate(`/`);
        });
      }
    }

  const handleLogout = () => {
    logOutUser();
    navigate('/');
  }

  return (
    <div className="w-full flex flex-col items-start gap-1">

      <header className='top-7 left-1/2 translate-x-[-2rem] sm:translate-x-[-3.4rem] fixed flex justify-center z-200'>
        <Logo action={() => navigate('/')} />
      </header>
      <Header header={`User Account`} subHeader={`ID: ${user._id}`} />

      <main className="w-screen flex justify-center">
        <div className='flex flex-col gap-2'>

          <div className="flex items-center justify-center gap-2">
            <aside className="flex flex-col text-amber-950 dark:text-amber-500 gap-2">
              <label className="text-right text-xs leading-6 text-nowrap select-none">Username:</label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">Email address:</label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">User location:</label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">User role:</label>
            </aside>

            <aside className="flex flex-col gap-2">
              <p className="text-left text-nowrap">{user.username}</p>
              <p className="text-left text-nowrap">{user.email}</p>
              <p className="text-left text-nowrap">{user.location}</p>
              <p className="text-left text-nowrap">{user.role?.description}</p>
            </aside>
          </div>

          <footer className='flex justify-center gap-3 mt-8'>
            <Button
              buttonColor="dark:hover:bg-red-500/80 dark:bg-red-700/80 hover:bg-red-600 bg-red-700 text-slate-100"
              buttonText={<i className="bi bi-trash" />}
              buttonName='Delete User'
              ratio='flex px-2 items-center gap-1'
              action={handleDelete}
            />
            <Button
              buttonText={<i className="bi bi-box-arrow-in-left" />}
              buttonName='Logout'
              ratio='flex px-2 items-center gap-1'
              action={handleLogout}
            />
            <Button
              buttonColor="dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100"
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName='Edit Account'
              ratio='flex px-2 items-center gap-1'
              action={() => navigate(`/user/edit/${user._id}`)}
            />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default UserPanel;
