import SideNav from '@/app/components/aside';

export default function layout({ children }) {
    return <section className='flex flex-col '>
        <div className='ml-36'>
            <SideNav />
            <div>
                {children}
            </div>
        </div>
    </section>
}