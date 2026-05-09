import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  FingerPrintIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { login, register } from "./actions";

type LoginSearchParams = {
  error?: string | string[];
  message?: string | string[];
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-950/10 bg-white/65 px-4 py-3 text-sm text-zinc-950 outline-none shadow-sm transition placeholder:text-zinc-500 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/15";

const labelClass = "text-sm font-medium text-zinc-800";

function getSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<LoginSearchParams>;
}) {
  const params = await searchParams;
  const error = getSearchParam(params.error);
  const message = getSearchParam(params.message);

  return (
    <main className="flex flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
      
        <div className="w-3/5 p-5 bg-white text-black rounded-2xl flex flex-col items-center justify-center py-36 px-12">
        <div className="text-left font-bold mb-2">
            <a href="#" className="-m-1.5 p-1.5">
              <img alt="Tap Task" src="./assets/logo.png" className="h-20 w-auto" />
            </a>
      </div>
          <p className="text-3xl font-bold mb-3 text-blue-500">Sign in to your account</p>

          <div className="border-2 w-10 border-blue-700 inline-block mb-2"></div>
          <form action="login">
            {error ? (
              <div className="mt-6 flex gap-3 rounded-lg border border-rose-500/20 bg-rose-50/80 p-3 text-sm text-rose-700">
                <ExclamationCircleIcon
                  className="mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                <p>{error}</p>
              </div>
            ) : null}

            {message ? (
              <div className="mt-6 flex gap-3 rounded-lg border border-teal-500/20 bg-teal-50/80 p-3 text-sm text-teal-800">
                <CheckCircleIcon
                  className="mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                <p>{message}</p>
              </div>
            ) : null}

            <div>
              <label className={labelClass} htmlFor="login-email">
                Email address
              </label>
              <input
                className={inputClass}
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="emailaddress@example.com"
                required 
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="login-password">
                Password
              </label>
              <input
                className={inputClass}
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>


            <button
              type="submit"
              className=" mt-4 bg-blue-500 text-white py-3 px-12 rounded-full group w-full gap-2 text-sm font-semibold shadow-lg shadow-zinc-950/20 transition
              hover:bg-white hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 border-white"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-2/5 p-5 bg-blue-500 text-white rounded-2xl flex flex-col items-center justify-center py-36 px-12">
          <p className="text-3xl font-bold mb-3">Register</p>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-2">Fill up the form to create an account</p>
        </div>
      </div>
    </main>
  );
}
