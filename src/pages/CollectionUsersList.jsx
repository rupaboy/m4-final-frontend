import { UseNotification } from '../hook/UseNotification';
import { UseFetchStatus } from '../hook/UseFetchStatus';
import { useNavigate } from 'react-router';
import { useEffect } from "react";
import { UseUser } from '../hook/UseUser'
import Button from '../component/particle/molecule/Button'
import Header from '../component/particle/Header';
import UserApi from "../api/UserApi";

const CollectionUsersList = () => {

  const navigate = useNavigate()
  const { notify } = UseNotification();
  const { runFetch, getStatus, resetStatus } = UseFetchStatus();
  const { currentUserList, setCurrentUserList, deleteUser } = UseUser()

  useEffect(() => {
    const fetchUsers = async () => {
      if (getStatus('user-list')?.dataLoaded) return;
      notify({
        id: 'user-list',
        notificationTag: 'Fetching user list',
        duration: 3000
      });
      await runFetch(
        'user-list',
        async () => {
          const res = await UserApi.readList();
          return res.data;
        },
        (data) => {
          setCurrentUserList(data)
        }
      );
    };
    fetchUsers();
  }, []);

  const refetch = () => {
    resetStatus('user-list');
    runFetch(
      'user-list',
      async () => {
        const res = await UserApi.readList();
        return res.data;
      },
      (data) => {
        setCurrentUserList(data)
      }
    );
  };

  return (
    <div className="w-screen flex flex-col items-center gap-2 my-21">
      <Header header="User List" subHeader={`Listing all users`} />
      <aside className="fixed right-4 top-1/2 translate-y-[-6.5em] z-200">
        <Button
          buttonText={<i className='bi bi-arrow-repeat' />}
          buttonName={'Refresh'}
          title={'Refresh'}
          action={refetch}
        />
      </aside>

      <main className="w-full rounded p-3 flex flex-wrap justify-center text-center gap-2 px-15">
        {currentUserList.map((user) => ( //PANEL FOR EACH USER
          <div className='flex flex-col dark:bg-slate-800 bg-slate-300 p-1 items-center gap-1 w-80' key={user._id}>
            <header className="text-xs font-semibold dark:bg-slate-950/30 bg-slate-100/40 p-2 text-center w-full truncate">
              _id: {user._id}
            </header>
            <p className="px-2 text-md dark:text-slate-400 text-slate-900">
              {user.username}
            </p>
            <p className="px-2 text-md dark:text-amber-400 text-amber-900">
              {user.email}
            </p>
            <main className='flex justify-between items-center w-full'>
              <p className="px-1 py-1 w-full text-xs dark:bg-slate-600/20 dark:text-slate-400 bg-slate-200/50 text-slate-700 p-2 text-center pl-10 truncate">
                {user.role.description}
              </p>
              <p className="px-1 dark:bg-slate-700 dark:text-slate-400 bg-slate-200 text-slate-700 text-center truncate w-full max-w-10">
                {user.location}
              </p>
            </main>
            <footer className='w-full flex justify-center gap-2'>
              <Button
                buttonColor="dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100"
                buttonText={<i className="bi bi-pen" />}
                buttonName='Edit Account'
                title='Edit Account'
                ratio='flex px-2 items-center gap-1'
                action={() => {
                  navigate(`/collection/users/edit/id/${user._id}`)
                }}
              />
              <Button
                buttonColor="dark:hover:bg-red-500/80 dark:bg-red-700/80 hover:bg-red-600 bg-red-700 text-slate-100"
                buttonText={<i className='bi bi-arrow-repeat' />}
                ratio={'w-auto flex px-1 gap-1 items-center'}
                buttonName={'Delete User'}
                title={'Delete User'}
                action={async () => {
                  if (confirm('Are you sure you want to delete this user?')) {
                    await deleteUser(user._id)
                    refetch()
                  }
                }}
              />
            </footer>
          </div>
        ))
        }


      </main>

    </div>
  )
}

export default CollectionUsersList;
