import React from 'react'
import SS from "../../public/SS.png"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Navbar() {
  return (
    <>
      <nav className="inset-x-0 top-0 z-50 shadow-lg dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex h-14 items-center">
            <div className="mr-auto flex items-center gap-2 text-lg font-semibold" >
              <span>TraverseViz</span>
            </div>
            <nav className="ml-auto flex items-center space-x-4">
              <div

                className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"

              >
                <Dialog className="overflow-scroll">
                  <DialogTrigger>Instructions to Use</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>How to Use?</DialogTitle>

                    </DialogHeader>
                    <DialogDescription>
                      <div>
                        <img src={SS} alt="" srcset="" />
                        <ul>
                          <li>Add Nodes:

                            Click anywhere on the page to create a node. Each click will place a new node at the clicked location.
                          </li><br />
                          <li>Select Nodes:
                            Click on a node to select it. You can select a second node to form an edge. Selected nodes will change appearance (e.g., color).

                          </li><br />
                          <li>Input Edge Weight:

                            After selecting two nodes, an input box appears. This is where you can enter the weight for the edge connecting the selected nodes.
                          </li><br />
                          <li>Submit Edge Weight:

                            Once you've entered the weight, click a button to submit it. This creates an edge between the two nodes with the specified weight.
                          </li><br />
                          <li>Delete: You can delete a node by double clicking it.</li>
                        </ul>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
              <div

                className="font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"

              >

                <a href="http://mapur2.github.io/new_portfolio" className="rounded-md border
                     border-input bg-background hover:bg-accent
                      hover:text-accent-foreground h-10 px-4 py-2 bg-black
                       text-white" target="_blank" rel="noopener noreferrer">Made With 💖 by Rupam</a>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
