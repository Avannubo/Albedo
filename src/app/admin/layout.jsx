import SideNav from '@/components/admin/nav/aside';

export default function layout({ children }) {
    return <section className='flex flex-col '>
        <div className=''>
            <SideNav />
            <div>
                {children}
            </div>
        </div>
    </section>
}