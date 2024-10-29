export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email: string }
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        <p className="text-muted-foreground">
          We sent a verification link to {searchParams.email}. 
          Please check your email and click the link to verify your account.
        </p>
      </div>
    </div>
  )
} 