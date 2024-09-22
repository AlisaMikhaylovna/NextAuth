"use server"

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import bcrypt from "bcryptjs";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) return { error: "Missing token" };

    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid password!" };
    }
    const { password } = validatedFields.data;

    const exsitingToken = await getPasswordResetTokenByToken(token);
    if (!exsitingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(exsitingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const exsitingUser = await getUserByEmail(exsitingToken.email);

    if (!exsitingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {
            id: exsitingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: exsitingToken.email,
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: { id: exsitingToken.id }
    });

    return { success: "Password update!" };

};

