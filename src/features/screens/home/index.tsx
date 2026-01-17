import AppFooter from "@/components/layouts/app-footer";
import AppHeader from "@/components/layouts/app-header";
import {
    HomeScreenHero,
    HomeScreenIntroduce,
    HomeScreenTrusted
} from "./components";

const HomePageScreen = () => {
    return (
        <>
            <AppHeader />
            <main>
                <HomeScreenHero />
                <HomeScreenTrusted />
                <HomeScreenIntroduce />
            </main>
            <AppFooter />
        </>
    );
};

export default HomePageScreen;
