import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}

export default LoginPage; 