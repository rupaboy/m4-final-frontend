import { useNavigate } from "react-router";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { useEffect } from "react";
import { UseUser } from "../hook/UseUser";
import { useForm } from "react-hook-form";
import Logo from '../component/particle/Logo';
import Button from '../component/particle/molecule/Button';
import Header from '../component/particle/Header';
import Loading from "../component/particle/molecule/Loading";

const SignInForm = () => {
  const { notify } = UseNotification();
  const navigate = useNavigate();
  const {
    logInUser,
    logInEmail,
    setLogInEmail,
    addStoredUser,
    removeStoredUser,
    storedUsers
  } = UseUser();

  const { getStatus, runFetch, resetStatus } = UseFetchStatus();
  const { isLoading } = getStatus('login');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      rememberMe: false
    },
    mode: 'onChange'
  });

  // Sincroniza checkbox según email recordado
  useEffect(() => {
    if (logInEmail != null && storedUsers.length > 0) {
      reset({
        email: logInEmail,
        rememberMe: storedUsers.includes(logInEmail)
      });
    } else {
      reset({
        email: logInEmail || '',
        rememberMe: false
      });
    }
  }, [logInEmail, storedUsers, reset]);

  const onSubmit = async (data) => {
    resetStatus('login');

    await runFetch(
      'login',
      async () => logInUser({ email: data.email, password: data.password }),
      (result) => {
        if (result?.user) {
          if (data.rememberMe) addStoredUser(data.email);
          else removeStoredUser(data.email);

          notify({
            id: 'login',
            notificationTag: `'${data.email}' has logged in`,
            withProgress: false
          });

          setLogInEmail(null);
          navigate('/');
        } else {
          notify({
            id: 'login',
            notificationTag: `Login error: check your credentials`,
            withProgress: false,
            duration: 5000
          });
        }
        reset();
      }
    );
  };

  return (
    <div className="w-screen flex justify-center gap-1">
      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>
      <main className="flex flex-col">
        <Header
          header={`${isLoading ? 'Signing In...' : 'Sign In'}`}
          subHeader={`${isLoading ? 'Please wait' : 'Enter your credentials'}`}
        />
        <form
          autoComplete='off'
          className='flex flex-col items-center justify-center gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor='email'
            className={`text-sm select-none ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}
          >
            {!errors.email ? 'Email' : `${errors.email?.message}`}
          </label>
          <input
            id='email'
            type='email'
            autoComplete="new-password"
            className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
            })}
            placeholder="example@email.com"
          />

          <label
            htmlFor='password'
            className={`text-sm select-none ${!errors.password ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}
          >
            {!errors.password ? 'Password' : `${errors.password?.message}`}
          </label>
          <input
            id='password'
            type='password'
            autoComplete="new-password"
            className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              maxLength: { value: 32, message: 'Password cannot exceed 32 characters' }
            })}
            placeholder="yourPassword123"
          />

          <div className="flex gap-2 items-center justify-center text-sm mt-3">
            <label className="select-none cursor-pointer" htmlFor="rememberMe">Remember me:</label>
            <input
              type="checkbox"
              id="rememberMe"
              {...register('rememberMe')}
            />
          </div>

          <div className='flex gap-3 mt-3'>
            <Button
              disabled={isLoading}
              buttonColor='dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100'
              buttonText={isLoading ? <Loading ratio='text-sm' /> : <i className="bi bi-box-arrow-in-up" />}
              buttonName='Login'
              title='Login'
              ratio='flex px-2 items-center gap-1'
              type='submit'
            />
          </div>

          <Button
            ratio="flex items-center gap-2 px-2 mt-4 mb-2 underline"
            buttonText={<i className={'bi-box-arrow-in-right'} />}
            buttonName="No account? Make a new one!"
            title='SignUp'
            action={() => navigate('/user/register')}
          />
        </form>
      </main>
    </div>
  );
};

export default SignInForm;
