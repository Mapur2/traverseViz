import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import React, { useState } from 'react'

function Edit({ nodeCount, handleStart, onAlgoChange, algo, started }) {
    const [starting, setStart] = useState(0)
    function handleClick() {
        handleStart(starting)
    }
    return (
        <div className="z-0 relative p-8 shadow-lg flex flex-col justify-between">
            <div className=" flex justify-evenly align-middle ">
                <div>
                    <p>Number of Nodes: {nodeCount}</p>
                </div>
                <div>
                    <p>Algorithm</p>
                    <select
                        className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                        value={algo}
                        onChange={e => onAlgoChange && onAlgoChange(e.target.value)}
                    >

                        <option value="BFS">BFS</option>
                        <option value="DFS">DFS</option>
                        <option value="Dijkstra">Dijkstra</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Starting Node:</label><br />
                    <input
                        type="number"
                        value={starting}
                        onChange={(e) => setStart(e.target.value)}
                        placeholder="Enter Starting Index"
                        className=" outline"
                    />
                </div>
                <div>
                    <button className={`rounded-md border
                     border-input bg-background hover:bg-accent
                      hover:text-accent-foreground h-10 px-4 py-2 bg-black
                       text-white ${started ? "bg-gray-100" : ""}`} onClick={handleClick} disabled={started}>
                        Start
                    </button>
                </div>
                <div>
                    <button className={`rounded-md border
                     border-input bg-background hover:bg-accent
                      hover:text-accent-foreground h-10 px-4 py-2 bg-black
                       text-white ${started ? "bg-gray-100" : ""}`} disabled={started} onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                </div>
            </div>
            <div className=" flex justify-evenly flex-wrap">
                <div>
                    <div className="bg-yellow-400 rounded-full w-4 h-4"></div>
                    Normal Node
                </div>
                <div>
                    <div className="bg-purple-500 rounded-full w-4 h-4"></div>
                    Starting Node
                </div>
                <div>
                    <div className="bg-green-500 rounded-full w-4 h-4"></div>
                    Visited Node
                </div>
                <div>
                    <div className="bg-orange-500 rounded-full w-4 h-4"></div>
                    Edge Colour
                </div>
                <div>
                    <div className="bg-cyan-400 rounded-full w-4 h-4"></div>
                    Edge Traversed
                </div>

            </div>
            {/*   <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Select Algorithm</CardDescription>
                </CardHeader>
                <CardContent>


                </CardContent>
                <CardContent>
                    <select
                        className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                        value={algo}
                        onChange={e => onAlgoChange && onAlgoChange(e.target.value)}
                    >
                        <option value="Dijkstra">Dijkstra</option>
                        <option value="BFS">BFS</option>
                        <option value="DFS">DFS</option>
                    </select>
                </CardContent>
                <CardContent>
                    <label htmlFor="">Starting Node:</label><br />
                    <input
                        type="number"
                        value={starting}
                        onChange={(e) => setStart(e.target.value)}
                        placeholder="Enter Starting Index"
                        className=" outline"
                    />
                </CardContent>
                <CardContent>
                   
                </CardContent>

            </Card> */}
        </div>
    )
}

export default Edit
