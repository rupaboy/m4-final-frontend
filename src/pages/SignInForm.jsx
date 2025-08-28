import { useNavigate } from "react-router";
import { UseNotification } from "../hook/UseNotification";
import { UseUser } from "../hook/UseUser";
import { useForm } from "react-hook-form";
import Logo from '../component/particle/Logo'
import Button from '../component/particle/molecule/Button'

const SignInForm = () => {
  const { notify } = UseNotification()
  const navigate = useNavigate()
  const { logInUser } = UseUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onChange'
  });

const onSubmit = async (data) => {
  const success = await logInUser(data); // true o false

  if (success) {
    notify({
      id: 'login',
      notificationTag: `'${data.email}' has logged in`,
      withProgress: false
    });
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
};


  return (
    <div className="w-screen flex justify-center">
      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>

      <form
        className='flex flex-col items-center justify-center gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor='email'
          className={`
            text-sm select-none
            ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
          `}
        >
          {!errors.email ? 'Email' : `${errors.email?.message}`}
        </label>

        <input
          id='email'
          type='email'
          className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format'
            }
          })}
          placeholder="example@email.com"
        />

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

        <div className='flex gap-3 mt-8'>
          <Button
            buttonColor='dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100'
            buttonText={<i className="bi bi-box-arrow-in-up" />}
            buttonName='Login'
            ratio='flex px-2 items-center gap-1'
            type='submit'
          />
        </div>

        <Button
          ratio="flex items-center gap-2 px-2 mt-4 mb-2 underline"
          buttonText={<i className={'bi-box-arrow-in-right'} />}
          buttonName="No account? Make a new one!"
          action={() => navigate('/user/register')}
        />
      </form>
    </div>
  )
}

export default SignInForm;