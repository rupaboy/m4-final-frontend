import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { UseUser } from '../hook/UseUser'
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Logo from "../component/particle/Logo"
import Loading from '../component/particle/molecule/Loading'
import Button from '../component/particle/molecule/Button'
import UserApi from "../api/UserApi";
import { useNavigate } from "react-router";
import { UseMarkers } from "../hook/UseMarkers";

const SignUpForm = () => {

  const { getStatus } = UseFetchStatus()
  const { notify } = UseNotification()

  const navigate = useNavigate()

  const { addToMarkers } = UseMarkers()

  const { logInUser } = UseUser()

  const {
    retryFetchCountries,
    countries
  } = UseWorld()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      location: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {

    const newUser = {
      username: data.username,
      email: data.email,
      location: data.location,
      password: data.password,
      role: 'user'
    };

    try {
      const user = await UserApi.signUp(newUser);

      notify({
        id: 'register',
        notificationTag: `Success! '${user.username}' is your new Username`,
        duration: 8000,
        withProgress: false
      });

      logInUser(user)

      notify({
        id: 'login',
        notificationTag: `'${user.username}' has logged in`,
        withProgress: false
      });
      navigate('/') //To DashBoard
      reset();
    } catch (error) {
      notify({
        id: 'register',
        notificationTag: `Registration error: ${error}`,
        withProgress: false,
        duration: 5000
      });
    }
  };

  useEffect(() => {
    if (getStatus('countries')?.dataLoaded) return;

    if (countries.length) {
      notify({
        id: 'countries',
        notificationTag: 'Found countries in cache',
        withProgress: false
      })
    } else {
      notify({
        id: 'countries',
        notificationTag: 'Fetching countries'
      })
      retryFetchCountries()
    }
  }, [getStatus])


  return (
    <div className="w-screen flex justify-center">

      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>

      {countries ?
        <form className='flex flex-col items-center justify-center gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor='username'
            className={`
              text-sm select-none
              ${!errors.username ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.username ? 'Username' : `${errors.username?.message}`} </label>

          <input
            id='username'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 6, message: '6 characters minimum' }
            })}
            placeholder="customusername"
          />

          <label
            htmlFor='email'
            className={`
              text-sm select-none
              ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.email ? 'Email' : `${errors.email?.message}`} </label>
          <input
            id='email'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Invalid Email' }
            })}
            placeholder='pauldummy84@mail.com' />

          <label
            htmlFor='password'
            className={`
            text-sm select-none
            ${!errors.password ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
          `}
          >
            {!errors.password ? 'Password' : `${errors.password?.message}`}
          </label>

          <input
            id='password'
            type='password'
            className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 32, message: 'Password cannot exceed 32 characters' }
            })}
            placeholder="yourPassword123"
          />


          <label
            htmlFor='location'
            className={`
              text-sm select-none
              ${!errors.location ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.location ? 'Location' : `${errors.location?.message}`} </label>
          <select
            id='location'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('location', {
              required: 'Country selection is required'
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Country Selection
            </option>
            {Array.isArray(countries) && countries.map(c => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <div className='flex gap-3 mt-8'>
            <Button
              buttonColor={`
                dark:hover:bg-red-500/80 dark:bg-red-700/80
                hover:bg-red-600 bg-red-700 text-slate-100`}
              buttonText={<i className="bi bi-arrow-counterclockwise" />}
              buttonName={'Clear form'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => reset()}
            />

            <Button
              buttonColor={`
                dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80
                hover:bg-emerald-600 bg-emerald-700 text-slate-100`}
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName={'Create User'}
              ratio={'flex px-2 items-center gap-1'}
              type={'submit'}
            />
          </div>

        </form>
        : <Loading />
      }

    </div>
  )
}

export default SignUpForm;
