const VARIANT=['primary','secondary','ghost']as const
type Variants=(typeof VARIANT)[number];


type BadgeProps={
    label:string;
    variant?:Variants;
}

export function Badge({label,variant='primary'}:BadgeProps){
    const styles: Record<Variants,React.CSSProperties>={
        primary:{
            color:'red'
        },
        secondary:{
            color:'yellow'
        },
        ghost:{
            color:'green'
        }
    }

    return (
        <>
        <span style={styles[variant]}>{label}</span>
        </>
    )
}