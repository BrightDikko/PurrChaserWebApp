import {type Metadata} from 'next'
import React from "react";
import CategoryLayout from "@/app/categories/[category]/CategoryLayout";

export const metadata: Metadata = {
    title: 'Category',
}

export default function Categories({params}: { params: { category: string } }) {
    return <CategoryLayout category={params.category}/>
}


