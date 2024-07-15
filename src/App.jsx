import React, { useState } from 'react';
import './App.css';
import Navbar from './myComps/Navbar';
import Edit from './myComps/Edit';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const App = () => {
  const [points, setPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const [weight, setWeight] = useState(1);
  const [result, setResult] = useState([])
  const [algo, setAlgo] = useState("BFS")
  const [started, setStarted] = useState(false)

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const index = points.length
    setPoints([...points, { x, y, index }]);
  };

  const handleNodeClick = (index) => {
    if (selectedPoints.includes(index)) {
      setSelectedPoints(selectedPoints.filter(i => i !== index));
    }
    else if (selectedPoints.length < 2) {
      setSelectedPoints([...selectedPoints, index]);
    }
  };

  const handleWeightSubmit = () => {
    if (weight <= 0)
      return;
    if (selectedPoints.length === 2 && weight) {
      const newEdge = {
        start: selectedPoints[0],
        end: selectedPoints[1],
        weight: Number(weight)
      };
      setEdges([...edges, newEdge]);
      setSelectedPoints([]);
      setWeight(1);
    }
  };
  /**
   * Delete Unwanted Nodes 
   */
  const deleteNode = (index) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);

    const newEdges = edges.filter(edge => edge.start !== index && edge.end !== index)
      .map(edge => ({
        ...edge,
        start: edge.start > index ? edge.start - 1 : edge.start,
        end: edge.end > index ? edge.end - 1 : edge.end
      }));

    setEdges(newEdges);
    setSelectedPoints([]);
  };

  /**
   * Renders edges
   */
  const renderLines = () => {
    return edges.map(({ start, end, weight }, index) => {
      const startPoint = points[start];
      const endPoint = points[end];

      const deltaX = endPoint.x - startPoint.x;
      const deltaY = endPoint.y - startPoint.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      return (
        <div key={`line-${index}`} style={{ position: 'absolute' }} >
          <div
            className="line rainbow"
            id={`line-${startPoint.index}-${endPoint.index}`}
            style={{
              left: startPoint.x + 10 + 'px',
              top: startPoint.y + -220 + 'px',
              width: distance + 'px',
              transform: `rotate(${angle}deg)`,
            }}
          />
          <div
            className="weight"
            style={{
              left: (startPoint.x + endPoint.x) / 2 + 'px',
              top: (startPoint.y + endPoint.y) / 2 - 230 + 'px',
            }}
          >
            {weight}
          </div>
        </div>
      );
    });
  };

  //Nodes
  const renderPoints = () => {
    return points.map((point, index) => (
      <div
        key={`point-${index}`}
        id={`point-${index}`}
        className={`myElement ${selectedPoints.includes(index) ? 'selected' : ''}`}
        style={{
          left: point.x - 10 + 'px', // Adjusting to center the element at the click
          top: point.y - 230 + 'px', // Adjusting to center the element at the click
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleNodeClick(index);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          deleteNode(index)
        }}
      >
        {index}
      </div>
    ));
  };

  const minVertice = (d, vs, n) => {
    let i, ind = 0, min = Infinity;
    for (i = 0; i < n; i++) {
      if (!vs[i] && d[i] <= min) {
        ind = i;
        min = d[i];
      }
    }
    return ind;
  }

  const delay = () => {
    return new Promise(res =>
      setTimeout(
        res, 1500)
    )
  }

  const handleStart = async (startIndex) => {
    if (startIndex >= points.length) {
      setResult(["Node not present"])
      return
    }
    setResult([])
    setStarted(true)
    startIndex = Number(startIndex)
    let n = points.length
    let g = [];

    // Loop to initialize 2D array elements.
    for (let i = 0; i < n; i++) {
      g[i] = [];
      let uNode = document.getElementById(`point-${i}`)
      uNode.classList.remove("bg-green-500")
      uNode.classList.remove("borderEle")
      uNode.classList.remove("bg-purple-500")
      for (let j = 0; j < n; j++) {
        g[i][j] = 0
        let iLine = document.getElementById(`line-${j}-${i}`)
          if (iLine == null)
            iLine = document.getElementById(`line-${i}-${j}`)
          if (iLine == null)
            continue
        iLine.classList.remove("bg-cyan-500")
      }
    }
    edges.forEach(({ start, end, weight }) => {
      g[start][end] = Number(weight)
      g[end][start] = Number(weight)
    })
    if (algo == "Dijkstra") {
      await dijkstra(startIndex, g, n)
    }
    else if (algo == "BFS") {
      await bfs(startIndex, g, n)
    }
    else if (algo == "DFS") {
      await dfs(startIndex, g, n)
    }
    setResult(prev => [...prev,"Done!"])
    setStarted(false)
  }
  /**
   * DFS Algo
   * @param {*} startIndex 
   * @param {*} g 
   * @param {*} n 
   */
  const dfs = async (startIndex, g, n) => {
    let res = ""
    const startNode = document.getElementById(`point-${startIndex}`)
    startNode?.classList.add('bg-purple-500')
    await delay()
    let visited = Array(points.length).fill(false);
    visited[startIndex] = true;
    let u;
    let q = []
    let r = []
    q.push(startIndex)
    while (q.length != 0) {
      u = q.pop()
      res = "Node " + u + "->["
      const uNode = document.getElementById(`point-${u}`)
      uNode.classList.add("flashit")
      await delay()
      r.push(u)
      // For every adjacent vertex to the current vertex
      for (let i = 0; i < n; i++) {
        if (g[u][i] != 0 && (!visited[i])) {
          let iLine = document.getElementById(`line-${u}-${i}`)
          if (iLine == null)
            iLine = document.getElementById(`line-${i}-${u}`)
          if (iLine == null)
            continue
          iLine.classList.add("bg-cyan-500")
          iLine.classList.add("flashit")
          res = res + i + ","
          await delay()
          iLine.classList.remove("flashit")
          // Push the adjacent node to the queue
          q.push(i)
          visited[i] = true;
        }
      }

      if (res.charAt(res.length - 1) != '[')
        res = res.substring(0, res.length - 1) + "]"
      else
        res = res + "]"
      setResult(prev => [...prev, res])

      uNode.classList.remove("flashit")
      uNode.classList.add("borderEle")
      if (u != startIndex) {
        uNode.classList.add("bg-green-500")
      }
      await delay()
    }
    let i
    res = "Final: "
    for (i = 0; i < r.length - 1; i++) {
      res = res + r[i] + "->";
    }
    setResult(prev => [...prev, res + r[i]])
  }

  /**
   * BFS Algo
   * @param {*} startIndex 
   * @param {*} g 
   * @param {*} n 
   */
  const bfs = async (startIndex, g, n) => {
    let res = ""
    const startNode = document.getElementById(`point-${startIndex}`)
    startNode?.classList.add('bg-purple-500')
    await delay()
    let visited = Array(points.length).fill(false);
    visited[startIndex] = true;
    let u;
    let q = []
    let r = []
    q.push(startIndex)
    while (q.length != 0) {
      u = q.shift()
      res = "Node " + u + "->["
      const uNode = document.getElementById(`point-${u}`)
      uNode.classList.add("flashit")
      await delay()
      r.push(u)
      // For every adjacent vertex to the current vertex
      for (let i = 0; i < n; i++) {
        if (g[u][i] != 0 && (!visited[i])) {
          let iLine = document.getElementById(`line-${u}-${i}`)
          if (iLine == null)
            iLine = document.getElementById(`line-${i}-${u}`)
          if (iLine == null)
            continue
          iLine.classList.add("bg-cyan-500")
          iLine.classList.add("flashit")
          res = res + i + ","
          await delay()
          iLine.classList.remove("flashit")
          // Push the adjacent node to the queue
          q.push(i);

          visited[i] = true;
        }
      }

      if (res.charAt(res.length - 1) != '[')
        res = res.substring(0, res.length - 1) + "]"
      else
        res = res + "]"
      setResult(prev => [...prev, res])

      uNode.classList.remove("flashit")
      uNode.classList.add("borderEle")
      if (u != startIndex) {
        uNode.classList.add("bg-green-500")
      }
      await delay()
    }
    let i
    res = "Final: "
    for (i = 0; i < r.length - 1; i++) {
      res = res + r[i] + "->";
    }
    setResult(prev => [...prev, res + r[i]])
  }
  /**
   * Dijkstra Algo
   * @param {*} startIndex 
   * @param {*} g 
   * @param {*} n 
   */
  const dijkstra = async (startIndex, g, n) => {
    let res = ""
    const startNode = document.getElementById(`point-${startIndex}`)
    startNode?.classList.add('bg-purple-500')
    await delay()
    let distances = Array(points.length).fill(Infinity);
    let visited = Array(points.length).fill(false);
    let previous = Array(points.length).fill(null);
    previous[startIndex] = startIndex
    distances[startIndex] = 0;
    for (let i = 0; i < n; i++) {
      let u = minVertice(distances, visited, n);
      const uNode = document.getElementById(`point-${u}`)
      uNode.classList.add("flashit")
      await delay()
      console.log(distances, visited)
      visited[u] = true;
      res = "Node " + u + "->["
      for (let j = 0; j < n; j++) {//j = destination
        if (!visited[j] && g[u][j] != 0 && distances[u] != Infinity && distances[j] > distances[u] + g[u][j]) {
          res = res + j + ","
          distances[j] = distances[u] + g[u][j];
          if (previous[j] != null) {
            previous[j].classList.remove("bg-cyan-500")
            await delay()
          }
          let iLine = document.getElementById(`line-${u}-${j}`)
          if (iLine == null)
            iLine = document.getElementById(`line-${j}-${u}`)
          if (iLine == null)
            continue
          iLine.classList.add("bg-cyan-500")
          iLine.classList.add("flashit")
          previous[j] = iLine
          iLine.classList.remove("flashit")
        }
      }
      if (res.charAt(res.length - 1) != '[')
        res = res.substring(0, res.length - 1) + "]"
      else
        res = res + "]"
      setResult(prev => [...prev, res])
      uNode.classList.remove("flashit")
      if (u != startIndex && previous[u] != null) {
        uNode.classList.add("bg-green-500")
        uNode.classList.add("borderEle")
      }
      await delay()
    }
    res="Total Cost of Each Node:"
    setResult(prev => [...prev, res])
    await delay()
    for (let i = 0; i < distances.length; i++) {
      res=i+"->"+distances[i];
      setResult(prev => [...prev, res])
      await delay()
    }
  };
  return (
    <>
      <Navbar />
      <Edit nodeCount={points.length} onAlgoChange={e => setAlgo(e)} aglo={algo} handleStart={handleStart} started={started} />
      <div className='flex'>
        <div className="app border-slate-900" onClick={handleClick}>
          {renderPoints()}
          {renderLines()}
        </div>
        {
          selectedPoints.length === 2 && (
            <div className="weight-input">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter edge weight"
              />
              <button onClick={handleWeightSubmit}>Submit</button>
            </div>
          )
        }
        <div className='m-6 z-0 relative max-w-lg'>
          <Card >
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>
                {"Node A -> [Destination b, Destination c]"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>{algo}:</div>
              <ul>
                {result.map(data => <li>{data}</li>)}
              </ul>
            </CardContent>

          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
