"use client"

import CreateNewListing from "@/app/listing/CreateNewListing";
import ReduxProvider from "@/store/ReduxProvider";

export default function NewListing() {
    return (
        <ReduxProvider>
            <CreateNewListing/>
        </ReduxProvider>
    );
}


