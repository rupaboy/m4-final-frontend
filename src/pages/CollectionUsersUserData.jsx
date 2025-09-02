import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseUser } from "../hook/UseUser";
import UserApi from "../api/UserApi";
import Header from '../component/particle/Header';
import Logo from "../component/particle/Logo";
import Button from '../component/particle/molecule/Button';

const CollectionUsersUserData = () => {
  const navigate = useNavigate();
  const { notify } = UseNotification();
  const { runFetch, getStatus } = UseFetchStatus();
  const { id } = useParams();

  const { selectedUser, setSelectedUser, removeStoredUser } = UseUser();

  if (!id) return null;

  const handleDelete = async () => {
    if (confirm(`Delete user account: '${selectedUser.username}'?`)) {
      await runFetch(
        "delete-user",
        async () => {
          const deletedUser = await UserApi.delete(selectedUser._id);
          if (!deletedUser) throw new Error("Deletion failed");
          removeStoredUser(selectedUser.email);
          return deletedUser;
        },
        () => {
          setSelectedUser(null)
          notify({
            id: "delete-user",
            notificationTag: "Success deleting user!",
            duration: 8000,
            withProgress: false,
          });
          navigate(`/collection/users/list`);
        }
      );
    }
  };

  // --- Fetch user by id ---
  useEffect(() => {
    if (!id) return;

    const fetchUserId = async () => {
      if (getStatus(`user-id-${id}`)?.dataLoaded) {
        notify({
          id: "loading-user",
          notificationTag: `User ${id}: from cache`,
          duration: 2000,
          withProgress: false,
        });
      } else {
        notify({
          id: "loading-user",
          notificationTag: `User ${id}: single fetch`,
          duration: 3000,
        });
        await runFetch(
          `user-id-${id}`,
          () => UserApi.readById(id),
          (res) => setSelectedUser(res.data)
        );
      }
    };
    fetchUserId();
  }, [id]);

  if (!selectedUser) return <p>Loading user...</p>;

  return (
    <div className="w-full flex flex-col items-start gap-1">
      <header className="top-7 left-1/2 translate-x-[-2rem] sm:translate-x-[-3.4rem] fixed flex justify-center z-200">
        <Logo action={() => navigate("/")} />
      </header>
      <Header header={`User Account`} subHeader={`ID: ${id}`} />

      <main className="w-screen flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <aside className="flex flex-col text-amber-950 dark:text-amber-500 gap-2">
              <label className="text-right text-xs leading-6 text-nowrap select-none">
                Username:
              </label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">
                Email address:
              </label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">
                User location:
              </label>
              <label className="text-right text-xs leading-6 text-nowrap select-none">
                User role:
              </label>
            </aside>

            <aside className="flex flex-col gap-2">
              <p className="text-left text-nowrap">{selectedUser.username}</p>
              <p className="text-left text-nowrap">{selectedUser.email}</p>
              <p className="text-left text-nowrap">{selectedUser.location}</p>
              <p className="text-left text-nowrap">{selectedUser.role?.description}</p>
            </aside>
          </div>

          <footer className="flex justify-center gap-3 mt-8">
            <Button
              buttonColor="dark:hover:bg-red-500/80 dark:bg-red-700/80 hover:bg-red-600 bg-red-700 text-slate-100"
              buttonText={<i className="bi bi-trash" />}
              buttonName="Delete User"
              title="Delete User"
              ratio="flex px-2 items-center gap-1"
              action={handleDelete}
            />
            <Button
              buttonColor="dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100"
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName="Edit Account"
              title="Edit Account"
              ratio="flex px-2 items-center gap-1"
              action={() => navigate(`/collection/users/edit/id/${id}`)}
            />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default CollectionUsersUserData;
