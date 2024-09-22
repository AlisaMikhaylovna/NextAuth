"use server";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid email!" };
    }
    const { email } = validatedFields.data;

    const exsitingUser = await getUserByEmail(email);

    if (!exsitingUser || !exsitingUser.email || !exsitingUser.password) {
        return { error: "Email does not exist!" };
    }

    const passwordResetToken = await generatePasswordResetToken(exsitingUser.email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    return { success: "Reset email sent!" }
};