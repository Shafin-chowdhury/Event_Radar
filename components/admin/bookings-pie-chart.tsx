"use client"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface BookingsPieChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <p className="label text-sm font-bold text-foreground">{payload[0].name}</p>
        <p className="intro text-sm text-primary">
          {`Bookings: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if ((percent * 100) < 5) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="font-bold text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export function BookingsPieChart({ data }: BookingsPieChartProps) {
  const totalBookings = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <Card className="bg-chart-2">
      <CardHeader>
        <CardTitle className="text-sidebar">Bookings by Category</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ color: "#e0e0e0", fontSize: "14px", paddingTop: "20px" }}
            />

            <Pie
              data={data}
              cx="50%"
              cy="45%" 
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div 
          className="absolute flex flex-col items-center justify-center"
          style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
        >
          <span className="text-3xl font-bold text-white">{totalBookings}</span>
          <span className="text-sm text-sidebar/80">Total Bookings</span>
        </div>

      </CardContent>
    </Card>
  )
}