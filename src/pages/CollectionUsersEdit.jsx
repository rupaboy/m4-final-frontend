import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { UseUser } from "../hook/UseUser";
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Header from '../component/particle/Header';
import Logo from "../component/particle/Logo";
import Loading from '../component/particle/molecule/Loading';
import Button from '../component/particle/molecule/Button';
import UserApi from "../api/UserApi";

const CollectionUsersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = UseNotification();
  const { runFetch, getStatus, resetStatus } = UseFetchStatus();
  const { selectedUser, setSelectedUser } = UseUser();
  const { countries, retryFetchCountries } = UseWorld();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      location: "",
      password: ""
    }
  });

  // --- Fetch user by ID ---
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      if (getStatus(`user-id-${id}`)?.dataLoaded) {
        setSelectedUser(selectedUser);
        notify({ id: 'loading-user', notificationTag: `User ${id}: from cache`, duration: 2000 });
      } else {
        notify({ id: 'loading-user', notificationTag: `User ${id}: fetching`, duration: 3000 });
        await runFetch(
          `user-id-${id}`,
          () => UserApi.readById(id),
          (res) => setSelectedUser(res.data)
        );
      }
    };

    fetchUser();
  }, [id]);

  // --- Set default values when user is loaded ---
  useEffect(() => {
    if (!selectedUser) return;
    reset({
      username: selectedUser.username || "",
      email: selectedUser.email || "",
      location: selectedUser.location || "",
      password: ""
    });
  }, [selectedUser, reset]);

  // --- Submit handler ---
  const onSubmit = async (data) => {
  if (!selectedUser) return;
  resetStatus('updateUser');

  try {
    await runFetch(
      'updateUser',
      async () => {
        const newUser = { username: data.username, email: data.email, location: data.location };
        if (data.password?.trim()) newUser.password = data.password;

        const updatedUser = await UserApi.update(selectedUser._id, newUser);
        if (!updatedUser?.success) throw new Error(updatedUser?.message || "Update failed");

        setSelectedUser(prev => ({ ...prev, ...newUser }));
        return updatedUser;
      },
      () => {
        notify({ id: 'updateUser', notificationTag: 'User updated!', duration: 8000 });
        navigate(`/collection/users/id/${selectedUser._id}`);
        reset();
      }
    );
  } catch (error) {
    notify({ id: 'updateUserError', notificationTag: error.message, duration: 8000 });
  }
};

  if (!selectedUser || countries.length === 0) return <Loading size={32} />;

  return (
    <div className="w-screen flex flex-col items-center gap-2">
      <header className="top-7 fixed">
        <Logo action={() => navigate("/")} />
      </header>
      <Header header="Edit User" subHeader={`ID: ${id}`} />

      <form className='flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit(onSubmit)}>

        {/* Username */}
        <label className={`text-sm select-none ${!errors.username ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.username ? 'Username' : errors.username?.message}
        </label>
        <input
          {...register('username', { required: 'Username is required', minLength: { value: 5, message: '5 characters minimum' } })}
          className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
        />

        {/* Email */}
        <label className={`text-sm select-none ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.email ? 'Email' : errors.email?.message}
        </label>
        <input
          {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Invalid Email' } })}
          className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
        />

        {/* Password */}
        <label className={`text-sm select-none ${!errors.password ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.password ? 'Password' : errors.password?.message}
        </label>
        <input
          type="password"
          {...register('password', { minLength: { value: 6, message: '6 chars min' }, maxLength: { value: 32, message: 'Max 32 chars' } })}
          className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          placeholder="currentPassword"
        />

        {/* Location */}
        <label className={`text-sm select-none ${!errors.location ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.location ? 'Location' : errors.location?.message}
        </label>
        <select {...register('location', { required: 'Country selection required' })} className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'>
          <option value="" disabled>Country Selection</option>
          {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>

        {/* Buttons */}
        <div className='flex gap-3 mt-8'>
          <Button
            buttonColor='dark:hover:bg-red-500/80 dark:bg-red-700/80 hover:bg-red-600 bg-red-700 text-slate-100'
            buttonText={<i className="bi bi-arrow-counterclockwise" />}
            buttonName={'Restore form'}
            title={'Clear current modifications'}
            ratio={'flex px-2 items-center gap-1'}
            action={() => reset()}
          />
          <Button
            buttonColor='dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100'
            buttonText={getStatus('updateUser')?.isLoading ? <Loading ratio='text-sm' /> : <i className="bi bi-box-arrow-in-up" />}
            buttonName={'Update User'}
            title={'Confirm new data'}
            ratio={'flex px-2 items-center gap-1'}
            type='submit'
            disabled={getStatus('updateUser')?.isLoading}
          />
        </div>

      </form>
    </div>
  );
};

export default CollectionUsersEdit;
