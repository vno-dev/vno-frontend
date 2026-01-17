'use client'

import { Menu } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

import VnoLogo from '@/components/icons/logos/vno-logo'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const menuItems = [
    { label: 'Product', href: '#' },
    { label: 'Download', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
]

export default function AppHeader() {
    const { scrollY } = useScroll()

    // numeric motion values
    const backgroundOpacity = useTransform(scrollY, [0, 80], [0.4, 0.85])
    const blur = useTransform(scrollY, [0, 80], [8, 16])
    const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.15])
    const height = useTransform(scrollY, [0, 80], [72, 56])

    // string transforms (Motion v12 way)
    const backdropFilter = useTransform(
        blur,
        v => `blur(${v}px)`
    )

    const backgroundColor = useTransform(
        backgroundOpacity,
        v => `rgba(255,255,255,${v})`
    )

    const boxShadow = useTransform(
        shadowOpacity,
        v => `0 1px 0 rgba(0,0,0,${v})`
    )

    return (
        <>
            <motion.header
                style={{
                    height,
                    backdropFilter,
                    backgroundColor,
                    boxShadow,
                }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="container flex h-full items-center justify-between">
                    <VnoLogo className="size-8" />

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {menuItems.map(item => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(buttonVariants({ variant: 'ghost' }))}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop auth */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ variant: 'ghost' }))}
                        >
                            Login
                        </Link>
                        <Link
                            href="/sign-up"
                            className={cn(buttonVariants({ variant: 'default' }))}
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                className="md:hidden p-2"
                                aria-label="Open menu"
                                variant="ghost"
                                size="icon-lg"
                            >
                                <Menu />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-full flex flex-col gap-6 p-4"
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    <VnoLogo className="size-8" />
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-1">
                                {menuItems.map(item => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            'justify-start'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className={cn(buttonVariants({ variant: 'ghost' }), "flex-1")}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className={cn(buttonVariants({ variant: 'default' }), "flex-1")}
                                >
                                    Register
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.header>

            {/* Spacer */}
            {/* <div className="h-[72px]" /> */}
        </>
    )
}
