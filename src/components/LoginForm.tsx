import { DevTool } from "@hookform/devtools";
import { useFieldArray, useForm } from "react-hook-form";

function LoginForm() {
  // typescript types
  type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
      facebook: string;
      twitter: string;
    };
    phone: string[];
    address: {
      street: string;
      city: string;
    }[];
    age: number;
    dateOfBirth: Date;
  };
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phone: ["", ""],
      address: [
        {
          street: "",
          city: "",
        },
      ],
      age: 0,
      dateOfBirth: new Date(),
    },
  });
  const { errors } = formState;

  // dynamic form fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });

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
              validate: (value) =>
                value !== "admin@mail.com" || "this email is not supported!",
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
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>
        <div className="form-control">
          <label htmlFor="primary">Primary number</label>
          <input type="text" id="primary" {...register("phone.0")} />
        </div>
        <div className="form-control">
          <label htmlFor="secondary">Secondary number</label>
          <input type="text" id="secondary" {...register("phone.1")} />
        </div>
        {/* dynamic field */}
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="my-10 d-flex">
              <div className="form-control ">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  {...register(`address.${index}.street` as const)}
                  defaultValue={field.street}
                />
              </div>
              <div className="form-control ">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  {...register(`address.${index}.city` as const)}
                  defaultValue={field.city}
                />
              </div>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
          {/* add new field */}
          <button
            type="button"
            onClick={() => {
              append({ street: "", city: "" });
            }}
          >
            Add Address
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
              min: {
                value: 18,
                message: "you should be 18 or older",
              },
            })}
          />
          {<p className="error">{errors.age?.message}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "date of birth is required",
              },
              validate: (value) => {
                const date = new Date(value);
                return date < new Date() || "date of birth should be in the past";
              },
            })}
          />
          {<p className="error">{errors.dateOfBirth?.message}</p>}
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default LoginForm;
