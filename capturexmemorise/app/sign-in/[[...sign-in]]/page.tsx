import { SignIn } from "@clerk/nextjs";

export default function Page() {
  <div className="flex justify-center items-center min-h-[100vh] p-2 rounded-lg text-center">
    <SignIn forceRedirectUrl="/gallery" />
  </div>;
}
