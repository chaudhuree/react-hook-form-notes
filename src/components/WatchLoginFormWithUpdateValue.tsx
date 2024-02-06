import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  // typescript types
  type FormValues = {
    username: string;
  };
  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm({
      defaultValues: {
        username: "",
        image: null,
        imgURL: "",
      },
    });
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
   // watch form values using callback function and update value
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(`watched value: ${JSON.stringify(value)}`);
      // for image, suppose we have two field one is image and other is imgURL
      // so when user select image then image field will have image 
      // then using this useEffect we can watch the image and upload it in cloudinary
      // then update the imgURL field with the cloudinary image URL
      if (value.image !== null) {
        // upload image to cloudinary
        // then update the imgURL field
        setValue("imgURL", "cloudinary image URL");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  // watch form values
  const watchAll = watch();
  const watchUsername = watch("username");

  return (
    <div>
      <h1>Login Form :</h1>

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

        <button>Submit</button>
      </form>

      <div>
        <p>watchAll: {JSON.stringify(watchAll)}</p>
        <p>watchUsername: {JSON.stringify(watchUsername)}</p>
      </div>

      <DevTool control={control} />
    </div>
  );
}

export default LoginForm;
