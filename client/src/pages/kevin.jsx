import { useEffect, useRef, useState } from "react"
import axios from "axios";

export default function Kevin() {
    const isMounted = useRef(false)
    useEffect(() => {
        if (!isMounted.current) {
            axios.post(`http://localhost:3000`, 
                {
                    id: 2, // id is the primary column. Each row needs a unique number.
                    info: "message"
                }
            )
            axios.get(`http://localhost:3000`).then((res) => {
                console.log(res)
                //console.log(res.data)
            })
        }
        isMounted.current = true;
    }, [])

    return(
        <>
        <h1>This is Kevin's page</h1>
        </>
    )
}