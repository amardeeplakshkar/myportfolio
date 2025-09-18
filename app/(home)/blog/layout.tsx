import React from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import "./blog.css"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='max-w-6xl mx-auto px-2'>
            <HomeLayout {...baseOptions()} >
                {children}
            </HomeLayout>
        </div>
    )
}

export default layout