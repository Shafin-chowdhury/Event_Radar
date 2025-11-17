
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface RevenueChartProps {
  data: { name: string; total: number }[]
}
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <p className="label text-sm font-bold text-foreground">{label}</p>
        <p className="intro text-sm text-primary">
          {`Revenue: Tk ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};



export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="bg-chart-2">
      <CardHeader>
        <CardTitle className="text-sidebar">Revenue Overview (Last 7 Days)</CardTitle>
      </CardHeader>
      
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="coolBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2}/>
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="#FFFFFF" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#FFFFFF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `Tk ${value / 1000}k`}
            />
            

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
            

            <Bar 
              dataKey="total" 
              fill="url(#coolBarGradient)"
              radius={[4, 4, 0, 0]} 
            />

          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}