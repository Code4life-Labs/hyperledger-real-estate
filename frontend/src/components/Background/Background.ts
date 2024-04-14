import React from "react";

export type Point = {
    x: number;
    y: number;
}

export type BackgroundProps = React.PropsWithChildren;
export type BackgroundPointsProps = {
    points: Array<Point>;
};