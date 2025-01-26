"use client";

import * as React from "react";
import { useAppSelector, useAppDispatch } from "@/archive/store/hooks";
import { Pie, PieChart, Sector, Label } from "recharts";
import { loadStudentAnalytics } from "@/archive/api/slices/studentThunk";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  male: { label: "Male", color: "hsl(var(--chart-3))" },
  female: { label: "Female", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export function StudentAnalyticsChart() {
  const id = "pie-student-analytics";
  const dispatch = useAppDispatch();

  // Fetch state from the Redux store
  const { analytics } = useAppSelector((state: any) => state.student);

  // Local state for selected gender
  const [activeGender, setActiveGender] = React.useState("male");

  // Generate the chart data from the analytics response
  const chartData = React.useMemo(() => {
    if (!analytics) return [];
    return [
      { month: "male", count: analytics.male || 0, fill: "var(--color-male)" },
      {
        month: "female",
        count: analytics.female || 0,
        fill: "var(--color-female)",
      },
    ];
  }, [analytics]);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.month === activeGender),
    [activeGender, chartData]
  );

  const genders = React.useMemo(
    () => chartData.map((item) => item.month),
    [chartData]
  );

  // Fetch analytics on mount
  React.useEffect(() => {
    dispatch(loadStudentAnalytics());
  }, [dispatch]);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Student Analytics</CardTitle>
          <CardDescription>By Gender</CardDescription>
        </div>
        <Select value={activeGender} onValueChange={setActiveGender}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select Gender"
          >
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {genders.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              if (!config) return null;

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: any) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData[activeIndex]?.count.toLocaleString() || 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
