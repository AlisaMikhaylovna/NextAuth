"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificatiomForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token");
            return;
        }

        newVerification(token).then(data => {
            setError(data.error);
            setSuccess(data.success);
        }).catch(() => {
            setError("Something went wrong");
        })
    }, [token]);

    useEffect(() => { onSubmit(); }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirm your verification"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="flex w-full items-center justify-center">
                {!success && !error && (<BeatLoader />)}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    );
};


