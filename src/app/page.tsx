"use client";

import Header from "@/components/Header/Header";
import ReduxProvider from "@/providers/ReduxProvider";
import MainSection from "@/components/MainSection/MainSection";
import PersistGateProvider from "@/providers/ReduxGateProvider";

export default function Home() {

    return (
        <ReduxProvider>
            <PersistGateProvider>
                <Header></Header>
                <MainSection></MainSection>
            </PersistGateProvider>
        </ReduxProvider>
    )

}
