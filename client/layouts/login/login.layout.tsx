import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FormInput, FormPasswordInput } from "components/form-input/form-input.component";
import { useForm } from "react-hook-form";
import { BlueBGButtonWide } from "components/CustomButtons/bluebg-button.component";
import { GoogleSigninButton } from "components/google-signin-button/google-signin-button.component";
import { loginWithEmailAndPassword } from "utils/auth.utils";
import { useAuth } from "hooks/auth.hook";
import { useRouter } from "next/dist/client/router";

type FormInputs = {
  email: string;
  password: string;
};

export const LoginLayout: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const authLoading = useAuth((state) => state.isLoading);
  const user = useAuth((state) => state.user);
  const router = useRouter();

  const onFormSubmit = async ({ email, password }: FormInputs): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user.uid) {
      router.push("/dashboard");
    }
  }, [user, authLoading]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3 flex">
        <section>
          <h1 className="font-extrabold text-4xl mb-4">Sign Up To Ency</h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <a className="text-blue-500 hover:underline">Sign Up</a>
            </Link>
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate={true} className="mt-5">
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Example@email.com"
              error={errors.email?.message}
              fref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message: "Invalid email",
                },
              })}
            />
            <FormPasswordInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
              fref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 6,
                  message: "Password should be atleast 6 characters long",
                },
              })}
            />

            <p className="text-sm text-blue-500 hover:underline float-right mb-10">
              Forgot Password?
            </p>

            <div className="mt-8 mb-4">
              {!isLoading ? (
                <BlueBGButtonWide type="submit">Sign In</BlueBGButtonWide>
              ) : (
                <BlueBGButtonWide>Loading...</BlueBGButtonWide>
              )}
            </div>
          </form>
          <GoogleSigninButton />
        </section>
      </div>
    </div>
  );
};
