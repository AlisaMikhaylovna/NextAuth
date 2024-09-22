"use server"

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const exsitingToken = await getVerificationTokenByToken(token);
    if (!exsitingToken) {
        return { error: "Token does not exist!" };
    }
    const hasExpired = new Date(exsitingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired!" };
    }
    const exsitingUser = await getUserByEmail(exsitingToken.email);

    if (!exsitingUser) {
        return { error: "User does not exist!" };
    }

    await db.user.update({
        where: {
            id: exsitingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: exsitingToken.email
        }
    })

    await db.verificationToken.delete({
        where: { id: exsitingToken.id }
    });

    return { success: "Email verified!" };
}