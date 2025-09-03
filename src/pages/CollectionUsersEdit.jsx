import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
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
  const { countries, retryFetchCountries } = UseWorld();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // --- Get countries ---
  useEffect(() => {
    if (getStatus("countries")?.dataLoaded) return;
    if (!countries.length) {
      notify({ id: "countries", notificationTag: "Fetching countries" });
      retryFetchCountries();
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      notify({ id: "loading-user", notificationTag: `User ${id}: fetching`, duration: 3000 });

      try {
        const response = await UserApi.readById(id);

        if (!response?.data) {
          notify({ id: "userNotFound", notificationTag: "User not found", duration: 5000 });
          navigate(`/collection/users/list`); // redirige si usuario borrado
          return;
        }

        const user = response.data;
        reset({
          username: user.username,
          email: user.email,
          location: user.location,
          role: user.role?.name,
          password: ''
        });
      } catch (err) {
        notify({ id: "fetchError", notificationTag: "Error fetching user", duration: 5000 });
        navigate(`/collection/users/list`);
      }
    };

    fetchUser();
  }, [id, reset, navigate, notify]);

  const onSubmit = async (data) => {
    resetStatus("updateUser");
    try {
      const payload = {
        username: data.username,
        email: data.email,
        location: data.location,
        role: data.role,
      };

      const response = await runFetch("updateUser", () => UserApi.update(id, payload));

      if (!response?.data.success) throw new Error(response?.message || "Update failed");


      // --- storedUsers ---
      if (oldEmail) {
        const updatedUsers = storedUsers.map(e => e === oldEmail ? payload.email : e);
        if (!updatedUsers.includes(payload.email)) updatedUsers.push(payload.email);
        localStorage.setItem("sphereOne-users", JSON.stringify(updatedUsers));
      } else if (!storedUsers.includes(payload.email)) {
        storedUsers.push(payload.email);
        localStorage.setItem("sphereOne-users", JSON.stringify(storedUsers));
      }

      // Reset form
      reset({
        username: payload.username,
        email: payload.email,
        location: payload.location,
        role: payload.role,
        password: ''
      });

      notify({ id: "updateUser", notificationTag: "User updated!", duration: 5000, withProgress: false });
      navigate(`/collection/users/list`);
    } catch (error) {
      notify({ id: "updateUserError", notificationTag: error.message, duration: 6000, withProgress: false });
    }
  };

  return (
    <div className="w-screen flex flex-col items-center gap-2">
      <header className="top-7 fixed">
        <Logo action={() => navigate("/")} />
      </header>
      <Header header="Edit User" subHeader={`ID: ${id}`} />

      <form className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <label className={`text-sm select-none ${!errors.username ? "text-amber-950 dark:text-amber-500" : "dark:text-red-400 text-red-700"}`}>
          {!errors.username ? "Username" : errors.username?.message}
        </label>
        <input
          {...register("username", { required: "Username is required", minLength: { value: 5, message: "5 characters minimum" } })}
          className="p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400"
        />

        {/* Email */}
        <label className={`text-sm select-none ${!errors.email ? "text-amber-950 dark:text-amber-500" : "dark:text-red-400 text-red-700"}`}>
          {!errors.email ? "Email" : errors.email?.message}
        </label>
        <input
          {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: "Invalid Email" } })}
          className="p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400"
        />

        {/* Password */}
        <label className={`text-sm select-none ${!errors.password ? "text-amber-950 dark:text-amber-500" : "dark:text-red-400 text-red-700"}`}>
          {!errors.password ? "Password" : errors.password?.message}
        </label>
        <input
          type="password"
          {...register("password", { minLength: { value: 6, message: "6 chars min" }, maxLength: { value: 32, message: "Max 32 chars" } })}
          className="p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400"
          placeholder="currentPassword"
        />

        {/* Role */}
        <label className={`text-sm select-none ${!errors.role ? "text-amber-950 dark:text-amber-500" : "dark:text-red-400 text-red-700"}`}>
          {!errors.role ? "Role" : errors.role?.message}
        </label>
        <select {...register("role")} className="p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400">
          <option value="" disabled>User Role</option>
          <option value="user">Basic User Account</option>
          <option value="admin">Administrator Account</option>
        </select>

        {/* Location */}
        <label className={`text-sm select-none ${!errors.location ? "text-amber-950 dark:text-amber-500" : "dark:text-red-400 text-red-700"}`}>
          {!errors.location ? "Location" : errors.location?.message}
        </label>
        <select {...register("location", { required: "Country selection required" })} className="p-1 w-70 rounded dark:bg-slate-950 dark:border-slate-800 bg-slate-300 border border-slate-400">
          <option value="" disabled>Country Selection</option>
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <Button
            buttonColor="dark:hover:bg-red-500/80 dark:bg-red-700/80 hover:bg-red-600 bg-red-700 text-slate-100"
            buttonText={<i className="bi bi-arrow-counterclockwise" />}
            buttonName={"Restore form"}
            title={"Restore original user data"}
            ratio={"flex px-2 items-center gap-1"}
            action={() => reset()}
          />
          <Button
            buttonColor="dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80 hover:bg-emerald-600 bg-emerald-700 text-slate-100"
            buttonText={getStatus("updateUser")?.isLoading ? <Loading ratio="text-sm" /> : <i className="bi bi-box-arrow-in-up" />}
            buttonName={"Update User"}
            title={"Confirm new data"}
            ratio={"flex px-2 items-center gap-1"}
            type="submit"
            disabled={getStatus("updateUser")?.isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CollectionUsersEdit;
