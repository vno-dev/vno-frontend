
import TextType from '@/components/animates/text-typing';
import { Typography } from '@/components/common/typography';
import { Skating } from '@/components/illustrations';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-20 text-center  overflow-hidden">
            <div className="container mx-auto reveal active">
                <Typography variant="heading">
                    Write, plan, share.<br />
                    <span className="font-serif italic font-normal text-gray-400">With AI at the core.</span>
                </Typography>
                <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-tight">
                    Context is the connected workspace where better, faster work happens. Now with built-in intelligence.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Button className="rounded-lg shadow-sm group" variant="default" size="xxl">
                        Get VNO free
                        <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-all duration-300 ease-in-out" />
                    </Button>
                    <Button variant="ghost" size="xxl" className="rounded-lg">
                        Request a demo
                    </Button>
                </div>
            </div>

            {/* Main Product Frame - Large, centered, shadow-heavy */}
            <div className="container max-w-6xl relative reveal active" style={{ transitionDelay: '0.2s' }}>
                <div className="bg-white rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.06)] border border-gray-200 overflow-hidden relative">
                    <div className="h-10 bg-[#F7F7F5] border-b border-gray-200 flex items-center px-5 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#F5BF4F]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#61C554]"></div>
                        </div>
                    </div>
                    <div className="md:aspect-video bg-white p-4 md:p-12 text-left relative">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-start gap-3 md:gap-6 mb-12">
                                <div className="size-12 md:size-16 bg-gray-900 rounded-md md:rounded-2xl flex items-center justify-center text-white text-4xl font-black">C</div>
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-extrabold md:mb-2 tracking-tight">Project Home</h2>
                                    <p className="text-gray-400 font-medium text-sm md:text-base">Last edited by you 2 mins ago</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-10">
                                <div className="col-span-8 space-y-8">
                                    <TextType
                                        className="text-2xl font-bold text-foreground/80 mb-2 tracking-tight min-h-[92px]"
                                        text={["Ask questions, get summaries, and edit content across your entire workspace. AI that actually knows your work.", "Connected tasks, timelines, and status reports. Manage everything from high-level goals to daily tasks.", "A clean canvas for your best ideas. Embed data, videos, and interactive components with ease."]}
                                        typingSpeed={75}
                                        pauseDuration={1500}
                                        showCursor={true}
                                        cursorCharacter="|"
                                        startOnVisible={true}

                                    />

                                    {/* Todo blocks */}
                                    <h4 className="text-xl font-bold text-foreground/80 mb-2 tracking-tight mt-6">Make it yours</h4>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li><b>Select text</b> to reveal a floating toolbar: </li>
                                        <li className='italic'>Quickly italicize, <span className='text-blue-500'>color</span>, add <span className='text-purple-500 underline'>links</span>, or highlight text just as you&apos;re used to..</li>
                                        <li><b>Hover near any block</b> to reveal the context handle <span className='w-fit inline-flex items-center rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>⠿</span></li>
                                        <li className='italic'>Click to open the context menu (duplicate, delete, reset formatting, and more) or simply drag to move your content anywhere you like!</li>
                                        <li>Mention teammates with <span className='w-fit inline-flex items-center rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>@</span> and add some fun with emoji <span className='w-fit inline-flex items-center rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>:</span>  🥳</li>
                                        <li>Switch between ☀ light and 🌑 dark mode – whatever fits your mood.</li>
                                    </ul>
                                    {/* Typing hint */}
                                    <div className="text-gray-400 italic">
                                        Type <span className="font-mono">/</span> to insert blocks…
                                    </div>
                                </div>
                                <div className="col-span-4 space-y-4">
                                    <Skating className='size-full' />
                                </div>

                            </div>
                        </div>
                        <div className="absolute z-10 flex flex-col gap-3 items-end right-6 top-1/2 -translate-y-1/2">
                            <div className='bg-primary/20 h-0.5 rounded-full w-4' />
                            <div className='bg-primary/20 h-0.5 rounded-full w-3.5' />
                            <div className='bg-primary h-0.5 rounded-full w-3.5' />
                            <div className='bg-primary/20 h-0.5 rounded-full w-3.5' />
                            <div className='bg-primary/20 h-0.5 rounded-full w-4' />
                            <div className='bg-primary/20 h-0.5 rounded-full w-3.5' />
                            <div className='bg-primary/20 h-0.5 rounded-full w-4' />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;
