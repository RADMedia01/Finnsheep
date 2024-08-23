import ResetPasswordForm from '@/app/ui/resetPasswordForm/resetPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ResetPasswordPage = ({params}) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
  <CardHeader>
    <CardTitle className="text-2xl">Reset Password</CardTitle>
    <CardDescription>{"Enter your new password below and click save when you're done."}</CardDescription>
  </CardHeader>
  <CardContent>
      <ResetPasswordForm resetToken={params.resetToken}/>
  </CardContent>
  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
</Card>

    </div>
  )
}

export default ResetPasswordPage