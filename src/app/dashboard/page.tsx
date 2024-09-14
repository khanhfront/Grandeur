import { AreaLargeChart } from "@/components/chart/area-chart";
import { Component } from "@/components/chart/bar-chart-multi";
import PageContainer from "@/components/layout/page-container";

export default function Page() {
  return (
    <PageContainer>
      <div className="mx-auto grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Biểu đồ lớn chiếm 1 cột */}
        <div className="md:col-span-1">
          <div className="w-full">
            <Component />
          </div>
        </div>

        {/* Biểu đồ nhỏ chiếm 1 cột */}
        <div className="md:col-span-1">
          <div className="w-full">
            <Component />
          </div>
        </div>

        {/* Biểu đồ nhỏ chiếm 1 cột */}
        <div className="md:col-span-1">
          <div className="w-full">
            <Component />
          </div>
        </div>

        {/* Biểu đồ lớn thứ hai chiếm 3 cột */}
        <div className="md:col-span-3">
          <div className="w-full">
            <AreaLargeChart />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
