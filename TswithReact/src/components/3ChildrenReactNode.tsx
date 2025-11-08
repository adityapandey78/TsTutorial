import type { PropsWithChildren, ReactNode } from "react";

type PanelProps={
    title: string;
    children?:ReactNode
}

export function Panel({title,children}:PanelProps){

    return(
        <>
            <section>
                <h1>{title}</h1>
                <h1>{children??<em> No children Present!</em>}</h1>
            </section>
        </>
    )
}

interface RequiredChildrenProps extends PropsWithChildren{
    title:string;
    children:ReactNode
}

export function RequiredChildrenPanel({title,children}:RequiredChildrenProps){

    return(
        <>
            <section>
                <h1>{title}</h1>
                <h1>{children??<em> No children Present!</em>}</h1>
            </section>
        </>
    )
}

