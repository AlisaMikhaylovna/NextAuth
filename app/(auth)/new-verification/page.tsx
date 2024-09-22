import { NewVerificatiomForm } from "@/components/auth/new-verification-form"
import { Suspense } from "react";

const NewVerificationPage = () => {
    return (
        <Suspense>
            <NewVerificatiomForm />
        </Suspense>
    );
}

export default NewVerificationPage;