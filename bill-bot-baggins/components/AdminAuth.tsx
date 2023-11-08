'use client';

import React, { useState } from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginFormSchema } from '@/lib/validations/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminAuth({ className, ...props }: UserAuthFormProps) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    if (!isLoaded) {
      return null;
    }

    try {
      setIsSubmitting(true);
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === 'complete') {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push('/admin');
      } else {
        console.log(result);
      }
    } catch (err: any) {
      setIsSubmitting(false);
      console.error('error', err.errors[0].longMessage);
    }
  }

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete='current-email'
                  placeholder='admin@billbotbaggins.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete='current-password'
                  type='password'
                  placeholder='********'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full transition-all active:scale-95' type='submit'>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
