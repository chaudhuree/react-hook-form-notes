import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function LoginForm() {
  const { register,control,handleSubmit } = useForm<FormValues>();
  // typescript types
  type FormValues = {
    username: string;
    email: string;
    channel: string;
  };

  const onSubmit = (data:FormValues) => {
    console.log(data);
  };
  
  return (
    <div>
    <h1>Login Form</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username"  {...register("username")}/>

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="channel">Channel</label>
      <input type="text" id="channel"{...register("channel")} />

      <button>Submit</button>
    </form>
    <DevTool control={control}/>
  </div>
  )
}

export default LoginForm