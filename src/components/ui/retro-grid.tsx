import { cn } from "@/lib/utils";

export function RetroGrid({ className, angle = 65 }: { className?: string; angle?: number }) {
    return (
        <div
            className={cn("pointer-events-none absolute size-full overflow-hidden bg-black", className)}
            style={{ "--grid-angle": `${angle}deg`, willChange: "transform" } as React.CSSProperties}
        >
            {/* Grid */}
            <div className="absolute inset-0 [transform:rotateX(var(--grid-angle)) translateZ(0)] will-change-transform">
                <div
                    className={cn(
                        "animate-grid",
                        "[background-repeat:repeat] [background-size:80px_80px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
                        "[background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_0)]"
                    )}
                    style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
                />
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(9,9,11)] to-transparent to-90%" />
        </div>
    );
}
