"use client"
import { useRouter } from 'next/navigation';
import cookies from 'js-cookie';

export default function welcomeToAdmin() {
  const router = useRouter();

  setTimeout(() => {
    const token = cookies.get('token');
    console.log('token: ' + JSON.stringify(token));
    if (!token) {
      router.push('/admin');
    } else {
      router.push('/admin/ListProducts');
    }
  }, 3000);
}
