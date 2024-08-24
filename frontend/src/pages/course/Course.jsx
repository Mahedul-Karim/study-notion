import React, { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import Category from "../../components/course/filter/Category";
import Instructors from "../../components/course/filter/Instructors";
import Price from "../../components/course/filter/Price";
import Search from "../../components/course/filter/Search";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/course/Card";
import { useSearchParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import Empty from "../../components/ui/Empty";
import Pagination from "../../components/ui/pagination/Pagination";

const Course = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const instructor = searchParams.get("instructor") || "all";
  const price = searchParams.get("price") || "all";
  const search = searchParams.get("search") || "";
  const page = +searchParams.get("page") || 1;

  const { data, isPending } = useData({
    key: ["allCourse", category, instructor, price, search, page],
    endpoint: `/course/filter?category=${category}&instructor=${instructor}&price=${price}&search=${search}&page=${page}`,
  });

  return (
    <main className="py-20 bg-[#fafafa]">
      <Container>
        <div className="grid md:grid-cols-[0.3fr_1fr] gap-4">
          <div className="flex flex-col gap-4 order-3 md:order-1">
            <Category />
            <Instructors />
            <Price />
          </div>
          <div className="rounded-md order-1 md:order-2">
            <Search />
            {data?.courses?.length === 0 && !isPending && <Empty />}
            {isPending && (
              <div className="flex items-center justify-center h-[60vh]">
                <Spinner />
              </div>
            )}
            {data?.courses?.length > 0 && !isPending && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mt-8">
                {data?.courses?.map((course) => (
                  <Card key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>

          <div className="order-2 md:order-3 md:col-start-2  flex items-center gap-2 justify-center">
            <Pagination type={"course"} category={category} search={search}/>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Course;
