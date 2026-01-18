'use client'
import { agentWorkspaces, askTogent, bento_bg, moutain } from "@/assets/images";
import { Typography } from "@/components/common/typography";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionVideo } from "@/hooks/use-intersection-video";
import agentTutorial from '@/videos/agent-tutorial.mp4';
import { ArrowRight } from "lucide-react";
import BackgroundVideo from 'next-video/background-video';
import Image from "next/image";

const introduceItems = [
    {
        title: "Hand off your busywork",
        description:
            "What used to take days in minutes. Tell it your goal and watch it work.",
    },
    {
        title: "Collaborates with your team",
        description:
            "It's like having a built-in power user that works alongside your team.",
    },
    {
        title: "Knows everything you know",
        description:
            "Searches all your pages, messages, files, and the web to surface exactly what you need.",
    },
    {
        title: "Personalized to you",
        description: "Your Agent learns how you work. You control everything from how it behaves to how it looks.",
    },
];
const Introduce = () => {
    const { containerRef, videoRef } = useIntersectionVideo({
        threshold: 0.5,
    });
    return (
        <div className="bg-muted">
            <section className="container py-10 space-y-10">
                <Typography variant="h1">Introducing VNO</Typography>
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden md:h-[550px]">
                    <div className="col-span-12 md:col-span-4 p-6 h-full">
                        <div className="flex flex-col justify-between h-[calc(100%-56px)]">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Typography>Notion Agent</Typography>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                                        New
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="large" className="font-bold text-2xl max-w-[90%]">
                                        Your assign the tasks. Your VNO Agent does the work.
                                    </Typography>
                                    <Button variant="default" className="rounded-full flex md:hidden" size="icon-sm">
                                        <ArrowRight className="size-5" />
                                    </Button>
                                </div>
                                <Button variant="default" className="rounded-full hidden md:flex" size="icon-sm">
                                    <ArrowRight className="size-5" />
                                </Button>
                            </div>
                            <Accordion type="single" collapsible>
                                {
                                    introduceItems.map((item, index) => (
                                        <AccordionItem value={`item-${index}`} key={index} className="last:border-none">
                                            <AccordionTrigger className="hover:no-underline text-base [&_svg]:hidden">{item.title}</AccordionTrigger>
                                            <AccordionContent className="text-base text-muted-foreground">{item.description}</AccordionContent>
                                        </AccordionItem>
                                    ))
                                }
                            </Accordion>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="relative pl-6 pt-6" ref={containerRef} style={{
                            backgroundImage: `url(${moutain.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                        }}>
                            <div className="bg-white w-full h-full rounded-tl-lg overflow-hidden">
                                <BackgroundVideo src={agentTutorial} ref={videoRef} muted
                                    loop
                                    playsInline />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden md:h-[300px]">
                    <div className="col-span-12 md:col-span-4 p-6 h-full">
                        <div className="flex flex-col justify-between h-[calc(100%-56px)]">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Typography>Custom Agent</Typography>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                                        Comming soon
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="large" className="font-bold text-2xl max-w-[90%]">
                                        Automate repetitive tasks
                                    </Typography>
                                    <Button variant="default" className="rounded-full flex md:hidden" size="icon-sm">
                                        <ArrowRight className="size-5" />
                                    </Button>
                                </div>
                                <Button variant="default" className="rounded-full hidden md:flex" size="icon-sm">
                                    <ArrowRight className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="relative h-full pl-6 pt-6 bg-[#78736f]" >
                            <div className="grid grid-cols-2 w-full h-full">
                                <div className="relative min-h-[200px] rounded-tl-lg overflow-hidden mt-16 border-r">
                                    <Image src={askTogent} alt="ask-to-agent" fill className="object-cover object-top-left" />
                                </div>
                                <div className="relative min-h-[200px] rounded-tl-lg overflow-hidden">
                                    <Image src={agentWorkspaces} alt="agent-workspaces" fill className="object-cover object-top-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden md:h-[500px]">
                        <div className="p-6">
                            <div className="flex flex-col justify-between h-[calc(100%-56px)]">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Typography>Enterprise Search</Typography>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Typography variant="large" className="font-bold text-2xl max-w-[90%]">
                                            One search for everything
                                        </Typography>
                                        <Button variant="default" className="rounded-full" size="icon-sm">
                                            <ArrowRight className="size-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-full bg-[#f77463] pt-6 px-6" >
                            <div className="relative h-full min-h-[200px] w-full rounded-tl-lg overflow-hidden">
                                <Image src={agentWorkspaces} alt="agent-workspaces" fill className="object-cover object-top-left" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden md:h-[500px]">
                        <div className="p-6">
                            <div className="flex flex-col justify-between h-[calc(100%-56px)]">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Typography>AI Meeting Notes</Typography>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Typography variant="large" className="font-bold text-2xl max-w-[90%]">
                                            Perfect notes, every time
                                        </Typography>
                                        <Button variant="default" className="rounded-full" size="icon-sm">
                                            <ArrowRight className="size-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-full bg-[#62aef0] pt-6 px-6" >
                            <div className="relative h-full min-h-[200px] w-full rounded-tl-lg overflow-hidden">
                                <Image src={agentWorkspaces} alt="agent-workspaces" fill className="object-cover object-top-left" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden md:h-[300px]">
                    <div className="col-span-12 md:col-span-4 p-6 h-full">
                        <div className="flex flex-col justify-between h-[calc(100%-56px)]">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Typography>Flexible workflows</Typography>

                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography variant="large" className="font-bold text-2xl max-w-[90%]">
                                        Manage any project, big or small.
                                    </Typography>
                                    <Button variant="default" className="rounded-full flex md:hidden" size="icon-sm">
                                        <ArrowRight className="size-5" />
                                    </Button>
                                </div>
                                <Button variant="default" className="rounded-full hidden md:flex" size="icon-sm">
                                    <ArrowRight className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="relative h-full pl-6 pt-6" style={{
                            backgroundImage: `url(${bento_bg.src})`,
                            backgroundSize: "cover",
                            objectPosition: "top-left",
                            backgroundRepeat: "no-repeat",
                        }} >
                            <div className="grid grid-cols-2 w-full h-full">
                                <div className="relative min-h-[200px] rounded-tl-lg overflow-hidden mt-16 border-r">
                                    <Image src={askTogent} alt="ask-to-agent" fill className="object-cover object-top-left" />
                                </div>
                                <div className="relative min-h-[200px] rounded-tl-lg overflow-hidden">
                                    <Image src={agentWorkspaces} alt="agent-workspaces" fill className="object-cover object-top-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12">
                    <figure className="flex flex-col items-center gap-2 text-center max-w-2xl">
                        <blockquote className="relative">
                            <p
                                className="
          relative
          text-3xl md:text-4xl
          font-medium
          leading-snug
          text-foreground
          before:content-['“']
          after:content-['”']
          before:absolute
          after:absolute
          before:-left-7
          after:-right-7
          before:top-0
          after:top-0
          before:text-5xl
          after:text-5xl
          before:font-serif
          after:font-serif
          before:text-muted-foreground/40
          after:text-muted-foreground/40
          font-serif
        "
                            >
                                Your AI everything app.
                            </p>
                        </blockquote>

                        <figcaption className="text-3xl font-bold font-serif">
                            Forbes
                        </figcaption>
                    </figure>
                </div>

            </section>
        </div>
    );
};

export default Introduce;
