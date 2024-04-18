"use client"
import React from 'react'
import { useEffect } from 'react';
// import dynamic from 'next/dynamic';
// const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ordersChart() {
    useEffect(() => {
        const chartConfig = {
            series: [
                {
                    name: 'Sales',
                    data: [5, 4, 6, 3, 5, 7, 2, 3, 5, 5, 3, 5],
                },
            ],
            chart: {
                type: 'line',
                height: 240,
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: 'orders',
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#3a55af'],
            stroke: {
                lineCap: 'round',
                curve: 'smooth',
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: true,
                },
                labels: {
                    style: {
                        colors: '#616161',
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        fontWeight: 400,
                    },
                },
                categories: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    'Jan',
                    'Feb',
                    'Mar',
                ],
            },
            yaxis: {
                axisBorder: {
                    show: true,
                },
                labels: {
                    style: {
                        colors: '#616161',
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: false,
                borderColor: '#dddddd',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: 'light',
            },
        };

        const chart = new ApexCharts(document.querySelector('#line-chart'), chartConfig);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);
    return (
        <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
                <div className="w-max rounded-lg bg-[#3a55af] p-5 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                        ></path>
                    </svg>
                </div>
                <div>
                    <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                        Facturado Por més
                    </h6>
                    <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                        Visualización de pedidos facturado por mes
                    </p>
                </div>
            </div>
            <div className="pt-6 px-2 pb-0">
                <div id="line-chart"></div>
            </div>
        </div>
    );
}
