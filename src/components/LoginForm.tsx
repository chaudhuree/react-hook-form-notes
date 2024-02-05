import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function LoginForm() {
  const { register, control, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  // typescript types
  type FormValues = {
    username: string;
    email: string;
    channel: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />
          {<p className="error">{errors.username?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
              required: {
                value: true,
                message: "email is required",
              },
            })}
          />
          {<p className="error">{errors.email?.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel is required",
              },
            })}
          />
          {<p className="error">{errors.channel?.message}</p>}
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default LoginForm;
