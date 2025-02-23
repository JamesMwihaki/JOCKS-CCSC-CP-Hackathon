import { useEffect, useRef, useState } from "react"
import axios from "axios";

export default function Kevin() {
    const isMounted = useRef(false)
    useEffect(() => {
        if (!isMounted.current) {
            axios.post(`http://localhost:3000/buildings`, 
                {
                    id: 11, // id is the primary column. Each row needs a unique number.
                    buildings_locations: "building",
                    departments: ["department1", "department2", "department3"],
                    description: "text description"
                }
            )
            axios.get(`http://localhost:3000/buildings/all`).then((res) => {
                console.log(res)
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