import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Logo from "../component/particle/Logo";
import Loading from '../component/particle/molecule/Loading';
import Header from "../component/particle/Header";
import Button from '../component/particle/molecule/Button';
import UserApi from "../api/UserApi";

const CollectionUsersCreate = () => {
    const { getStatus, runFetch, resetStatus } = UseFetchStatus();
    const { retryFetchCountries, countries } = UseWorld();
    const { notify } = UseNotification();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: { username: '', email: '', location: '', password: '', role: '' }
    });

    useEffect(() => { if (countries.length > 0) setValue('location', ''); }, [countries, setValue]);

    useEffect(() => {
        if (getStatus('countries')?.dataLoaded) return;
        if (countries.length) {
            notify({ id: 'countries', notificationTag: 'Found countries in cache', withProgress: false });
        } else {
            notify({ id: 'countries', notificationTag: 'Fetching countries' });
            retryFetchCountries();
        }
    }, [getStatus]);

    const onSubmit = async (formData) => {
        resetStatus('createUser');
        await runFetch("createUser", async () => {
      try {
        const res = await UserApi.create(formData);
        return res.data;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Unknown error while signing in";

        notify({
          id: "creation-error",
          notificationTag: `${error.response?.data?.message}`,
          message,
          withProgress: false
        });
        throw error;
      }
    }, (data) => {
        navigate('/collection/users/list')
      notify({
        id: "creation-success",
        notificationTag: "User created successfully",
        message: `${data.user.username} created`,
        withProgress: false
      });
    });
  };

    const { isLoading } = getStatus('createUser');
    if (countries.length === 0) return <Loading size={32} />;

    return (
        <div className="w-screen flex justify-center gap-1">
            <div className='top-7 fixed mx-auto'><Logo /></div>
            <main className="flex flex-col">
                <Header header={`${isLoading ? 'Registering...' : 'Create User'}`} subHeader={`${isLoading ? 'Please wait' : 'Register dummy user'}`} />
                <form autoComplete="off" className='flex flex-col items-center gap-2' onSubmit={handleSubmit(onSubmit)}>
                    {/* Username */}
                    <label htmlFor='username' className={`text-sm select-none ${!errors.username ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
                        {!errors.username ? 'Username' : `${errors.username?.message}`}
                    </label>
                    <input autoComplete="new-password" id='username' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
                        {...register('username', { required: 'Username is required', minLength: { value: 5, message: '5 characters minimum' } })}
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

                    {/* User Role */}
                    <label htmlFor='role' className={`text-sm select-none ${!errors.role ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}`}>
                        {!errors.role ? 'Role' : `${errors.role?.message}`}
                    </label>
                    <select id='role' className='p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400'
                        {...register('role')}
                    >
                        <option value="" disabled>User Role</option>
                        <option value="user">Basic User</option>
                        <option value="admin">Administrator</option>
                    </select>

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

export default CollectionUsersCreate;
