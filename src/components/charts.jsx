import {
    Cell,
    Line,
    LineChart,
    PieChart,
    Pie,
    Sector,
    Label,
    LabelList,
    Legend,
    BarChart,
    Bar,
    Tooltip
} from 'recharts';

import { RechartsDevtools } from '@recharts/devtools';



const data = [
    {
        name: 'Page A',
        uv: 400,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 300,
        pv: 4567,
        amt: 2400,
    },
    {
        name: 'Page C',
        uv: 320,
        pv: 1398,
        amt: 2400,
    },
    {
        name: 'Page D',
        uv: 200,
        pv: 9800,
        amt: 2400,
    },
    {
        name: 'Page E',
        uv: 278,
        pv: 3908,
        amt: 2400,
    },
    {
        name: 'Page F',
        uv: 189,
        pv: 4800,
        amt: 2400,
    },
];


export default function ChartsMetas() {
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
            <Line dataKey="uv" />
            <RechartsDevtools />
        </LineChart>
    );
}



const dataPie = [
    { name: 'Inter 7%', value: 10 },
    { name: 'Inter 8%', value: 20 },
    { name: 'Inter 9%', value: 30 },
    { name: 'Inter 10%', value: 40 },
    { name: 'Inter 11%', value: 50 },
]

const colors = [
    '#0DA071',
    '#0D7A57',
    '#0A6045',
    '#084D39',
    '#063C2E'
]

export function CellPieExample() {
    return (
        <div className="w-auto h-auto">
            <PieChart width={500} height={300}>
                <Pie
                    data={dataPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                >
                    {dataPie.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={colors[index % colors.length]}
                        />
                    ))}

                    <Label
                        value="Intereses"
                        position="center"
                        className="font-bold"
                    />
                </Pie>

                <Tooltip />

                <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value, entry) => (
                        <span
                            style={{
                                color: entry.color,
                                fontWeight: 600
                            }}
                        >
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </div>
    )
}



// #region Sample data
const dataBar = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

// #endregion
export const TinyBarChart = () => {
    return (
        <BarChart
            style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
            responsive
            data={dataBar}
        >
            <Bar dataKey="uv" fill="#8884d8" />
            <RechartsDevtools />
        </BarChart>
    );
};

