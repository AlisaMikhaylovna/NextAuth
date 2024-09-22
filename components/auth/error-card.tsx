"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Something go wrong"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"></ExclamationTriangleIcon>
            </div>
        </CardWrapper>
    );
}

