
import { VNOLogo } from '@/components/icons';
import React from 'react';

const AppFooter: React.FC = () => {
    const links = [
        { title: 'Product', items: ['Features', 'Templates', 'API', 'Releases'] },
        { title: 'Philosophy', items: ['Long-termism', 'Privacy', 'Security', 'Open Data'] },
        { title: 'Resources', items: ['Help Center', 'Community', 'Case Studies', 'Blog'] },
        { title: 'Company', items: ['About', 'Careers', 'Brand', 'Contact'] },
    ];

    return (
        <footer className="bg-white py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-20">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <VNOLogo className='size-8' />
                            <span className="font-semibold text-lg tracking-tight">VNO Studio</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                            A home for your thoughts and the systems that power them.
                        </p>
                    </div>

                    {links.map((group) => (
                        <div key={group.title}>
                            <h5 className="text-sm font-semibold mb-6 text-gray-900">{group.title}</h5>
                            <ul className="space-y-4">
                                {group.items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} VNO Studio Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Twitter</a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-900">GitHub</a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-900">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
