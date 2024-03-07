import React, { useEffect, useRef } from 'react'

interface TreeProps {
  width: number
  height: number
  depthValue: number
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)]

  return color
}

const Tree: React.FC<TreeProps> = ({ width, height, depthValue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number,
  ) => {
    if (depth === 0) {
      // 在树枝末端绘制一朵花朵
      // eslint-disable-next-line ts/no-use-before-define
      drawFlower(ctx, x, y)
      return
    }

    const newX = x + length * Math.cos(angle)
    const newY = y + length * Math.sin(angle)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(newX, newY)
    // ctx.strokeStyle = 'green'
    ctx.strokeStyle = getRandomColor()
    ctx.lineWidth = depth / 2
    ctx.stroke()

    drawTree(ctx, newX, newY, length * 0.8, angle - Math.PI / 6, depth - 1)
    drawTree(ctx, newX, newY, length * 0.8, angle + Math.PI / 6, depth - 1)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return

    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    // 清空画布
    ctx.clearRect(0, 0, width, height)

    // 画树
    drawTree(ctx, width / 2, height, 50, -Math.PI / 2, depthValue)
  }, [width, height, depthValue])

  const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
    // play light
    ctx.shadowBlur = 10
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
    // ctx.shadowColor = getRandomColor()

    ctx.fillStyle = 'white'
    ctx.fill()
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}

export default Tree
