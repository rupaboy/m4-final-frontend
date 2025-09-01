import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseUser } from '../hook/UseUser';
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Header from '../component/particle/Header.jsx'
import Logo from "../component/particle/Logo";
import Loading from '../component/particle/molecule/Loading';
import Button from '../component/particle/molecule/Button';
import UserApi from "../api/UserApi";
import { useNavigate } from "react-router";

const UserEditPanel = () => {
  const { getStatus, runFetch, resetStatus } = UseFetchStatus();
  const { notify } = UseNotification();
  const navigate = useNavigate();
  const { user, setUser, isAdmin } = UseUser();
  const { retryFetchCountries, countries } = UseWorld();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
      location: user.location || '',
      password: '',
      role: user.role.id || '',
    }
  });

  // Forces country value on selector when countries are loaded
  useEffect(() => {
    if (countries.length > 0) setValue('location', user.location || '');
  }, [countries, setValue, user.location]);

  // Get countries if not loaded
  useEffect(() => {
    if (getStatus('countries')?.dataLoaded) return;
    if (countries.length) {
      notify({ id: 'countries', notificationTag: 'Found countries in cache', withProgress: false });
    } else {
      notify({ id: 'countries', notificationTag: 'Fetching countries' });
      retryFetchCountries();
    }
  }, [getStatus]);

  const onSubmit = async (data) => {
    resetStatus('updateUser'); // reset fetch status to trigger loading
    await runFetch('updateUser', async () => {
      const newUser = { username: data.username, email: data.email, location: data.location };
      if (data.password?.trim()) newUser.password = data.password;

      const updatedUser = await UserApi.update(user._id, newUser);
      if (!updatedUser) throw new Error('Update failed');

      setUser(prev => ({ ...prev, ...newUser }));
      return updatedUser; // returned data is passed to onSuccess
    }, () => {
      notify({ id: 'updateUser', notificationTag: 'Success editing user!', duration: 8000, withProgress: false });
      navigate(`/user/id/${user._id}`);
      reset();
    });
  };

  const { isLoading } = getStatus('updateUser');

  // Show loading while countries not loaded
  if (countries.length === 0) return <Loading size={32} />;

  return (
    <div className="w-screen flex justify-center">
      <div className='top-7 fixed mx-auto'><Logo /></div>

      <form className='flex flex-col items-center justify-center gap-1' onSubmit={handleSubmit(onSubmit)}>

        <Header header={'Edit User'} subHeader={'Fields are optional'} />
        {/* Username */}
        { user.username !== 'admin' &&
          <>
        <label htmlFor='username' className={`text-sm select-none ${!errors.username ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.username ? 'Username' : `${errors.username?.message}`}
        </label>
        <input id='username' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          {...register('username', { required: 'Username is required', minLength: { value: 5, message: '6 characters minimum' } })}
          placeholder="customusername"
        />
      </>
}

        {/* Email */}
        <label htmlFor='email' className={`text-sm select-none ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.email ? 'Email' : `${errors.email?.message}`}
        </label>
        <input id='email' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Invalid Email Format' } })}
          placeholder='pauldummy84@mail.com'
        />

        {/* Password */}
        <label htmlFor='password' className={`text-sm select-none ${!errors.password ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.password ? 'Password' : `${errors.password?.message}`}
        </label>
        <input id='password' type='password' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          {...register('password', { minLength: { value: 6, message: 'Password must be at least 6 characters' }, maxLength: { value: 32, message: 'Password cannot exceed 32 characters' } })}
          placeholder={"currentPassword"}
        />

        {/* Role */}
        {isAdmin &&
          <>
            <label htmlFor='role' className={`text-sm select-none ${!errors.role ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
              {!errors.role ? 'Role' : `${errors.role?.message}`}
            </label>
            <select id='role' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
              {...register('role')}
            >
              <option value="" disabled>User Role</option>
              { user.username !== 'admin' &&
                <option value="">Basic User</option>
                }
              <option value="">Administrator</option>
            </select>
          </>
        }

        {/* Location */}
        <label htmlFor='location' className={`text-sm select-none ${!errors.location ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
          {!errors.location ? 'Location' : `${errors.location?.message}`}
        </label>
        <select id='location' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          {...register('location', { required: 'Country selection is required' })}
        >
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
            buttonText={isLoading ? <Loading ratio='text-sm' /> : <i className="bi bi-box-arrow-in-up" />}
            buttonName={'Update User'}
            title={'Confirm new data'}
            ratio={'flex px-2 items-center gap-1'}
            type={'submit'}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default UserEditPanel;
