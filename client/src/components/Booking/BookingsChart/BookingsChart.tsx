import React, { FC } from "react";
// @ts-ignore
import { Bar as BarChart } from "react-chartjs"

import "./style.scss";
import { BookingType } from "../../../interfaces/EventInterface";

const BOOKINGS_BUCKETS = {
    Cheap: {
        min: 0,
        max: 100
    },
    Normal: {
        min: 100,
        max: 200
    },
    Expensive: {
        min: 200,
        max: 10000000
    },
};

type BucketKeys = keyof typeof BOOKINGS_BUCKETS;

type DatasetsChartType = {
    fillColor: string,
    strokeColor: string,
    highlightFill: string,
    highlightStroke: string,
    data: Array<number>
}

type Props = {
    bookings: Array<BookingType>,
};

const BookingsChart: FC<Props> = ({ bookings }) => {
    const chartData = {
        labels: [] as Array<BucketKeys>,
        datasets: [] as Array<DatasetsChartType>
    };
    let data = [] as Array<number>;

    for(let bucket in BOOKINGS_BUCKETS) {
        const filteredBookingCount: number = bookings.reduce((prev, current) => {
            const { price } = current.event;
            if (price > BOOKINGS_BUCKETS[bucket as BucketKeys].min
                && price < BOOKINGS_BUCKETS[bucket as BucketKeys].max) {
                return prev + 1
            }

            return prev;
        }, 0);

        data.push(filteredBookingCount);
        chartData.labels.push(bucket as BucketKeys);
        chartData.datasets.push({
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data
        });
        data = [...data];
        data[data.length - 1] = 0;
    };

    return (
        <div className="chart" >
            <BarChart
                data={ chartData }
            />
        </div>
    )
};

export default BookingsChart;