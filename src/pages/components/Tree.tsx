import React, { useEffect, useRef } from 'react'
import { PlantType } from '@/models/PlantType'

interface TreeProps {
  width: number
  height: number
  depthValue: number
  plantType: PlantType
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)]

  return color
}

const Tree: React.FC<TreeProps> = ({ width, height, depthValue, plantType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawFlower = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()

    // 绘制花蕊
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow' // 花蕊的颜色
    ctx.fill()

    // 绘制花瓣的第一个曲线
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x + 10, y - 20, x + 20, y)
    ctx.lineTo(x + 10, y + 10)

    // 绘制花瓣的第二个曲线
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x - 10, y - 20, x - 20, y)
    ctx.lineTo(x - 10, y + 10)

    // 添加渐变色
    const gradient = ctx.createLinearGradient(x - 20, y, x + 20, y)
    gradient.addColorStop(0, 'pink')
    gradient.addColorStop(1, 'white')
    ctx.fillStyle = gradient

    ctx.fill()
  }

  const drawLeft = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()

    // 绘制叶子的椭圆形状
    ctx.moveTo(x, y)
    ctx.bezierCurveTo(x + 10, y - 5, x + 10, y - 20, x, y - 25)
    ctx.bezierCurveTo(x - 10, y - 20, x - 10, y - 5, x, y)

    ctx.fillStyle = 'green' // 叶子的颜色
    ctx.fill()
  }

  const drawFruit = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()

    // 绘制果实形状
    ctx.arc(x, y, 10, 0, Math.PI * 2)

    // 设置果实颜色
    ctx.fillStyle = '#ff642e'
    ctx.fill()

    // 绘制果实的叶子
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x - 5, y - 15, x - 10, y - 20)
    ctx.quadraticCurveTo(x - 15, y - 15, x - 10, y)
    ctx.fillStyle = '#ffd700'
    ctx.fill()
  }

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

      if (plantType === PlantType.Flowering)
        drawFlower(ctx, x, y)
      else if (plantType === PlantType.Fruiting)
        drawFruit(ctx, x, y)
      else
        drawLeft(ctx, x, y)
      return
    }

    const newX = x + length * Math.cos(angle)
    const newY = y + length * Math.sin(angle)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(newX, newY)
    // ctx.strokeStyle = 'green'
    ctx.strokeStyle = getRandomColor()
    ctx.lineWidth = depth
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

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}

export default Tree
