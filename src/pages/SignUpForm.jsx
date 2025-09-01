import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseUser } from '../hook/UseUser';
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Logo from "../component/particle/Logo";
import Loading from '../component/particle/molecule/Loading';
import Header from "../component/particle/Header";
import Button from '../component/particle/molecule/Button';
import UserApi from "../api/UserApi";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const { getStatus, runFetch, resetStatus } = UseFetchStatus();
  const { retryFetchCountries, countries } = UseWorld();
  const { notify } = UseNotification();
  const { logInUser } = UseUser()
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      location: '',
      password: ''
    }
  });

  // Force country selection
  useEffect(() => {
    if (countries.length > 0) setValue('location', '');
  }, [countries, setValue]);

  // Fetch countries if not loaded
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
    resetStatus('createUser');

    await runFetch('createUser', async () => {
      const userData = {
        ...data,
        role: 'user', // valor fijo que no se muestra
      };

      const createdUser = await UserApi.signUp(userData);
      if (!createdUser) throw new Error('Creation failed');

      logInUser(userData)
      return createdUser;
    }, () => {
      notify({ id: 'createUser', notificationTag: 'User created successfully!', duration: 8000, withProgress: false });
      navigate('/');
      reset();
    });
  };

  const { isLoading } = getStatus('createUser');

  if (countries.length === 0) return <Loading size={32} />;

  return (
    <div className="w-screen flex justify-center gap-1">
      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>
      <main className="flex flex-col">
        <Header
          header={`${isLoading ? 'Registering...' : 'Sign Up'}`}
          subHeader={`${isLoading ? 'Please wait' : 'Register a new account'}`}
        />
        <form
          autoComplete="off"
          className='flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username */}
          <label htmlFor='username' className={`text-sm select-none ${!errors.username ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
            {!errors.username ? 'Username' : `${errors.username?.message}`}
          </label>
          <input autoComplete="new-password" id='username' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('username', { required: 'Username is required', minLength: { value: 6, message: '6 characters minimum' } })}
            placeholder="customusername"
          />

          {/* Email */}
          <label htmlFor='email' className={`text-sm select-none ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
            {!errors.email ? 'Email' : `${errors.email?.message}`}
          </label>
          <input autoComplete="new-password" id='email' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Invalid Email' } })}
            placeholder='pauldummy84@mail.com'
          />

          {/* Password */}
          <label htmlFor='password' className={`text-sm select-none ${!errors.password ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
            {!errors.password ? 'Password' : `${errors.password?.message}`}
          </label>
          <input autoComplete="new-password" id='password' type='password' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, maxLength: { value: 32, message: 'Password cannot exceed 32 characters' } })}
            placeholder="Enter a password"
          />

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
              buttonName={'Clear form'}
              title={'Clear current form'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => reset()}
            />
            <Button
              buttonColor='dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100'
              buttonText={isLoading ? <Loading ratio='text-sm' /> : <i className="bi bi-box-arrow-in-up" />}
              buttonName={'Create User'}
              title={'Submit new user'}
              ratio={'flex px-2 items-center gap-1'}
              type={'submit'}
              disabled={isLoading}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUpForm;
