"use client"

// Houston Main Street tile mosaic style logo
// Letters use full blocks for straight lines and diagonal half-blocks for curves/angles

const TILE_SIZE = 8
const GAP = 1
const BLUE = "#2563EB"
const WHITE = "#FAFAFA"
const GROUT = "#9CA3AF"

// Tile types: 0 = empty, 1 = full, 2 = top-left triangle, 3 = top-right triangle, 4 = bottom-left triangle, 5 = bottom-right triangle
type TileType = 0 | 1 | 2 | 3 | 4 | 5

// Letter definitions - each letter is 5 rows tall, variable width
// Using diagonal tiles for curves: 2=◤ 3=◥ 4=◣ 5=◢
const LETTERS: Record<string, TileType[][]> = {
  M: [
    [1, 3, 0, 2, 1],
    [1, 1, 0, 1, 1],
    [1, 5, 1, 4, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 2, 1, 3, 0],
    [2, 1, 0, 1, 3],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 3, 0, 0, 1],
    [1, 1, 3, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 4, 1, 1],
    [1, 0, 0, 4, 1],
  ],
  S: [
    [0, 2, 1, 1, 3],
    [2, 1, 0, 0, 5],
    [0, 4, 1, 1, 3],
    [2, 0, 0, 1, 5],
    [4, 1, 1, 1, 5],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  R: [
    [1, 1, 1, 3, 0],
    [1, 0, 0, 1, 3],
    [1, 1, 1, 5, 0],
    [1, 0, 2, 1, 0],
    [1, 0, 0, 4, 1],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  O: [
    [0, 2, 1, 3, 0],
    [2, 1, 0, 1, 3],
    [1, 0, 0, 0, 1],
    [4, 1, 0, 1, 5],
    [0, 4, 1, 5, 0],
  ],
  C: [
    [0, 2, 1, 1, 3],
    [2, 1, 0, 0, 5],
    [1, 0, 0, 0, 0],
    [4, 1, 0, 0, 2],
    [0, 4, 1, 1, 5],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  " ": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
}

function Tile({ type, x, y }: { type: TileType; x: number; y: number }) {
  const size = TILE_SIZE
  const px = x * (TILE_SIZE + GAP)
  const py = y * (TILE_SIZE + GAP)

  if (type === 0) {
    return (
      <rect x={px} y={py} width={size} height={size} fill={WHITE} stroke={GROUT} strokeWidth={0.5} />
    )
  }

  if (type === 1) {
    return (
      <rect x={px} y={py} width={size} height={size} fill={BLUE} stroke={GROUT} strokeWidth={0.5} />
    )
  }

  // Diagonal tiles - show both the white background and blue triangle
  const triangles: Record<number, string> = {
    2: `${px},${py} ${px + size},${py} ${px},${py + size}`, // top-left ◤
    3: `${px},${py} ${px + size},${py} ${px + size},${py + size}`, // top-right ◥
    4: `${px},${py} ${px},${py + size} ${px + size},${py + size}`, // bottom-left ◣
    5: `${px + size},${py} ${px},${py + size} ${px + size},${py + size}`, // bottom-right ◢
  }

  return (
    <g>
      <rect x={px} y={py} width={size} height={size} fill={WHITE} stroke={GROUT} strokeWidth={0.5} />
      <polygon points={triangles[type]} fill={BLUE} />
    </g>
  )
}

export function TileLogo({ text = "MAIN STREET SOCIAL", className = "" }: { text?: string; className?: string }) {
  const letters = text.toUpperCase().split("")
  
  // Calculate total width
  let totalWidth = 0
  const letterPositions: { letter: string; x: number }[] = []
  
  for (const letter of letters) {
    const def = LETTERS[letter] || LETTERS[" "]
    letterPositions.push({ letter, x: totalWidth })
    totalWidth += def[0].length + 1 // +1 for spacing between letters
  }
  totalWidth -= 1 // Remove trailing space
  
  const height = 5
  const padding = 2
  const svgWidth = (totalWidth + padding * 2) * (TILE_SIZE + GAP)
  const svgHeight = (height + padding * 2) * (TILE_SIZE + GAP)

  return (
    <svg 
      viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
      className={className}
      style={{ backgroundColor: WHITE }}
    >
      {/* Background grid */}
      {Array.from({ length: height + padding * 2 }).map((_, row) =>
        Array.from({ length: totalWidth + padding * 2 }).map((_, col) => (
          <Tile key={`bg-${row}-${col}`} type={0} x={col} y={row} />
        ))
      )}
      
      {/* Letters */}
      {letterPositions.map(({ letter, x: letterX }) => {
        const def = LETTERS[letter] || LETTERS[" "]
        return def.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            if (tile === 0) return null
            return (
              <Tile
                key={`${letter}-${letterX}-${rowIndex}-${colIndex}`}
                type={tile}
                x={letterX + colIndex + padding}
                y={rowIndex + padding}
              />
            )
          })
        )
      })}
      
      {/* Border */}
      <rect 
        x={0} 
        y={0} 
        width={svgWidth} 
        height={svgHeight} 
        fill="none" 
        stroke="#374151" 
        strokeWidth={2} 
      />
    </svg>
  )
}
