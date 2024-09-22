"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
    const route = useRouter();
    const serachParams = useSearchParams();
    const urlError = serachParams.get("error") === "OAuthAccountNotLinked" ? "Email already is in use" : "";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).then(data => {
                if (!data) {
                    route.push(DEFAULT_LOGIN_REDIRECT);
                } else {
                    setError(data.error);
                    setSuccess(data.success);
                }
            }
            )
        });
    };
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/register"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};