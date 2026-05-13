import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { login } from "./actions";

type LoginSearchParams = {
  error?: string | string[];
  message?: string | string[];
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-950/10 bg-white/70 px-4 py-3 text-sm text-zinc-950 outline-none shadow-sm transition placeholder:text-zinc-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950";

const labelClass = "text-sm font-medium text-zinc-800 dark:text-zinc-200";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 py-12 transition-colors dark:bg-zinc-950">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-colors dark:bg-zinc-900 dark:shadow-black/40">
        <section className="flex w-full flex-col justify-center px-6 py-12 text-black transition-colors dark:text-zinc-50 sm:px-12 md:w-3/5 lg:px-16">
          <Link href="/" className="mb-8 inline-flex w-fit self-center">
            <span className="sr-only">Tap Task</span>
            <Image
              alt="Tap Task"
              src="/assets/logo.png"
              width={160}
              height={80}
              className="h-auto w-40"
              priority
            />
          </Link>

          <p className="mb-3 text-3xl font-bold text-blue-500">
            Sign in to your account
          </p>
          <div className="mb-2 inline-block w-10 border-2 border-blue-700"></div>

          <form action={login} className="mt-6 space-y-5">
            {error ? (
              <div className="flex gap-3 rounded-lg border border-rose-500/20 bg-rose-50/80 p-3 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-950/40 dark:text-rose-200">
                <ExclamationCircleIcon
                  className="mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                <p>{error}</p>
              </div>
            ) : null}

            {message ? (
              <div className="flex gap-3 rounded-lg border border-teal-500/20 bg-teal-50/80 p-3 text-sm text-teal-800 dark:border-teal-400/20 dark:bg-teal-950/40 dark:text-teal-100">
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
              className="mt-2 w-full rounded-full border border-blue-500 bg-blue-500 px-12 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-950/20 transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:shadow-black/30 dark:hover:bg-blue-400 dark:hover:text-zinc-950"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400 md:hidden">
            Need an account?{" "}
            <Link className="font-semibold text-blue-600" href="/registration">
              Register
            </Link>
          </p>
        </section>

        <section className="hidden w-2/5 flex-col items-center justify-center bg-blue-500 px-10 py-20 text-center text-white transition-colors dark:bg-blue-600 md:flex">
          <p className="mb-3 text-3xl font-bold">Register</p>
          <div className="mb-4 inline-block w-10 border-2 border-white"></div>
          <p className="text-sm leading-6 text-blue-50">
            Create an account to manage tasks, track progress, and get into
            your dashboard.
          </p>
          <Link
            href="/registration"
            className="mt-8 w-full rounded-full border border-white bg-white px-12 py-3 text-center text-sm font-semibold text-blue-500 shadow-lg shadow-zinc-950/20 transition hover:bg-blue-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-zinc-950 dark:text-blue-100 dark:shadow-black/30 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            Register
          </Link>
        </section>

      </div>
    </main>
  );
}
